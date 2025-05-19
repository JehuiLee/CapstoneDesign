package com.example.CapstoneDesign.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private Long id;
    private String email;
    private String name;
    private boolean isRegistered;
}
