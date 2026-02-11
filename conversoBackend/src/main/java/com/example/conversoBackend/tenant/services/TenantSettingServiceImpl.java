package com.example.conversoBackend.tenant.services;

import org.springframework.stereotype.Service;
import com.example.conversoBackend.tenant.model.TenantSettings;
import com.example.conversoBackend.tenant.repository.TenantSettingsRepository;
import com.example.conversoBackend.tenant.services.interfaces.TenantSettingService;

@Service
public class TenantSettingServiceImpl implements TenantSettingService{
    
    private final TenantSettingsRepository tenantSettingsRepository;
    
    public TenantSettingServiceImpl(TenantSettingsRepository tenantSettingsRepository) {
        this.tenantSettingsRepository = tenantSettingsRepository;
    }

    @Override
    public TenantSettings createDefaultSettings(TenantSettings defaultSettings) {
        TenantSettings settings = new TenantSettings();
        settings.setTenantId(defaultSettings.getTenantId());
        settings.setBotName(defaultSettings.getBotName());
        settings.setTone(defaultSettings.getTone());
        return tenantSettingsRepository.save(settings);
    }

    @Override
    public TenantSettings getSettingsByTenantId(String tenantId) {
        return tenantSettingsRepository.findByTenantId(tenantId)
                .orElseThrow(() -> new RuntimeException("Settings not found for tenant ID: " + tenantId));
    }

    @Override
    public TenantSettings updateSettings(String tenantId, TenantSettings settings) {
        TenantSettings existingSettings = tenantSettingsRepository.findByTenantId(tenantId)
                .orElseThrow(() -> new RuntimeException("Settings not found for tenant ID: " + tenantId));

        existingSettings.setBotName(settings.getBotName());
        existingSettings.setTone(settings.getTone());
        return tenantSettingsRepository.save(existingSettings);
    }
}
