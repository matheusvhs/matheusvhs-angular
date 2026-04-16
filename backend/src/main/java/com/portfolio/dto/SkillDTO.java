package com.portfolio.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class SkillDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    private String category;

    @Min(1) @Max(5)
    private int level;
}
