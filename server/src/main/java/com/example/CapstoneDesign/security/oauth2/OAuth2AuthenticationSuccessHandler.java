package com.example.CapstoneDesign.security.oauth2;

import com.example.CapstoneDesign.entity.UserEntity;
import com.example.CapstoneDesign.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Object rawKakaoId = oAuth2User.getAttribute("id");

        String kakaoId = rawKakaoId.toString();

        // 사용자 조회
        UserEntity user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new RuntimeException("User not found with kakaoId: " + kakaoId));

        //access/refresh token 발급
        String accessToken = tokenProvider.createAccessToken(user.getId());
        String refreshToken = tokenProvider.createRefreshToken(user.getId());

        //refreshToken DB에 저장
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        //JSON 응답으로 토큰 내려주기
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, String> tokenResponse = Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken
        );

        new ObjectMapper().writeValue(response.getWriter(), tokenResponse);
    }
}
