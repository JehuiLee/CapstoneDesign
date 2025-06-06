package com.example.CapstoneDesign.controller;

import com.example.CapstoneDesign.dto.UserInfoDto;
import com.example.CapstoneDesign.security.oauth2.TokenProvider;
import com.example.CapstoneDesign.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final TokenProvider tokenProvider;

    @GetMapping("/me")
    public ResponseEntity<UserInfoDto> getMyInfo(HttpServletRequest request) {
        Long userId = tokenProvider.getUserIdFromRequest(request);
        UserInfoDto userInfo = userService.getUserInfo(userId);
        return ResponseEntity.ok(userInfo);
    }

    @PatchMapping("/nickname")
    public ResponseEntity<String> updateNickname(
            HttpServletRequest request,
            @RequestBody Map<String, String> requestBody) {

        Long userId = tokenProvider.getUserIdFromRequest(request);
        String newNickname = requestBody.get("newNickname");
        userService.updateNickname(userId, newNickname);
        return ResponseEntity.ok("닉네임 변경 완료");
    }

    @PatchMapping("/password")
    public ResponseEntity<String> updatePassword(
            HttpServletRequest request,
            @RequestBody Map<String, String> requestBody) {

        Long userId = tokenProvider.getUserIdFromRequest(request);
        String newPassword = requestBody.get("newPassword");

        userService.updatePassword(userId, newPassword);

        return ResponseEntity.ok("비밀번호 변경 완료");
    }

}
