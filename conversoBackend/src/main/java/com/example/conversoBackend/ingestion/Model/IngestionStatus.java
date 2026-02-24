package com.example.conversoBackend.ingestion.Model;

public enum IngestionStatus {
    STARTED,
    CRAWLING,
    CHUNKING,
    EMBEDDING,
    COMPLETED,
    FAILED
}
