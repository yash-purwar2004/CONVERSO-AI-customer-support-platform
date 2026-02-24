package com.example.conversoBackend.chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiChatService {
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${ai.gemini.api.key}")
    private String apiKey;

    @Value("${ai.gemini.chat.model}")
    private String model;

    public GeminiChatService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    public String generateResponse(String prompt) {

        try {

            String requestBody = """
                {
                  "contents": [
                    {
                      "parts": [
                        { "text": "%s" }
                      ]
                    }
                  ]
                }
                """.formatted(escapeJson(prompt));

            String response = webClient.post()
                    .uri("/v1beta/models/" + model + ":generateContent?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractTextFromResponse(response);

        } catch (Exception e) {
            throw new RuntimeException("Gemini API call failed", e);
        }
    }

    private String extractTextFromResponse(String response) throws Exception {

        JsonNode root = objectMapper.readTree(response);

        return root.path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();
    }

    private String escapeJson(String text) {
        return text.replace("\"", "\\\"")
                   .replace("\n", "\\n");
    }

}
