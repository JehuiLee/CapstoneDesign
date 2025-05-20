package com.example.CapstoneDesign.controller;

import com.example.CapstoneDesign.dto.UserResponseDto;
import com.example.CapstoneDesign.repository.UserRepository;
import com.example.CapstoneDesign.security.oauth2.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public UserResponseDto getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return UserResponseDto.builder()
                .id(userPrincipal.getId().toString())
                .email(userPrincipal.getEmail())
                .name(userPrincipal.getName())
                .isRegistered(true) // 필요시 DB에서 가져와도 됨
                .build();
    }
}
