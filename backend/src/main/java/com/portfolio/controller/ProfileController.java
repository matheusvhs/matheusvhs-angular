package com.portfolio.controller;

import com.portfolio.dto.EducationDTO;
import com.portfolio.dto.ExperienceDTO;
import com.portfolio.dto.SkillDTO;
import com.portfolio.model.Education;
import com.portfolio.model.Experience;
import com.portfolio.model.Skill;
import com.portfolio.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService service;

    // ── Endpoint público ──────────────────────────────────────────────────────

    @GetMapping("/api/profile")
    public Map<String, Object> getProfile() {
        Map<String, Object> profile = new HashMap<>();
        profile.put("skills", service.findAllSkills());
        profile.put("experiences", service.findAllExperiences());
        profile.put("educations", service.findAllEducations());
        return profile;
    }

    // ── Admin: verify ─────────────────────────────────────────────────────────

    @GetMapping("/api/admin/verify")
    public ResponseEntity<Void> verify() {
        return ResponseEntity.ok().build();
    }

    // ── Admin: Skills ─────────────────────────────────────────────────────────

    @PostMapping("/api/admin/skills")
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody SkillDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createSkill(dto));
    }

    @PutMapping("/api/admin/skills/{id}")
    public Skill updateSkill(@PathVariable Long id, @Valid @RequestBody SkillDTO dto) {
        return service.updateSkill(id, dto);
    }

    @DeleteMapping("/api/admin/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        service.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    // ── Admin: Experiences ────────────────────────────────────────────────────

    @PostMapping("/api/admin/experiences")
    public ResponseEntity<Experience> createExperience(@Valid @RequestBody ExperienceDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createExperience(dto));
    }

    @PutMapping("/api/admin/experiences/{id}")
    public Experience updateExperience(@PathVariable Long id, @Valid @RequestBody ExperienceDTO dto) {
        return service.updateExperience(id, dto);
    }

    @DeleteMapping("/api/admin/experiences/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        service.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }

    // ── Admin: Education ──────────────────────────────────────────────────────

    @PostMapping("/api/admin/educations")
    public ResponseEntity<Education> createEducation(@Valid @RequestBody EducationDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createEducation(dto));
    }

    @PutMapping("/api/admin/educations/{id}")
    public Education updateEducation(@PathVariable Long id, @Valid @RequestBody EducationDTO dto) {
        return service.updateEducation(id, dto);
    }

    @DeleteMapping("/api/admin/educations/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        service.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}
