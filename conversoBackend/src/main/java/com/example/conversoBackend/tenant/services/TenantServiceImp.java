package com.example.conversoBackend.tenant.services;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.conversoBackend.tenant.model.PublicApiKey;
import com.example.conversoBackend.tenant.model.Tenant;
import com.example.conversoBackend.tenant.model.TenantSettings;
import com.example.conversoBackend.tenant.model.TenantStatus;
import com.example.conversoBackend.tenant.repository.PublicApiKeyRepository;
import com.example.conversoBackend.tenant.repository.TenantRepository;
import com.example.conversoBackend.tenant.repository.TenantSettingsRepository;
import com.example.conversoBackend.tenant.services.interfaces.TenantService;
import com.example.conversoBackend.tenant.services.interfaces.TenantSettingService;

@Service // This annotation indicates that this class is a service component in the Spring context
public class TenantServiceImp implements TenantService {

    private final TenantRepository tenantRepository;
    private final PublicApiKeyRepository publicApiKeyRepository;
    private final TenantSettingsRepository tenantSettingsRepository;

    public TenantServiceImp(TenantRepository tenantRepository, PublicApiKeyRepository publicApiKeyRepository, TenantSettingService tenantSettingService, PublicApiKeyServiceImpl publicApiKeyService, TenantSettingsRepository tenantSettingsRepository) {
        this.tenantRepository = tenantRepository;
        this.publicApiKeyRepository = publicApiKeyRepository;
        this.tenantSettingsRepository = tenantSettingsRepository;
    }


    @Override
    public Tenant getTenantById(String tenantId) {
        return tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found with ID: " + tenantId));
    }

    @Override
    public List<Tenant> getAllTenants() {
        List<Tenant> tenants = tenantRepository.findByStatusNot(TenantStatus.SUSPENDED);
        if (tenants.isEmpty()) {
            throw new RuntimeException("No tenants found.");
        }
        return tenants;
    }
    

    @Override
    public Tenant updateTenant(String tenantId, Tenant tenant) {
        Tenant existingTenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found with ID: " + tenantId + " for update."));

        existingTenant.setCompanyName(tenant.getCompanyName());
        existingTenant.setDomain(tenant.getDomain());
        existingTenant.setUpdatedAt(Instant.now());

        return tenantRepository.save(existingTenant);
    }

    @Override
    public void deleteTenant(String tenantId) {
        Tenant existingTenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found with ID: " + tenantId + " for deletion."));

        TenantSettings tenantsetting = tenantSettingsRepository.findByTenantId(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant settings not found for tenant ID: " + tenantId));
        PublicApiKey publicApiKey = publicApiKeyRepository.findByTenantId(tenantId)
                .orElseThrow(() -> new RuntimeException("Public API key not found for tenant ID: " + tenantId));

        tenantSettingsRepository.delete(tenantsetting);
        publicApiKeyRepository.delete(publicApiKey);
        tenantRepository.delete(existingTenant);
    }

    @Override
    public void activateTenant(String tenantId ) {
        Tenant existingTenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found with ID: " + tenantId + " for activation."));

        existingTenant.setStatus(TenantStatus.ACTIVE);
        existingTenant.setUpdatedAt(Instant.now());
        PublicApiKey publicApiKey = publicApiKeyRepository.findByTenantId(tenantId)
                .orElseThrow(() -> new RuntimeException("Public API key not found for tenant ID: " + tenantId));

        publicApiKey.setStatus(TenantStatus.ACTIVE);
        publicApiKeyRepository.save(publicApiKey);
        tenantRepository.save(existingTenant);
    }

    @Override
    public void deactivateTenant(String tenantId) {
        Tenant existingTenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found with ID: " + tenantId + " for deactivation."));

        existingTenant.setStatus(TenantStatus.SUSPENDED);
        existingTenant.setUpdatedAt(Instant.now());

        PublicApiKey publicApiKey = publicApiKeyRepository.findByTenantId(tenantId)
                .orElseThrow(() -> new RuntimeException("Public API key not found for tenant ID: " + tenantId));

        publicApiKey.setStatus(TenantStatus.SUSPENDED);
        publicApiKeyRepository.save(publicApiKey);
        tenantRepository.save(existingTenant);
    }
}
