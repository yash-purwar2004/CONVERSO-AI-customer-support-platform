package com.example.conversoBackend.ingestion.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vector_documents")
public class VectorDocument {
    @Id
    private String id;

    private String tenantId;
    private String pageId;
    private String content;

    // Gemini embedding vector
    private List<Double> embedding;

    private long createdAt;

    public VectorDocument() {}

    public VectorDocument(String tenantId,
                          String pageId,
                          String content,
                          List<Double> embedding) {

        this.tenantId = tenantId;
        this.pageId = pageId;
        this.content = content;
        this.embedding = embedding;
        this.createdAt = System.currentTimeMillis();
    }
    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getPageId() {
        return pageId;
    }

    public void setPageId(String pageId) {
        this.pageId = pageId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Double> getEmbedding() {
        return embedding;
    }

    public void setEmbedding(List<Double> embedding) {
        this.embedding = embedding;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
}
