package com.portfolio.controller;

import com.portfolio.dto.ArticleDTO;
import com.portfolio.model.Article;
import com.portfolio.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService service;

    // ── Endpoints públicos ────────────────────────────────────────────────────

    @GetMapping("/api/articles")
    public List<Article> listArticles() {
        return service.findAllPublished();
    }

    @GetMapping("/api/articles/{slug}")
    public Article getArticle(@PathVariable String slug) {
        return service.findBySlug(slug);
    }

    // ── Endpoints admin ───────────────────────────────────────────────────────

    @GetMapping("/api/admin/articles")
    public List<Article> listAllArticles() {
        return service.findAll();
    }

    @PostMapping("/api/admin/articles")
    public ResponseEntity<Article> createArticle(@Valid @RequestBody ArticleDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/api/admin/articles/{id}")
    public Article updateArticle(@PathVariable Long id, @Valid @RequestBody ArticleDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/api/admin/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
