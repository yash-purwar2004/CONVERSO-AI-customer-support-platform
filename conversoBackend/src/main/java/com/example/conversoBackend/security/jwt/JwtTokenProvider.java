package com.example.conversoBackend.security.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.conversoBackend.user.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component // Marks this class as a Spring component, allowing it to be automatically detected and registered as a bean in the application context
public class JwtTokenProvider{
    
    // This class is responsible for generating and validating JWT tokens. It uses a secret key to sign the tokens and includes methods to extract user information from the token and to check if the token is valid.
    private final SecretKey key;
    public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
        // Initialize the secret key using a value from application properties
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user){

        return Jwts.builder()
            .subject(user.getId()) // Set the user ID as the subject of the token
            .claim("role", user.getRole().name())
            .claim("tenantId", user.getTenantId())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 86400000)) // Set token expiration time (e.g., 24 hours
            .signWith(key) // Sign the token with the secret key using HS256 algorithm
            .compact(); // Build the token and serialize it to a compact, URL-safe string
    }

    public String extractUserId(String token){
        // Extract the user ID from the token's subject
        return Jwts.parser()
            .verifyWith(key) // Verify the token using the secret key
            .build()
            .parseSignedClaims(token) // Parse the token and extract the claims
            .getPayload()
            .getSubject(); // Return the subject (user ID) from the token claims
    }

    public boolean validateToken(String token){
        try {
            Jwts.parser()
                .verifyWith(key) // Verify the token using the secret key
                .build()
                .parseSignedClaims(token); // Parse the token to check if it's valid
            return true; // If parsing is successful, the token is valid
        } catch (Exception e) {
            return false; // If any exception occurs during parsing, the token is invalid
        }
    }
    
    
}
