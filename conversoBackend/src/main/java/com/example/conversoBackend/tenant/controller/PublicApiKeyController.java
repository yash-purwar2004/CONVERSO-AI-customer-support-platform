package com.example.conversoBackend.tenant.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.conversoBackend.security.util.TenantContext;
import com.example.conversoBackend.tenant.services.interfaces.PublicApiKeyService;

@RestController
@RequestMapping("/api/tenant")
public class PublicApiKeyController {

    private final PublicApiKeyService publicApiKeyService;

    public PublicApiKeyController(PublicApiKeyService publicApiKeyService) {
        this.publicApiKeyService = publicApiKeyService;
    }

    @GetMapping("/public-api-key")
    public String getPublicApiKey() {

        String tenantId = TenantContext.getTenant();

        if (tenantId == null) {
            throw new IllegalStateException("Tenant not resolved from security context");
        }

        return publicApiKeyService
                .getApiKeyForTenant(tenantId)
                .getKey();
    }
}