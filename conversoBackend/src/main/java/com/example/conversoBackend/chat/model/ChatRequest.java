package com.example.conversoBackend.chat.model;

public class ChatRequest {
    private String question;
    private String apiKey;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getMessage() {
        return question;
    }
}
