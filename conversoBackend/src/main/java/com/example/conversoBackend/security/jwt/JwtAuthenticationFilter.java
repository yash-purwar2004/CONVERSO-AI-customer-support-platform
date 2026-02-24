package com.example.conversoBackend.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.conversoBackend.security.service.CustomerUserDetailsService;
import com.example.conversoBackend.security.model.SecurityUser;
import com.example.conversoBackend.security.util.TenantContext;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtProvider;
    private final CustomerUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider jwtProvider,
                                   CustomerUserDetailsService userDetailsService) {
        this.jwtProvider = jwtProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {

            String header = request.getHeader("Authorization");

            if (header != null && header.startsWith("Bearer ")) {

                String token = header.substring(7);

                if (jwtProvider.validateToken(token)) {

                    String userId = jwtProvider.extractUserId(token);

                    UserDetails userDetails =
                            userDetailsService.loadUserByUsername(userId);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);

                    // ✅ Set TenantContext
                    if (userDetails instanceof SecurityUser securityUser) {
                        TenantContext.setTenant(securityUser.getTenantId());
                    }
                }
            }

            filterChain.doFilter(request, response);

        } finally {
            // ✅ VERY IMPORTANT — clear after request completes
            TenantContext.clear();
        }
    }
}