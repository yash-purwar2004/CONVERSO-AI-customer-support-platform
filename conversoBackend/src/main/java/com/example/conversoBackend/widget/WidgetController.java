package com.example.conversoBackend.widget;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.conversoBackend.chat.model.ChatRequest;
import com.example.conversoBackend.chat.model.ChatResponse;
import com.example.conversoBackend.tenant.model.Tenant;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class WidgetController {

    private final WidgetAuthService widgetAuthService;
    private final WidgetChatService widgetChatService;
    public WidgetController(WidgetAuthService widgetAuthService,
                            WidgetChatService widgetChatService) {
        this.widgetAuthService = widgetAuthService;
        this.widgetChatService = widgetChatService;
    }

    @PostMapping("/widget/chat")
    public ResponseEntity<ChatResponse> chat(
            @RequestBody ChatRequest request,
            HttpServletRequest httpRequest) {

        Tenant tenant = widgetAuthService.authenticate(
                request.getApiKey()
        );

        ChatResponse response =
                widgetChatService.processMessage(request, tenant);

        return ResponseEntity.ok(response);
    }
}
