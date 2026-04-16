package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor
public class ExperienceDTO {

    @NotBlank(message = "Empresa é obrigatória")
    private String company;

    @NotBlank(message = "Cargo é obrigatório")
    private String role;

    @NotNull(message = "Data de início é obrigatória")
    private LocalDate startDate;

    private LocalDate endDate;

    private String description;
}
