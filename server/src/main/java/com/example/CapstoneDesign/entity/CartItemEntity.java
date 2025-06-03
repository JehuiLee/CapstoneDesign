package com.example.CapstoneDesign.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private CartEntity cart;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductEntity product;

    private int quantity;
}
