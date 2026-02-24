package com.example.conversoBackend.tenant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.conversoBackend.tenant.model.TenantSettings;

@Repository
public interface TenantSettingsRepository extends MongoRepository<TenantSettings, String> {
    // Find settings by tenant ID
    Optional<TenantSettings> findByTenantId(String tenantId);

    void deleteByTenantId(String tenantId);



    
}
