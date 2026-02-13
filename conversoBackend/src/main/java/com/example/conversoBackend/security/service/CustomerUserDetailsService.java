package com.example.conversoBackend.security.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.conversoBackend.security.model.SecurityUser;
import com.example.conversoBackend.user.model.User;
import com.example.conversoBackend.user.repository.UserRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
    // This service is responsible for loading user details based on the user ID extracted from the JWT token.
    // It interacts with the user repository to fetch user information and convert it into a UserDetails object that Spring Security can use for authentication and authorization.

    private final UserRepository userRepository;

    public CustomerUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        // This method is called by Spring Security to load user details based on the user ID.
        // It retrieves the user from the repository and converts it into a UserDetails object.
        // If the user is not found, it throws a UsernameNotFoundException.

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        return new SecurityUser(user); // Convert the User entity to a SecurityUser (which implements UserDetails)
    }
    
}
