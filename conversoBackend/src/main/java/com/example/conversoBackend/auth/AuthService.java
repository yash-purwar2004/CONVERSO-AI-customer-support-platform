package com.example.conversoBackend.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.conversoBackend.auth.dto.AuthResponse;
import com.example.conversoBackend.auth.dto.LoginRequest;
import com.example.conversoBackend.auth.dto.SignupRequest;
import com.example.conversoBackend.auth.mapper.AuthMapper;
import com.example.conversoBackend.security.jwt.JwtTokenProvider;
import com.example.conversoBackend.tenant.model.Tenant;
import com.example.conversoBackend.tenant.model.TenantSettings;
import com.example.conversoBackend.tenant.repository.TenantRepository;
import com.example.conversoBackend.tenant.services.interfaces.PublicApiKeyService;
import com.example.conversoBackend.tenant.services.interfaces.TenantSettingService;
import com.example.conversoBackend.user.model.User;
import com.example.conversoBackend.user.model.UserStatus;
import com.example.conversoBackend.user.repository.UserRepository;


@Service
public class AuthService {

    private PublicApiKeyService publicApiKeyService;
    private TenantRepository tenantRepository;
    private TenantSettingService tenantSettingService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthMapper authMapper;


    AuthService(PublicApiKeyService publicApiKeyService, TenantRepository tenantRepository,
                TenantSettingService tenantSettingService, UserRepository userRepository,
                PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, AuthMapper authMapper) {
        this.publicApiKeyService = publicApiKeyService;
        this.tenantRepository = tenantRepository;
        this.tenantSettingService = tenantSettingService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authMapper = authMapper;
    }

    @Transactional // This annotation indicates that the method should be executed within a transaction. If any part of the method fails, the entire transaction will be rolled back, ensuring data integrity.
    public AuthResponse signup(SignupRequest request) {
        Tenant tenant = authMapper.toTenant(request);
        Tenant savedTenant = tenantRepository.save(tenant);

        TenantSettings settings = authMapper.toTenantSettings(request, savedTenant.getId());
        tenantSettingService.createDefaultSettings(settings);

        publicApiKeyService.generateApiKeyForTenant(savedTenant.getId());

        User tenantAdmin = authMapper.toTenantAdmin(request, savedTenant.getId(), passwordEncoder);
        userRepository.save(tenantAdmin);

        String token = jwtTokenProvider.generateToken(tenantAdmin);
        return new AuthResponse(token, tenantAdmin.getEmail(), tenantAdmin.getRole().name(), savedTenant.getId());
    }


    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException("Account is not active");
        }


        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user);

        return authMapper.toAuthResponse(token, user);
    }
}
