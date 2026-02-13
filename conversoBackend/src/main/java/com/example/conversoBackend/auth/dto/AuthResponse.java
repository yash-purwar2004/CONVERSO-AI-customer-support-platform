package com.example.conversoBackend.auth.dto;

public class AuthResponse {
    private String token;
    private String email;
    private String role;
    private String tenantId;

    public AuthResponse(String token, String email, String role, String tenantId) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.tenantId = tenantId;
    }

    // Getters

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getTenantId() {
        return tenantId;
    }
}
