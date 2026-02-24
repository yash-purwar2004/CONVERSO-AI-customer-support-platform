package com.example.conversoBackend.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.conversoBackend.security.jwt.JwtAuthenticationFilter;

// Define Stateless Security Configuration for the application
// Attach JWT Authentication Filter to the security filter chain
// Define public Routes and protected routes

@Configuration // Marks this class as a source of bean definitions for the application context
@EnableMethodSecurity // Enables method-level security, allowing the use of annotations like @PreAuthorize and @Secured on methods to control access based on roles or permissions
public class securityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    public securityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean // Indicates that a method produces a bean to be managed by the Spring container
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF protection for stateless APIs
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/**").permitAll() // Allow unauthenticated access to authentication endpointsconversoBackendApplication
            .requestMatchers("/api/widget/**").permitAll() // Require authentication for all API endpoints
            .anyRequest().authenticated() // Require authentication for all other requests
        )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before the default username/password filter

        return http.build(); // Build and return the SecurityFilterChain
    }
}
