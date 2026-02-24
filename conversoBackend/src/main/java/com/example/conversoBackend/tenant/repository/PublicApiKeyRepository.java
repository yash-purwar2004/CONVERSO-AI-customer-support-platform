package com.example.conversoBackend.tenant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.conversoBackend.tenant.model.PublicApiKey;

@Repository
public interface PublicApiKeyRepository extends MongoRepository<PublicApiKey, String> {
    
    // Find a public API key by tenant ID
    Optional<PublicApiKey> findByTenantId(String tenantId);

    // Find a public API key by the key string
    Optional<PublicApiKey> findByKey(String key);

    void deleteByTenantId(String tenantId);

}
