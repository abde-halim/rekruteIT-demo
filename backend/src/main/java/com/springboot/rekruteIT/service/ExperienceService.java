package com.springboot.rekruteIT.service;

import com.springboot.rekruteIT.payload.ExperienceDto;

import java.util.List;

public interface ExperienceService {
    ExperienceDto createExperience(int id, ExperienceDto experienceDto);

    ExperienceDto getExperienceById(int idCandidat, int idExperience);
    List<ExperienceDto> getExperiencesByCandidatId(int id);
    ExperienceDto updateExperience(int idCandidat, int idExperience,ExperienceDto experienceDto);

    void deleteExperience(int idCandidat, int idExperience);
}
