package com.example.conversoBackend.tenant.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.conversoBackend.tenant.model.Tenant;
import com.example.conversoBackend.tenant.model.TenantStatus;

public interface TenantRepository extends MongoRepository<Tenant, String> {

    // find a tenant by its unique ID
    Optional<Tenant> findById(String id);

    // check if a tenant with the given domain already exists
    boolean existsByDomain(String domain);

    // list all non-deleted tenants
    List<Tenant> findByStatusNot(TenantStatus status);

    void deleteById(String tenantId);


}
