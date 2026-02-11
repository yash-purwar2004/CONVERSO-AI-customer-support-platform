package com.example.conversoBackend.tenant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.conversoBackend.tenant.model.PublicApiKey;

public interface PublicApiKeyRepository extends MongoRepository<PublicApiKey, String> {
    
    // Find a public API key by tenant ID
    Optional<PublicApiKey> findByTenantId(String tenantId);
}
