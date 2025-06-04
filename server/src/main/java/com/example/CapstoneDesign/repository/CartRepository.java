package com.example.CapstoneDesign.repository;

import com.example.CapstoneDesign.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Optional<CartEntity> findByUserIdAndIsActiveTrue(Long userId);
}