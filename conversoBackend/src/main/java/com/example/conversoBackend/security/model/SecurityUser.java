package com.example.conversoBackend.security.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.conversoBackend.user.model.User;

public class SecurityUser implements UserDetails{

    private final User user;

    public SecurityUser(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name()) // Assuming the User entity has a getRole() method that returns an enum or string representing the user's role
        );
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash(); // Assuming the User entity has a getPassword() method that returns the user's password
    }

    @Override
    public String getUsername() {
        return user.getId(); // Assuming the User entity has a getId() method that returns the user's unique identifier (e.g., email or username)
    }
    
}
