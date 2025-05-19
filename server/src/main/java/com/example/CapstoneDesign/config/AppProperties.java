package com.example.CapstoneDesign.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private Auth auth = new Auth();

    @Data
    public static class Auth {
        private String tokenSecret;
        private String refreshTokenSecret;
        private long tokenExpirationMsec;
        private long refreshTokenExpirationMsec;
    }
}
