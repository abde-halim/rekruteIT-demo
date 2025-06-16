package com.springboot.rekruteIT.service.Impl;

import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.entity.Experience;
import com.springboot.rekruteIT.entity.Language;
import com.springboot.rekruteIT.exceptions.RekruteITException;
import com.springboot.rekruteIT.exceptions.RessourceNotFoundException;
import com.springboot.rekruteIT.payload.ExperienceDto;
import com.springboot.rekruteIT.payload.LanguageDto;
import com.springboot.rekruteIT.repository.CandidatRepository;
import com.springboot.rekruteIT.repository.ExperienceRepository;
import com.springboot.rekruteIT.service.ExperienceService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    private ExperienceRepository experienceRepository;
    private CandidatRepository candidatRepository;
    private ModelMapper mapper;

    public ExperienceServiceImpl(ExperienceRepository experienceRepository,CandidatRepository candidatRepository,ModelMapper mapper) {
        this.experienceRepository = experienceRepository;
        this.candidatRepository = candidatRepository;
        this.mapper = mapper;
    }

    public ExperienceDto createExperience(int id, ExperienceDto experienceDto){
        Experience experience = mapToExperienceEntity(experienceDto);
        Candidat candidat = candidatRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Experience", "id", String.valueOf(id)));
        experience.setCandidat(candidat);
        Experience newExperience = experienceRepository.save(experience);
        return mapToExperienceDto(newExperience);
    }

    public ExperienceDto getExperienceById(int id,int idExperience){
        Experience experience = experienceRepository.findById(idExperience).orElseThrow(() -> new RessourceNotFoundException("Experience", "id", String.valueOf(idExperience)));

        Candidat candidat = candidatRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Experience", "id", String.valueOf(id)));
//        if(experience.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"experience doesn't belog to candidat");
//        }
        return mapToExperienceDto(experience);
    }
    public List<ExperienceDto> getExperiencesByCandidatId(int id){
        List<Experience> experiences = experienceRepository.findByCandidatUserAccountId(id);
        return experiences.stream().map(exp -> mapToExperienceDto(exp)).collect(Collectors.toList());

    }
    public ExperienceDto updateExperience(int idCandidat, int idExperience,ExperienceDto experienceDto){
        Experience experience = experienceRepository.findById(idExperience).orElseThrow(() -> new RessourceNotFoundException("Experience", "id", String.valueOf(idExperience)));
        Candidat candidat = candidatRepository.findById(idCandidat).orElseThrow(
                () -> new RessourceNotFoundException("Experience", "id", String.valueOf(idExperience)));
//        if(experience.getCandidat().getUserId() != candidat.getUserId()){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"experience doesn't belong to candidat");
//        }
        experience.setPosition(experienceDto.getPosition());
        experience.setSociete(experienceDto.getSociete());
        experience.setDescription(experienceDto.getDescription());
        experience.setDateDebut(experienceDto.getDateDebut());
        experience.setDateFin(experienceDto.getDateFin());
        experience.setType_contrat(experienceDto.getType_contrat());
        experience.setType_lieu(experienceDto.getType_lieu());
        Experience updatedExperience = experienceRepository.save(experience);
        return mapToExperienceDto(updatedExperience);
    }

    public void deleteExperience(int idCandidat, int idExperience){
        Candidat candidat = candidatRepository.findById(idCandidat).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(idCandidat)));
        Experience experience = experienceRepository.findById(idExperience).orElseThrow(() -> new RessourceNotFoundException("Experience", "id", String.valueOf(idExperience)));
//        if(experience.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"Experience doesn't belog to candidat");
//        }
        experienceRepository.delete(experience);
    }
    public ExperienceDto mapToExperienceDto(Experience experience){
//        LanguageDto languageDto = new LanguageDto();
//        languageDto.setNiveau(language.getNiveau());
//        languageDto.setId(language.getId());
//        languageDto.setNom_lang(language.getNom_lang());
    ExperienceDto experienceDto = mapper.map(experience, ExperienceDto.class);
    return experienceDto;
}
    public Experience mapToExperienceEntity(ExperienceDto experienceDto){
//        Language language = new Language();
//        language.setId(languageDto.getId());
//        language.setNom_lang(languageDto.getNom_lang());
//        language.setNiveau(languageDto.getNiveau());
        Experience experience = mapper.map(experienceDto, Experience.class);
        return experience;
    }

}
