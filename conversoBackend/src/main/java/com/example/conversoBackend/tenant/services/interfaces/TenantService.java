package com.example.conversoBackend.tenant.services.interfaces;

import java.util.List;

import com.example.conversoBackend.tenant.model.Tenant;

public interface TenantService {

    // READ
    Tenant getTenantById(String tenantId);
    List<Tenant> getAllTenants();

    // UPDATE
    Tenant updateTenant(String tenantId, Tenant tenant); 

    // DELETE
    void deleteTenant(String tenantId);

    // STATUS MANAGEMENT
    void activateTenant(String tenantId);
    void deactivateTenant(String tenantId);
}
