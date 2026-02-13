package com.example.conversoBackend.tenant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.conversoBackend.tenant.model.TenantSettings;

public interface TenantSettingsRepository extends MongoRepository<TenantSettings, String> {
    // Find settings by tenant ID
    Optional<TenantSettings> findByTenantId(String tenantId);

    void deleteByTenantId(String tenantId);



    
}
