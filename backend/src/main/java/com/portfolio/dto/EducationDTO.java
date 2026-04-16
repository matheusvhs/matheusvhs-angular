package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class EducationDTO {

    @NotBlank(message = "Instituição é obrigatória")
    private String institution;

    @NotBlank(message = "Grau é obrigatório")
    private String degree;

    private String field;

    private int startYear;

    private int endYear;
}
