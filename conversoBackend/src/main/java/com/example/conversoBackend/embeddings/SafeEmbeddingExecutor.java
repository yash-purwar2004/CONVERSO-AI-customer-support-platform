package com.example.conversoBackend.embeddings;

import org.springframework.stereotype.Component;

//This prevents rate limit errors.

@Component
public class SafeEmbeddingExecutor {
    private static final int DELAY_MS = 1200; // Safe gap between calls
    private static final int MAX_RETRIES = 3;

    public <T> T execute(EmbeddingOperation<T> operation) {

        int attempt = 0;

        while (attempt < MAX_RETRIES) {
            try {

                Thread.sleep(DELAY_MS); // Prevent rate limit

                return operation.run();

            } catch (Exception e) {

                attempt++;

                try {
                    Thread.sleep(2000L * attempt); // Exponential backoff
                } catch (InterruptedException ignored) {}

                if (attempt >= MAX_RETRIES) {
                    throw new RuntimeException("Embedding failed after retries", e);
                }
            }
        }

        throw new RuntimeException("Unexpected embedding failure");
    }

    @FunctionalInterface
    public interface EmbeddingOperation<T> {
        T run();
    }
}
