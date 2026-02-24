package com.example.conversoBackend.widget;

import org.springframework.stereotype.Service;

import com.example.conversoBackend.chat.ChatService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WidgetChatService {
    private final ChatService chatService;

    public String processMessage(
            String publicId,
            String conversationId,
            String message) {
        return chatService.ask(message).getAnswer();
    }

    // Overload for WidgetController usage
    public com.example.conversoBackend.chat.model.ChatResponse processMessage(
            com.example.conversoBackend.chat.model.ChatRequest request,
            com.example.conversoBackend.tenant.model.Tenant tenant) {
        // Optionally use tenant or request fields as needed
        return chatService.ask(request.getMessage());
    }
}
