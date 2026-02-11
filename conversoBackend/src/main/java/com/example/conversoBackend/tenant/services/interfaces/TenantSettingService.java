package com.example.conversoBackend.tenant.services.interfaces;
import com.example.conversoBackend.tenant.model.TenantSettings;

public interface TenantSettingService {

    // Initialize default settings for a new tenant
    TenantSettings createDefaultSettings(TenantSettings tenantSettings);

    // Get settings for a tenant
    TenantSettings getSettingsByTenantId(String tenantId);

    // Update settings for a tenant
    TenantSettings updateSettings(String tenantId, TenantSettings settings);

}
