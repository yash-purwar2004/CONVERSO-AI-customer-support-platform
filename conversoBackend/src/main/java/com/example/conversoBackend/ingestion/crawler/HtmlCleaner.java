package com.example.conversoBackend.ingestion.crawler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class HtmlCleaner {
     public static String extractText(String html) {

        Document document = Jsoup.parse(html);
        document.select("script, style, nav, footer, header, noscript").remove();

        return document.body().text();
    }
}
