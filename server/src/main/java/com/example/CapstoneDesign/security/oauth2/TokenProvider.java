package com.example.CapstoneDesign.security.oauth2;

import com.example.CapstoneDesign.config.AppProperties;
import io.jsonwebtoken.*;
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

    public String refreshAccessToken(String refreshToken) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(appProperties.getAuth().getRefreshTokenSecret())
                    .parseClaimsJws(refreshToken)
                    .getBody();

            String subject = claims.getSubject();
            Long userId = Long.parseLong(subject);
            String newToken = createAccessToken(userId);
            return newToken;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
