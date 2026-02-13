package com.example.conversoBackend.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.conversoBackend.security.service.CustomerUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component // Marks this class as a Spring component, allowing it to be automatically detected and registered as a bean in the application context
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // This filter will intercept incoming HTTP requests and check for the presence of a JWT token in the Authorization header.
    // If a valid token is found, it will set the authentication in the security context, allowing the request to proceed.
    // If no token is found or if the token is invalid, the filter will not set authentication, and the request will be rejected by Spring Security's authorization mechanisms.

    private final JwtTokenProvider jwtProvider;
    private final CustomerUserDetailsService userDetailsService;

        public JwtAuthenticationFilter(JwtTokenProvider jwtProvider, CustomerUserDetailsService userDetailsService) {
            this.jwtProvider = jwtProvider;
            this.userDetailsService = userDetailsService;
        }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Extract the JWT token from the Authorization header
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7); // Remove "Bearer " prefix
            if (jwtProvider.validateToken(token)) {
                
                String userId = jwtProvider.extractUserId(token);

                UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response); // Continue the filter chain
    }
    
}
