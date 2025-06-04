package com.example.CapstoneDesign.repository;

import com.example.CapstoneDesign.entity.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
    Optional<CartItemEntity> findByCartIdAndProductId(Long cartId, Long productId);
    List<CartItemEntity> findByCartId(Long cartId);
}