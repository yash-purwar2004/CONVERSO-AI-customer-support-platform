package com.example.conversoBackend.user.services;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.conversoBackend.tenant.repository.PublicApiKeyRepository;
import com.example.conversoBackend.tenant.repository.TenantRepository;
import com.example.conversoBackend.tenant.repository.TenantSettingsRepository;
import com.example.conversoBackend.tenant.services.interfaces.TenantService;
import com.example.conversoBackend.user.model.User;
import com.example.conversoBackend.user.model.UserStatus;
import com.example.conversoBackend.user.repository.UserRepository;
import com.example.conversoBackend.user.services.interfaces.userService;


@Service
public class UserServiceImpl implements userService {

    private UserRepository userRepository;
    private TenantRepository tenantRepository;
    private TenantSettingsRepository tenantSettingsRepository;
    private PublicApiKeyRepository publicApiKeyRepository;
    private TenantService tenantService;

    public UserServiceImpl(UserRepository userRepository, TenantRepository tenantRepository, TenantService tenantService, TenantSettingsRepository tenantSettingsRepository, PublicApiKeyRepository publicApiKeyRepository) {
        this.userRepository = userRepository;
        this.tenantRepository = tenantRepository;
        this.tenantService = tenantService;
        this.tenantSettingsRepository = tenantSettingsRepository;
        this.publicApiKeyRepository = publicApiKeyRepository;
    }

    @Override
    public User getUserById(String tenantId, String userId) {
        return userRepository.findByTenantIdAndId(tenantId, userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId + " in tenant: " + tenantId));
    }

    @Override
    public List<User> getAllUsers(String tenantId) {
        return userRepository.findByTenantId(tenantId);
    }

    @Override
    public User updateUser(String tenantId, String userId, User updatedUser) {
        User existingUser = userRepository.findByTenantIdAndId(tenantId, userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId + " in tenant: " + tenantId));

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPasswordHash(updatedUser.getPasswordHash());
        existingUser.setUpdatedAt(Instant.now());

        return userRepository.save(existingUser);
    }

    @Override
    @Transactional
    public void deleteUser(String tenantId, String userId) {
        User existingUser = userRepository.findByTenantIdAndId(tenantId, userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId + " in tenant: " + tenantId));

        // delete all tenant related data
        userRepository.delete(existingUser);
        publicApiKeyRepository.deleteByTenantId(tenantId);
        tenantSettingsRepository.deleteByTenantId(tenantId);


        // delete tenant itself
        tenantRepository.deleteById(tenantId);
    }

    @Override
    @Transactional
    public void activateUser(String tenantId, String userId) {
        User existingUser = userRepository.findByTenantIdAndId(tenantId, userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId + " in tenant: " + tenantId));

        existingUser.setStatus(UserStatus.ACTIVE);
        existingUser.setUpdatedAt(Instant.now());
        tenantService.activateTenant(tenantId); // Ensure tenant is active when activating a user
        userRepository.save(existingUser);
    }

    @Override
    @Transactional
    public void deactivateUser(String tenantId, String userId) {
        User existingUser = userRepository.findByTenantIdAndId(tenantId, userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId + " in tenant: " + tenantId));

        existingUser.setStatus(UserStatus.INACTIVE);
        existingUser.setUpdatedAt(Instant.now());
        tenantService.deactivateTenant(tenantId); // Ensure tenant is deactivated when deactivating a user
        userRepository.save(existingUser);
    }

    @Override
    public void forgotPassword(String email) {
        
    }
    

    

}
