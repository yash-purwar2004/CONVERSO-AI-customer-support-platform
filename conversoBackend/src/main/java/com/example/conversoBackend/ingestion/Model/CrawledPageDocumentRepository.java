package com.example.conversoBackend.ingestion.Model;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CrawledPageDocumentRepository extends MongoRepository<CrawledPage, String> {
    List<CrawledPage> findByTenantId(String tenantId);
}
