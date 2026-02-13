package com.example.conversoBackend.auth.dto;

import com.example.conversoBackend.tenant.model.Tone;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class SignupRequest {
    // ========================
    // Tenant Info
    // ========================
    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Domain is required")
    private String domain;

    // ========================
    // Tenant Settings Info
    // ========================
    private Tone tone;

    // ========================
    // Admin User Info
    // ========================
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // Getters & Setters

    public String getCompanyName() {
        return companyName;
    }

    public String getDomain() {
        return domain;
    }

    public Tone getTone() {
        return tone;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public void setTone(Tone tone) {
        this.tone = tone;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
