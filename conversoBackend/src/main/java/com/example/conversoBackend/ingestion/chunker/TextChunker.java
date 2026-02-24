package com.example.conversoBackend.ingestion.chunker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TextChunker {

    @Value("${ailo.chunking.chunk-size:800}")
    private int chunkSize;

    @Value("${ailo.chunking.overlap:150}")
    private int overlap;

    private static final int MAX_TEXT_LENGTH = 200_000; // 🔥 Hard safety limit

    public List<String> chunk(String text) {

        List<String> chunks = new ArrayList<>();

        if (text == null || text.isBlank()) {
            return chunks;
        }

        // 🔥 Prevent huge page crash
        if (text.length() > MAX_TEXT_LENGTH) {
            text = text.substring(0, MAX_TEXT_LENGTH);
        }

        int start = 0;
        int length = text.length();

        while (start < length) {

            int end = Math.min(start + chunkSize, length);

            chunks.add(text.substring(start, end));

            // 🔥 Ensure forward movement
            int nextStart = end - overlap;

            if (nextStart <= start) {
                break; // prevent infinite loop
            }

            start = nextStart;
        }

        return chunks;
    }
}