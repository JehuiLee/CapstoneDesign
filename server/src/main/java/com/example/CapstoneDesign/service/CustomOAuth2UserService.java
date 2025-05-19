package com.example.CapstoneDesign.security.oauth2;

import com.example.CapstoneDesign.dto.KakaoUserDto;
import com.example.CapstoneDesign.entity.UserEntity;
import com.example.CapstoneDesign.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        //카카오에서 사용자 정보 가져오기
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        //카카오 응답 파싱
        String kakaoId = String.valueOf(attributes.get("id"));

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String nickname = (String) profile.get("nickname");

        // 이메일이 없을 경우 임시 이메일 생성
        String email = "kakao_" + kakaoId + "@kakao.local";

        //DB에 사용자 존재 확인
        Optional<UserEntity> optionalUser = userRepository.findByKakaoId(kakaoId);
        UserEntity user;

        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            user.setLastLoginAt(LocalDateTime.now());
        } else {
            user = UserEntity.builder()
                    .kakaoId(kakaoId)
                    .name(nickname)
                    .email(email)
                    .isRegistered(false)
                    .createdAt(LocalDateTime.now())
                    .lastLoginAt(LocalDateTime.now())
                    .build();
        }

        userRepository.save(user);

        // OAuth2User 반환 (SecurityContext에 들어갈 객체)
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "id" // attributes에서 사용자 고유 식별자 키
        );
    }
}
