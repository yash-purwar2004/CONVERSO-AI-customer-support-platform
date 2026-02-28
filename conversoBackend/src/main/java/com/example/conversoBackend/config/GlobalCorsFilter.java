package com.example.conversoBackend.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Raw servlet-level CORS filter.
 * @Order(Ordered.HIGHEST_PRECEDENCE) makes this run BEFORE Spring Security.
 * This is the nuclear option — it bypasses all Spring CORS abstractions
 * and writes the headers directly onto every response.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalCorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest  request  = (HttpServletRequest)  req;
        HttpServletResponse response = (HttpServletResponse) res;

        String origin = request.getHeader("Origin");

        // Allow any origin (including "null" from file:// opened HTML files)
        if (origin != null) {
            response.setHeader("Access-Control-Allow-Origin",  origin);
        } else {
            response.setHeader("Access-Control-Allow-Origin",  "*");
        }

        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods",     "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers",     "Authorization, Content-Type, Accept, Origin, X-Requested-With");
        response.setHeader("Access-Control-Expose-Headers",    "Authorization");
        response.setHeader("Access-Control-Max-Age",           "3600");

        // Preflight request — respond 200 immediately, do NOT pass to Spring Security
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return; // ← stop here, don't call chain.doFilter()
        }

        chain.doFilter(req, res);
    }

    @Override public void init(FilterConfig filterConfig) {}
    @Override public void destroy() {}
}