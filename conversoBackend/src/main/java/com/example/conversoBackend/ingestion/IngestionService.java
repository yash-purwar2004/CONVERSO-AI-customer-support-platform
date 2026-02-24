package com.example.conversoBackend.ingestion;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.example.conversoBackend.security.util.TenantContext;
import com.example.conversoBackend.embeddings.GeminiEmbeddingService;
import com.example.conversoBackend.ingestion.Model.CrawledPage;
import com.example.conversoBackend.ingestion.Model.VectorDocument;
import com.example.conversoBackend.ingestion.chunker.TextChunker;
import com.example.conversoBackend.ingestion.crawler.CrawlResult;
import com.example.conversoBackend.ingestion.crawler.WebCrawler;

@Service
public class IngestionService {
    private final WebCrawler webCrawler;
    private final TextChunker textChunker;
    private final GeminiEmbeddingService embeddingService;
    private final MongoTemplate mongoTemplate;

    public IngestionService(WebCrawler webCrawler,
                            TextChunker textChunker,
                            GeminiEmbeddingService embeddingService,
                            MongoTemplate mongoTemplate) {

        this.webCrawler = webCrawler;
        this.textChunker = textChunker;
        this.embeddingService = embeddingService;
        this.mongoTemplate = mongoTemplate;
    }

    public void ingestWebsite(String url) {

        String tenantId = TenantContext.getTenant();

        if (tenantId == null) {
            throw new RuntimeException("Tenant not found in context");
        }

        // Crawl Website
        List<CrawlResult> pages = webCrawler.crawl(url);

        for (CrawlResult page : pages) {

            // Save Crawled Page
            CrawledPage savedPage = mongoTemplate.save(
                    new CrawledPage(tenantId, page.getUrl(), page.getContent())
            );

            //Chunk Content
            List<String> chunks = textChunker.chunk(page.getContent());

            for (String chunk : chunks) {

                //Generate Embedding (Sequential + Rate Limited)
                List<Double> embedding =
                        embeddingService.generateEmbedding(chunk);

                //Save Vector Document
                mongoTemplate.save(
                        new VectorDocument(
                                tenantId,
                                savedPage.getId(),
                                chunk,
                                embedding
                        )
                );
            }
        }
    }
}
