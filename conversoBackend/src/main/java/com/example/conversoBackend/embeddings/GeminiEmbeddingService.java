package com.example.conversoBackend.embeddings;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiEmbeddingService {
    private final WebClient webClient;
    private final SafeEmbeddingExecutor executor;
    private final ObjectMapper objectMapper;

    @Value("${ai.gemini.api.key}")
    private String apiKey;

    public GeminiEmbeddingService(SafeEmbeddingExecutor executor) {

        this.executor = executor;
        this.objectMapper = new ObjectMapper();

        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    public List<Double> generateEmbedding(String text) {

        return executor.execute(() -> {

            String requestBody = buildRequest(text);

            String response = webClient.post()
                    .uri("/v1beta/models/gemini-embedding-001:embedContent?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            try {
                return parseEmbedding(response);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        });
    }

    private String buildRequest(String text) {

        return """
                {
                  "content": {
                    "parts": [
                      {
                        "text": "%s"
                      }
                    ]
                  }
                }
                """.formatted(text.replace("\"", "\\\""));
    }

    private List<Double> parseEmbedding(String json) throws Exception {

        JsonNode root = objectMapper.readTree(json);

        JsonNode embeddingNode =
                root.path("embedding").path("values");

        List<Double> vector = new ArrayList<>();

        for (JsonNode value : embeddingNode) {
            vector.add(value.asDouble());
        }

        return vector;
    }
}
