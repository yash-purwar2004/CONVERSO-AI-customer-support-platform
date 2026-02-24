package com.example.conversoBackend.ingestion;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.conversoBackend.ingestion.Model.IngestionRequest;
import com.example.conversoBackend.security.util.TenantContext;

@RestController
@RequestMapping("/api/ingestion")
public class IngestionController {
    private final IngestionService ingestionService;

    public IngestionController(IngestionService ingestionService) {
        this.ingestionService = ingestionService;
    }

    @PostMapping("/website")
    public ResponseEntity<?> ingestWebsite(@RequestBody IngestionRequest request) {

        String tenantId = TenantContext.getTenant();

        if (tenantId == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Tenant not found");
        }

        if (request.getUrl() == null || request.getUrl().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body("URL must not be empty");
        }

        try {

            ingestionService.ingestWebsite(request.getUrl());

            return ResponseEntity.ok(
                    "Website ingestion started successfully"
            );

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body("Ingestion failed: " + e.getMessage());
        }
    }
}
