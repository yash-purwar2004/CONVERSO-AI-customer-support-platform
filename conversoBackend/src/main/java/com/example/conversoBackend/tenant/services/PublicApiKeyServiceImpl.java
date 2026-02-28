package com.example.conversoBackend.tenant.services;

import java.util.UUID;
import org.springframework.stereotype.Service;

import com.example.conversoBackend.tenant.model.PublicApiKey;
import com.example.conversoBackend.tenant.model.TenantStatus;
import com.example.conversoBackend.tenant.repository.PublicApiKeyRepository;
import com.example.conversoBackend.tenant.services.interfaces.PublicApiKeyService;

@Service
public class PublicApiKeyServiceImpl implements PublicApiKeyService {

	private final PublicApiKeyRepository publicApiKeyRepository;

	public PublicApiKeyServiceImpl(PublicApiKeyRepository publicApiKeyRepository) {
		this.publicApiKeyRepository = publicApiKeyRepository;
	}

	// Generate and persist a public API key for the tenant. Current
	// implementation is a placeholder; persistence can be added later.
	public PublicApiKey generateApiKeyForTenant(String tenantId) {
		String key = UUID.randomUUID().toString();

		PublicApiKey publicApiKey = new PublicApiKey();
		publicApiKey.setKey(key);
		publicApiKey.setTenantId(tenantId);
		publicApiKey.setStatus(TenantStatus.ACTIVE); // Set the API key as active by default

		publicApiKeyRepository.save(publicApiKey);
		return publicApiKey;
	}

	@Override
	public PublicApiKey getApiKeyForTenant(String tenantId) {
		return publicApiKeyRepository.findByTenantId(tenantId)
				.orElseThrow(() -> new RuntimeException("API key not found for tenant: " + tenantId));
	}
}
