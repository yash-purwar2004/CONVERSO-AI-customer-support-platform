package com.example.conversoBackend.ingestion.Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VectorDocumentRepository extends MongoRepository<VectorDocument, String> {
    List<VectorDocument> findByTenantId(String tenantId);
}
