package com.example.CapstoneDesign.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String name;
    private String email;
    private String password;
    private String refreshToken;

    private Boolean isRegistered;
    private Long currentStoreId;

    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;

    /*@ManyToOne
    @JoinColumn(name = "current_store_id", insertable = false, updatable = false)
    private Store currentStore;*/
}
