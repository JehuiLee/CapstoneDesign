package com.example.CapstoneDesign.service;

import com.example.CapstoneDesign.dto.KakaoUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class KakaoService {

    private final RestTemplate restTemplate = new RestTemplate();

    public KakaoUserDto getUserInfo(String kakaoAccessToken) {
        // 1. 헤더에 Authorization 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(kakaoAccessToken);  // "Authorization: Bearer {token}"

        // 2. 요청 엔티티 생성
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 3. 카카오 API 호출
        ResponseEntity<KakaoUserDto> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                entity,
                KakaoUserDto.class
        );

        return response.getBody();
    }
}
