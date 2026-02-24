package com.example.conversoBackend.ingestion.crawler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

@Component
public class WebCrawler {
    private static final int MAX_PAGES = 10; // VERY IMPORTANT (free tier safe)
    private static final int TIMEOUT = 10000;
    private static final int DELAY_MS = 1000; // polite crawling

    public List<CrawlResult> crawl(String baseUrl) {

        List<CrawlResult> results = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        queue.add(baseUrl);
        visited.add(baseUrl);

        while (!queue.isEmpty() && results.size() < MAX_PAGES) {

            String url = queue.poll();

            try {
                Thread.sleep(DELAY_MS); // polite delay

                Connection connection = Jsoup.connect(url)
                        .timeout(TIMEOUT)
                        .userAgent("Mozilla/5.0");

                Document document = connection.get();

                String cleanText = HtmlCleaner.extractText(document.html());

                if (!cleanText.isBlank()) {
                    results.add(new CrawlResult(url, cleanText));
                }

                // collect internal links
                Elements links = document.select("a[href]");

                links.forEach(link -> {
                    String nextUrl = link.absUrl("href");

                    if (isValidInternalLink(baseUrl, nextUrl) && !visited.contains(nextUrl)) {
                        visited.add(nextUrl);
                        queue.add(nextUrl);
                    }
                });

            } catch (InterruptedException | IOException e) {
                // skip failed pages
                System.out.println("Failed to crawl: " + url);
            }
        }

        return results;
    }

    private boolean isValidInternalLink(String baseUrl, String url) {

        if (url == null || url.isBlank()) return false;

        return url.startsWith(baseUrl)
                && !url.contains("#")
                && !url.contains("mailto:")
                && !url.endsWith(".pdf")
                && !url.endsWith(".jpg")
                && !url.endsWith(".png");
    }
}
