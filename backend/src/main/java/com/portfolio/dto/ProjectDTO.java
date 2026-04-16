package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class ProjectDTO {

    @NotBlank(message = "Título é obrigatório")
    private String title;

    private String slug;

    private String summary;

    private String description;

    private String techStack;

    private String githubUrl;

    private String liveUrl;

    private String imageUrl;

    private boolean featured;
}
