package com.example.conversoBackend.ingestion.crawler;

public class CrawlResult {
    private final String url;
    private final String content;

    public CrawlResult(String url, String content) {
        this.url = url;
        this.content = content;
    }

    public String getUrl() {
        return url;
    }

    public String getContent() {
        return content;
    }
}
