package com.example.conversoBackend.widget;

import com.example.conversoBackend.tenant.model.Tenant;

public interface WidgetAuthService {
    Tenant authenticate(String apiKey);
}
