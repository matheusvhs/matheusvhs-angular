package com.portfolio.service;

import com.portfolio.dto.ArticleDTO;
import com.portfolio.model.Article;
import com.portfolio.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository repository;

    public List<Article> findAllPublished() {
        return repository.findByPublishedTrueOrderByPublishedAtDesc();
    }

    public List<Article> findAll() {
        return repository.findAll();
    }

    public Article findBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artigo não encontrado: " + slug));
    }

    public Article findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artigo não encontrado: " + id));
    }

    public Article create(ArticleDTO dto) {
        Article article = new Article();
        mapDtoToEntity(dto, article);
        return repository.save(article);
    }

    public Article update(Long id, ArticleDTO dto) {
        Article article = findById(id);
        mapDtoToEntity(dto, article);
        return repository.save(article);
    }

    public void delete(Long id) {
        Article article = findById(id);
        repository.delete(article);
    }

    private void mapDtoToEntity(ArticleDTO dto, Article article) {
        article.setTitle(dto.getTitle());
        article.setSummary(dto.getSummary());
        article.setContent(dto.getContent());
        boolean wasPublished = article.isPublished();
        article.setPublished(dto.isPublished());
        // Define publishedAt na primeira vez que o artigo for publicado
        if (dto.isPublished() && !wasPublished) {
            article.setPublishedAt(LocalDateTime.now());
        }
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            article.setSlug(dto.getSlug());
        }
    }
}
