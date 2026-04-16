package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class ArticleDTO {

    @NotBlank(message = "Título é obrigatório")
    private String title;

    private String slug;

    private String summary;

    private String content;

    private boolean published;
}
