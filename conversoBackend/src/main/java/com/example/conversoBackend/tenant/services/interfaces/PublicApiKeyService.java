package com.example.conversoBackend.tenant.services.interfaces;

import com.example.conversoBackend.tenant.model.PublicApiKey;

public interface PublicApiKeyService {
    // Generate and persist a public API key for the tenant. Current
    // implementation is a placeholder; persistence can be added later.
    PublicApiKey generateApiKeyForTenant(String tenantId);

    // Retrieve the public API key for a given tenant. This is a placeholder
    PublicApiKey getApiKeyForTenant(String tenantId);
}
