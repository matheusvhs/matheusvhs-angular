package com.portfolio.service;

import com.portfolio.model.Education;
import com.portfolio.model.Experience;
import com.portfolio.model.Skill;
import com.portfolio.repository.EducationRepository;
import com.portfolio.repository.ExperienceRepository;
import com.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;

    // Skills
    public List<Skill> findAllSkills() {
        return skillRepository.findAllByOrderByCategoryAscLevelDesc();
    }

    public Skill createSkill(com.portfolio.dto.SkillDTO dto) {
        Skill skill = new Skill();
        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());
        skill.setLevel(dto.getLevel());
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Long id, com.portfolio.dto.SkillDTO dto) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill não encontrada: " + id));
        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());
        skill.setLevel(dto.getLevel());
        return skillRepository.save(skill);
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }

    // Experiences
    public List<Experience> findAllExperiences() {
        return experienceRepository.findAllByOrderByStartDateDesc();
    }

    public Experience createExperience(com.portfolio.dto.ExperienceDTO dto) {
        Experience exp = new Experience();
        mapExperience(dto, exp);
        return experienceRepository.save(exp);
    }

    public Experience updateExperience(Long id, com.portfolio.dto.ExperienceDTO dto) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Experiência não encontrada: " + id));
        mapExperience(dto, exp);
        return experienceRepository.save(exp);
    }

    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }

    // Education
    public List<Education> findAllEducations() {
        return educationRepository.findAllByOrderByStartYearDesc();
    }

    public Education createEducation(com.portfolio.dto.EducationDTO dto) {
        Education edu = new Education();
        mapEducation(dto, edu);
        return educationRepository.save(edu);
    }

    public Education updateEducation(Long id, com.portfolio.dto.EducationDTO dto) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Educação não encontrada: " + id));
        mapEducation(dto, edu);
        return educationRepository.save(edu);
    }

    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }

    private void mapExperience(com.portfolio.dto.ExperienceDTO dto, Experience exp) {
        exp.setCompany(dto.getCompany());
        exp.setRole(dto.getRole());
        exp.setStartDate(dto.getStartDate());
        exp.setEndDate(dto.getEndDate());
        exp.setDescription(dto.getDescription());
    }

    private void mapEducation(com.portfolio.dto.EducationDTO dto, Education edu) {
        edu.setInstitution(dto.getInstitution());
        edu.setDegree(dto.getDegree());
        edu.setField(dto.getField());
        edu.setStartYear(dto.getStartYear());
        edu.setEndYear(dto.getEndYear());
    }
}
