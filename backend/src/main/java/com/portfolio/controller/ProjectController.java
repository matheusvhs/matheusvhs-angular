package com.portfolio.controller;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.model.Project;
import com.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    // ── Endpoints públicos ────────────────────────────────────────────────────

    @GetMapping("/api/projects")
    public List<Project> listProjects(@RequestParam(required = false) boolean featured) {
        return service.findAll(featured);
    }

    @GetMapping("/api/projects/{slug}")
    public Project getProject(@PathVariable String slug) {
        return service.findBySlug(slug);
    }

    // ── Endpoints admin ───────────────────────────────────────────────────────

    @PostMapping("/api/admin/projects")
    public ResponseEntity<Project> createProject(@Valid @RequestBody ProjectDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/api/admin/projects/{id}")
    public Project updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/api/admin/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
