package com.example.conversoBackend.chat;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import java.util.Comparator;

import com.example.conversoBackend.embeddings.GeminiEmbeddingService;
import com.example.conversoBackend.ingestion.Model.VectorDocument;
import com.example.conversoBackend.ingestion.Model.VectorDocumentRepository;
import com.example.conversoBackend.security.util.TenantContext;

@Service
public class RetrievalService {
    private final GeminiEmbeddingService embeddingService;
    private final VectorDocumentRepository chunkRepository;

    public RetrievalService(GeminiEmbeddingService embeddingService,
                            VectorDocumentRepository chunkRepository) {
        this.embeddingService = embeddingService;
        this.chunkRepository = chunkRepository;
    }

    public List<VectorDocument> retrieveRelevantChunks(String question) {
        String tenantId = TenantContext.getTenant();
        List<Double> queryEmbedding = embeddingService.generateEmbedding(question);
        List<VectorDocument> chunks = chunkRepository.findByTenantId(tenantId);
        return chunks.stream()
                .sorted(Comparator.comparingDouble(
                        chunk -> -cosineSimilarity(queryEmbedding,
                                chunk.getEmbedding())))
                .limit(5)
                .collect(Collectors.toList());
    }

    private double cosineSimilarity(List<Double> v1, List<Double> v2) {
        double dot = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;
        for (int i = 0; i < v1.size(); i++) {
            dot += v1.get(i) * v2.get(i);
            norm1 += Math.pow(v1.get(i), 2);
            norm2 += Math.pow(v2.get(i), 2);
        }
        return dot / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
}
