package com.example.conversoBackend.config;

import java.time.Instant;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.conversoBackend.user.model.Role;
import com.example.conversoBackend.user.model.User;
import com.example.conversoBackend.user.model.UserStatus;
import com.example.conversoBackend.user.repository.UserRepository;

@Component
public class DataInitalizer implements CommandLineRunner {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public DataInitalizer(UserRepository userRepository,
                            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        try{
        System.out.println("Seeder started");
        
        if (!userRepository.existsByEmail("admin@converso.ai")) {

            User admin = new User();
            admin.setId(UUID.randomUUID().toString());
            admin.setName("Platform Admin");
            admin.setEmail("admin@converso.ai");
            admin.setPasswordHash(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);
            admin.setStatus(UserStatus.ACTIVE);
            admin.setCreatedAt(Instant.now());
            admin.setUpdatedAt(Instant.now());

            userRepository.save(admin);
        }
    } catch (Exception e) {
        // Log the exception (you can use a logging framework like SLF4J)
        System.err.println("Error during data initialization: " + e.getMessage());
    }
}
}


// It is purely:

// Application initialization logic
// One-time admin creation
// Database seeding