package com.example.conversoBackend.widget.dto;



import lombok.Data;

@Data
public class WidgetChatRequest {
    private String apiKey;
    private String conversationId; // client generated UUID
    private String message;
}
