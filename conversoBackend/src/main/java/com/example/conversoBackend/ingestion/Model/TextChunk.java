package com.example.conversoBackend.ingestion.Model;

import org.springframework.data.annotation.Id;

public class TextChunk {
    @Id
    private String id;

    private String tenantId;
    private String pageId;
    private String content;

    private int chunkIndex;
    private long createdAt;

    public TextChunk() {}

    public TextChunk(String tenantId,
                     String pageId,
                     String content,
                     int chunkIndex) {

        this.tenantId = tenantId;
        this.pageId = pageId;
        this.content = content;
        this.chunkIndex = chunkIndex;
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

    public int getChunkIndex() {
        return chunkIndex;
    }

    public void setChunkIndex(int chunkIndex) {
        this.chunkIndex = chunkIndex;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
}
