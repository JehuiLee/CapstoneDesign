package com.example.CapstoneDesign.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartItemResponseDto {
    private Long itemId;
    private Long productId;
    private String productName;
    private int quantity;
    private int price; // 단가
    private int totalPrice; // 개수 * 단가
}
