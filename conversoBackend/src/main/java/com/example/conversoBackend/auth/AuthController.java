package com.example.conversoBackend.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.conversoBackend.auth.dto.AuthResponse;
import com.example.conversoBackend.auth.dto.LoginRequest;
import com.example.conversoBackend.auth.dto.SignupRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    // This endpoint handles user login requests. It accepts a LoginRequest object in the request body, which contains the user's email and password. The @Valid annotation ensures that the incoming request is validated against any constraints defined in the LoginRequest model (e.g., non-null fields, email format). The method returns an AuthResponse object wrapped in a ResponseEntity, which includes the JWT token and any additional information needed for the client after a successful login.
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    // This endpoint handles user signup requests. It accepts a SignupRequest object in the request body, which contains all necessary information for creating a new tenant and its admin user. The @Valid annotation ensures that the incoming request is validated against any constraints defined in the SignupRequest model (e.g., non-null fields, email format). The method returns an AuthResponse object wrapped in a ResponseEntity, which includes the JWT token and any additional information needed for the client after a successful signup.
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        AuthResponse response = authService.signup(request);
        return ResponseEntity.ok(response);
    }


}
