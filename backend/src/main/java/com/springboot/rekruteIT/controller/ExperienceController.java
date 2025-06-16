package com.springboot.rekruteIT.controller;


import com.springboot.rekruteIT.payload.DiplomeDto;
import com.springboot.rekruteIT.payload.ExperienceDto;
import com.springboot.rekruteIT.service.ExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExperienceController {
    private ExperienceService experienceService;
    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }
    @PostMapping("/candidat/{id}/experiences/create")
    public ResponseEntity<ExperienceDto> createDiplome(@PathVariable int id, @RequestBody ExperienceDto experienceDto) {
        return new ResponseEntity<>(experienceService.createExperience(id,experienceDto), HttpStatus.CREATED);
    }
    @GetMapping("/candidat/{id}/experiences")
    public List<ExperienceDto> getDiplomesByCandidatId(@PathVariable int id) {
        return experienceService.getExperiencesByCandidatId(id);
    }

    @GetMapping("/candidat/{idCandidat}/experiences/{idExperience}")
    public ExperienceDto getExperienceById(@PathVariable int idCandidat, @PathVariable int idExperience) {
        return experienceService.getExperienceById(idCandidat, idExperience);
    }

    @PutMapping("/candidat/{idCandidat}/experiences/{idExperience}")
    public ExperienceDto updateExperience(@PathVariable int idCandidat, @PathVariable int idExperience, @RequestBody ExperienceDto experienceDto) {
        return experienceService.updateExperience(idCandidat, idExperience, experienceDto);
    }
    @DeleteMapping("/candidat/{idCandidat}/experiences/{idExperience}")
    public ResponseEntity<String> deleteExperience(@PathVariable int idCandidat, @PathVariable int idExperience) {
        experienceService.deleteExperience(idCandidat, idExperience);
        return new ResponseEntity<>("experience deleted successfully", HttpStatus.OK);
    }

}
