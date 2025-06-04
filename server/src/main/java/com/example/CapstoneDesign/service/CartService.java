package com.example.CapstoneDesign.service;

import com.example.CapstoneDesign.dto.CartItemResponseDto;
import com.example.CapstoneDesign.entity.*;
import com.example.CapstoneDesign.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    //private final ProductRepository productRepository;
    private final UserRepository userRepository;

    //상품 장바구니에 추가
    @Transactional
    public void addProductToCart(Long userId, Long productId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 장바구니 없으면 생성
        CartEntity cart = cartRepository.findByUserIdAndIsActiveTrue(userId)
                .orElseGet(() -> {
                    CartEntity newCart = CartEntity.builder()
                            .user(user)
                            .storeId(user.getCurrentStoreId())
                            .isActive(true)
                            .totalAmount(0)
                            .createdAt(LocalDateTime.now())
                            .build();
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        // 이미 존재하는 상품이면 수량 증가
        CartItemEntity cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .map(item -> {
                    item.setQuantity(item.getQuantity() + 1);
                    return item;
                })
                .orElse(CartItemEntity.builder()
                        .cart(cart)
                        .product(product)
                        .quantity(1)
                        .build());

        cartItemRepository.save(cartItem);

        // 총 금액 업데이트
        cart.setTotalAmount(cart.getTotalAmount() + product.getPrice());
        cartRepository.save(cart);
    }

    // 장바구니 목록 조회
    @Transactional(readOnly = true)
    public List<CartItemResponseDto> getCartItems(Long userId) {
        Cart cart = cartRepository.findByUserIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new RuntimeException("장바구니가 없습니다."));

        return cartItemRepository.findByCartId(cart.getId())
                .stream()
                .map(item -> CartItemResponseDto.builder()
                        .itemId(item.getId())
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .price(item.getProduct().getPrice())
                        .quantity(item.getQuantity())
                        .totalPrice(item.getQuantity() * item.getProduct().getPrice())
                        .build())
                .collect(Collectors.toList());
    }

    // 장바구니 항목 삭제
    @Transactional
    public void removeCartItem(Long itemId) {
        CartItemEntity item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("장바구니 항목이 없습니다."));

        Cart cart = item.getCart();
        int deducted = item.getProduct().getPrice() * item.getQuantity();

        cartItemRepository.delete(item);
        cart.setTotalAmount(cart.getTotalAmount() - deducted);
        cartRepository.save(cart);
    }

    // 장바구니 전체 비우기
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new RuntimeException("장바구니가 없습니다."));

        cartItemRepository.deleteAll(cartItemRepository.findByCartId(cart.getId()));
        cart.setTotalAmount(0);
        cartRepository.save(cart);
    }
}