package com.example.CapstoneDesign.controller;

import com.example.CapstoneDesign.repository.UserRepository;
import com.example.CapstoneDesign.security.oauth2.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestHeader("Authorization") String refreshToken) {
        if (refreshToken.startsWith("Bearer ")) {
            refreshToken = refreshToken.substring(7);
        }

        if (tokenProvider.validateRefreshToken(refreshToken)) {
            String newAccessToken = tokenProvider.refreshAccessToken(refreshToken);
            return ResponseEntity.ok().body(newAccessToken);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Refresh Token");
        }
    }
}
