package com.example.CapstoneDesign.controller;

import com.example.CapstoneDesign.dto.CartItemResponseDto;
import com.example.CapstoneDesign.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    //상품 장바구니에 추가
    @PostMapping("/add")
    public ResponseEntity<String> addProductToCart(@RequestBody ProductDetectionRequestDto requestDto) {
        cartService.addProductToCart(requestDto.getUserId(), requestDto.getProductId());
        return ResponseEntity.ok("상품이 장바구니에 추가되었습니다.");
    }

    // 장바구니 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItemResponseDto>> getCartItems(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    // 장바구니 항목 삭제
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long itemId) {
        cartService.removeCartItem(itemId);
        return ResponseEntity.ok("장바구니 항목이 삭제되었습니다.");
    }

    // 장바구니 전체 비우기
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok("장바구니를 비웠습니다.");
    }
}