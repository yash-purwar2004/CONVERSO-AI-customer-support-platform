package com.example.conversoBackend.security.util;

// This class is used to store the current tenant ID in a ThreadLocal variable. 
// This allows us to access the tenant ID from anywhere in the application,
// without having to pass it around as a parameter.
public class TenantContext {
    
    private static final ThreadLocal<String> CURRENT_TENANT =
        new ThreadLocal<>();

    public static void setTenant(String tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    public static String getTenant() {
        return CURRENT_TENANT.get();
    }

    public static void clear() {
        CURRENT_TENANT.remove();
    }

}