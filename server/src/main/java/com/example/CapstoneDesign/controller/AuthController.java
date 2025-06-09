package com.example.CapstoneDesign.controller;

import com.example.CapstoneDesign.dto.*;
import com.example.CapstoneDesign.security.oauth2.TokenProvider;
import com.example.CapstoneDesign.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TokenProvider tokenProvider;

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<TokenResponseDto> signup(@RequestBody SignupRequestDto request) {
        authService.signup(request); // 유저 생성
        TokenResponseDto token = authService.login(
                new LoginRequestDto(request.getEmail(), request.getPassword())
        );

        return ResponseEntity.ok(token);
    }


    //로그인
    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody LoginRequestDto request) {
        TokenResponseDto token = authService.login(request);
        return ResponseEntity.ok(token);
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        try {
            Long userId = tokenProvider.getUserIdFromRequest(request);
            authService.logout(userId);
            return ResponseEntity.ok("로그아웃 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }
    }


    // 토큰 재발급
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        String refreshToken = tokenProvider.getRefreshTokenFromRequest(request);

        if (!tokenProvider.validateRefreshToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 리프레시 토큰");
        }

        Long userId = tokenProvider.getUserIdFromRefreshToken(refreshToken);
        String newAccessToken = tokenProvider.createAccessToken(userId);

        return ResponseEntity.ok(new TokenResponseDto(newAccessToken, refreshToken));
    }
}
