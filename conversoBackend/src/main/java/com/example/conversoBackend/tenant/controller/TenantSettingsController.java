package com.example.conversoBackend.tenant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.conversoBackend.tenant.model.TenantSettings;
import com.example.conversoBackend.tenant.services.interfaces.TenantSettingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("tenantSettings")
public class TenantSettingsController {

    @Autowired
    private TenantSettingService tenantSettingService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('TENANT_ADMIN')") // This annotation ensures that only users with the ADMIN or TENANT_ADMIN role can access this endpoint.
    @GetMapping("/id/{tenantId}")
    public TenantSettings getTenantSettings(@PathVariable String tenantId) {
        return tenantSettingService.getSettingsByTenantId(tenantId);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TENANT_ADMIN')") // This annotation ensures that only users with the ADMIN or TENANT_ADMIN role can access this endpoint.
    @PutMapping("/update/{tenantId}")
    public TenantSettings updateTenantSettings(@PathVariable String tenantId, @RequestBody TenantSettings settings) {
        return tenantSettingService.updateSettings(tenantId, settings);
    }
}
