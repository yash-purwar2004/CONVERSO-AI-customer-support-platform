package com.example.conversoBackend.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.conversoBackend.user.model.User;
import com.example.conversoBackend.user.services.interfaces.userService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/users")
public class userController {

    @Autowired
    private userService userService;


    @GetMapping("/{tenantId}/{userId}")
    @PreAuthorize("hasRole('TENANT_ADMIN') or hasRole('ADMIN')")
    public User getUserById(@PathVariable String tenantId, @PathVariable String userId) {
        return userService.getUserById(tenantId, userId);
    }

    @GetMapping("/all/{tenantId}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(@PathVariable String tenantId) {
        return userService.getAllUsers(tenantId);
    }

    @PostMapping("/update/{tenantId}/{userId}")
    @PreAuthorize("hasRole('TENANT_ADMIN') or hasRole('ADMIN')")
    public String updateUser(@PathVariable String tenantId, @PathVariable String userId, @RequestBody User entity) {
        userService.updateUser(tenantId, userId, entity);
        return "User updated successfully";
    }

    @DeleteMapping("/{tenantId}/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable String tenantId, @PathVariable String userId) {
        userService.deleteUser(tenantId, userId);
    }

    @PostMapping("/activate/{tenantId}/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void activateUser(@PathVariable String tenantId, @PathVariable String userId) {
        userService.activateUser(tenantId, userId);
    }

    @PostMapping("/deactivate/{tenantId}/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deactivateUser(@PathVariable String tenantId, @PathVariable String userId) {
        userService.deactivateUser(tenantId, userId);
    }
}
