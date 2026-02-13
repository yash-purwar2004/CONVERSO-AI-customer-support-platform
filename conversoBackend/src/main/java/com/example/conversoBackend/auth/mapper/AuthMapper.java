package com.example.conversoBackend.auth.mapper;

import java.time.Instant;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.conversoBackend.auth.dto.AuthResponse;
import com.example.conversoBackend.auth.dto.SignupRequest;
import com.example.conversoBackend.tenant.model.Tenant;
import com.example.conversoBackend.tenant.model.TenantSettings;
import com.example.conversoBackend.tenant.model.TenantStatus;
import com.example.conversoBackend.user.model.Role;
import com.example.conversoBackend.user.model.User;
import com.example.conversoBackend.user.model.UserStatus;


@Component
public class AuthMapper {
    public Tenant toTenant(SignupRequest request) {

        Tenant tenant = new Tenant();
        tenant.setId(UUID.randomUUID().toString());
        tenant.setCompanyName(request.getCompanyName());
        tenant.setDomain(request.getDomain());
        tenant.setStatus(TenantStatus.ACTIVE);
        tenant.setCreatedAt(Instant.now());
        tenant.setUpdatedAt(Instant.now());

        return tenant;
    }

    public TenantSettings toTenantSettings(SignupRequest request, String tenantId) {

        TenantSettings settings = new TenantSettings();
        settings.setTenantId(tenantId);
        settings.setBotName("Default Bot");
        settings.setTone(request.getTone());
        return settings;
    }

    public User toTenantAdmin(SignupRequest request,
                              String tenantId,
                              PasswordEncoder passwordEncoder) {

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.TENANT_ADMIN);
        user.setTenantId(tenantId);
        user.setStatus(UserStatus.ACTIVE);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());

        return user;
    }

    public AuthResponse toAuthResponse(String token, User user) {

    return new AuthResponse(
            token,
            user.getEmail(),
            user.getRole().name(),
            user.getTenantId()
    );
}

}
