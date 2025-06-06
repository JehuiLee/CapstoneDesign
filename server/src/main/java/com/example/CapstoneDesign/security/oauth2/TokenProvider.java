package com.example.CapstoneDesign.security.oauth2;

import com.example.CapstoneDesign.config.AppProperties;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final AppProperties appProperties;

    public String createAccessToken(Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        return Jwts.builder()
                .setSubject(Long.toString(userId))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    public String createRefreshToken(Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getRefreshTokenExpirationMsec());

        return Jwts.builder()
                .setSubject(Long.toString(userId))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getRefreshTokenSecret())
                .compact();
    }
    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parser()
                    .setSigningKey(appProperties.getAuth().getRefreshTokenSecret())
                    .parseClaimsJws(refreshToken);
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }

    public Long getUserIdFromRefreshToken(String refreshToken) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getRefreshTokenSecret())
                .parseClaimsJws(refreshToken)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public String getJwtFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7); // "Bearer " 제외하고 토큰만 반환
        }
        return null;
    }

    public Long getUserIdFromRequest(HttpServletRequest request) {
        String token = getJwtFromRequest(request);
        if (token == null || !validateAccessToken(token)) {
            throw new IllegalArgumentException("유효하지 않은 또는 누락된 토큰입니다.");
        }
        return getUserIdFromAccessToken(token);
    }

    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(appProperties.getAuth().getTokenSecret())
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }

    public Long getUserIdFromAccessToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    public String getRefreshTokenFromRequest(HttpServletRequest request) {
        return request.getHeader("X-Refresh-Token");
    }

}
