package com.example.conversoBackend.chat;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.conversoBackend.chat.model.ChatRequest;
import com.example.conversoBackend.chat.model.ChatResponse;

import com.example.conversoBackend.ingestion.Model.VectorDocument;

@Service
public class ChatService {
    private final RetrievalService retrievalService;
    private final GeminiChatService geminiChatService;

    public ChatService(RetrievalService retrievalService,
                       GeminiChatService geminiChatService) {
        this.retrievalService = retrievalService;
        this.geminiChatService = geminiChatService;
    }

    public ChatResponse ask(String question) {
        List<VectorDocument> relevantChunks =
                retrievalService.retrieveRelevantChunks(question);

        String context = relevantChunks.stream()
                .map(VectorDocument::getContent)
                .collect(Collectors.joining("\n\n"));

        String prompt = """
                You are a helpful AI assistant.
                Use ONLY the context below to answer the question.
                If answer is not found, say you don't know.

                Context:
                %s

                Question:
                %s
                """.formatted(context, question);

        String answer = geminiChatService.generateResponse(prompt);

        return new ChatResponse(answer);
    }

    public ChatResponse processMessage(ChatRequest request, com.example.conversoBackend.tenant.model.Tenant tenant) {
        // You can use tenant info if needed, for now just use question
        return ask(request.getQuestion());
    }
}
