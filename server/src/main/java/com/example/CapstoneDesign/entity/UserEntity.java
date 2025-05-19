package com.example.CapstoneDesign.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "User")
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kakao_id")
    private String kakaoId;  // 카카오 로그인 전용

    private String name;     // 닉네임 또는 사용자 이름

    @Column(nullable = true)
    private String email;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "is_registered")
    private Boolean isRegistered;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;
}