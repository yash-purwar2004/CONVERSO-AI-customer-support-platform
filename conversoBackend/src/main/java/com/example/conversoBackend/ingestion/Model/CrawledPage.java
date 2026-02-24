package com.example.conversoBackend.ingestion.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "crawled_pages")
public class CrawledPage {
    @Id
    private String id;

    private String tenantId;
    private String url;
    private String content;

    private long createdAt;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }

    public CrawledPage() {}

    public CrawledPage(String tenantId, String url, String content) {
        this.tenantId = tenantId;
        this.url = url;
        this.content = content;
        this.createdAt = System.currentTimeMillis();
    }

}
