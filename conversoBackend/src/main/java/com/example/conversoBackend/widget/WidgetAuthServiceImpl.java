package com.example.conversoBackend.widget;

import org.springframework.stereotype.Service;

import com.example.conversoBackend.security.util.TenantContext;
import com.example.conversoBackend.tenant.model.Tenant;
import com.example.conversoBackend.tenant.model.TenantStatus;
import com.example.conversoBackend.tenant.repository.TenantRepository;
import com.example.conversoBackend.tenant.repository.PublicApiKeyRepository;
import com.example.conversoBackend.tenant.model.PublicApiKey;

@Service
public class WidgetAuthServiceImpl implements WidgetAuthService {
    private final TenantRepository tenantRepository;
    private final PublicApiKeyRepository publicApiKeyRepository;

    public WidgetAuthServiceImpl(TenantRepository tenantRepository, PublicApiKeyRepository publicApiKeyRepository) {
        this.tenantRepository = tenantRepository;
        this.publicApiKeyRepository = publicApiKeyRepository;
    }

    @Override
    public Tenant authenticate(String apiKey) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException("API key is required");
        }

        PublicApiKey publicApiKey = publicApiKeyRepository.findByKey(apiKey)
                .orElseThrow(() -> new RuntimeException("Invalid API key"));

        Tenant tenant = tenantRepository.findById(publicApiKey.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        if (!tenant.getStatus().equals(TenantStatus.ACTIVE)) {
            throw new RuntimeException("Tenant is disabled");
        }

        // Set tenant context for request scope
        TenantContext.setTenant(tenant.getId());

        return tenant;
    }
}
