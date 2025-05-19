package com.example.CapstoneDesign.repository;

import com.example.CapstoneDesign.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    //카카오 ID로 사용자 조회
    Optional<UserEntity> findByKakaoId(String kakaoId);

    boolean existsByEmail(String email);
}
