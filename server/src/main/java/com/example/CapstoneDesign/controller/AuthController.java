package com.example.CapstoneDesign.controller;

import com.example.CapstoneDesign.dto.KakaoUserDto;
import com.example.CapstoneDesign.entity.UserEntity;
import com.example.CapstoneDesign.repository.UserRepository;
import com.example.CapstoneDesign.security.oauth2.TokenProvider;
import com.example.CapstoneDesign.service.KakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final KakaoService kakaoService;

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestHeader("Authorization") String refreshToken) {
        if (refreshToken.startsWith("Bearer ")) {
            refreshToken = refreshToken.substring(7);
        }

        if (tokenProvider.validateRefreshToken(refreshToken)) {
            String newAccessToken = tokenProvider.refreshAccessToken(refreshToken);
            return ResponseEntity.ok(Map.of("access_token", newAccessToken));

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Refresh Token");
        }
    }

    @PostMapping("/kakao-login")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> request) {
        String kakaoAccessToken = request.get("kakaoAccessToken");

        //사용자 정보 가져오기
        KakaoUserDto kakaoUserDto = kakaoService.getUserInfo(kakaoAccessToken);
        String kakaoId = kakaoUserDto.getId();
        String name = kakaoUserDto.getKakaoAccount().getProfile().getName();

        //DB에서 사용자 조회 또는 생성
        UserEntity user = userRepository.findByKakaoId(kakaoId).orElse(null);

        if (user == null) {
            user = UserEntity.builder()
                    .kakaoId(kakaoId)
                    .name(name)
                    .isRegistered(false)
                    .createdAt(LocalDateTime.now())
                    .lastLoginAt(LocalDateTime.now())
                    .build();
        } else {
            user.setLastLoginAt(LocalDateTime.now());
        }

        String accessToken = tokenProvider.createAccessToken(user.getId());
        String refreshToken = tokenProvider.createRefreshToken(user.getId());

        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "isRegistered", user.getIsRegistered()
        ));
    }
}
