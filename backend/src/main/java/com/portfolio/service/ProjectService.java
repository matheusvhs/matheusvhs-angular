package com.portfolio.service;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;

    public List<Project> findAll(boolean featuredOnly) {
        if (featuredOnly) {
            return repository.findByFeaturedTrue();
        }
        return repository.findAll();
    }

    public Project findBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado: " + slug));
    }

    public Project findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado: " + id));
    }

    public Project create(ProjectDTO dto) {
        Project project = new Project();
        mapDtoToEntity(dto, project);
        return repository.save(project);
    }

    public Project update(Long id, ProjectDTO dto) {
        Project project = findById(id);
        mapDtoToEntity(dto, project);
        return repository.save(project);
    }

    public void delete(Long id) {
        Project project = findById(id);
        repository.delete(project);
    }

    private void mapDtoToEntity(ProjectDTO dto, Project project) {
        project.setTitle(dto.getTitle());
        project.setSummary(dto.getSummary());
        project.setDescription(dto.getDescription());
        project.setTechStack(dto.getTechStack());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveUrl(dto.getLiveUrl());
        project.setImageUrl(dto.getImageUrl());
        project.setFeatured(dto.isFeatured());
        // slug: usa o do DTO se fornecido, senão deixa o @PrePersist gerar
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            project.setSlug(dto.getSlug());
        }
    }
}
