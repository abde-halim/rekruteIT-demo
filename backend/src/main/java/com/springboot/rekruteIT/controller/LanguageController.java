package com.springboot.rekruteIT.controller;

import com.springboot.rekruteIT.payload.LanguageDto;
import com.springboot.rekruteIT.service.LanguageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class LanguageController{

    private LanguageService languageService;

    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @PostMapping("/candidat/{id}/languages/create")
    public ResponseEntity<LanguageDto> createLanguage(@PathVariable int id, @RequestBody LanguageDto languageDto) {
        return new ResponseEntity<>(languageService.createLanguage(id,languageDto), HttpStatus.CREATED);
    }

    @GetMapping("/candidat/{id}/languages")
    public List<LanguageDto> getLanguages(@PathVariable int id) {
        return languageService.getLanguagesByCandidatId(id);
    }

    @GetMapping("/candidat/{idCandidat}/languages/{idLanguage}")
    public LanguageDto getLanguage(@PathVariable int idCandidat, @PathVariable int idLanguage) {
        return languageService.getLanguageById(idCandidat, idLanguage);
    }

    @PutMapping("/candidat/{idCandidat}/languages/{idLanguage}")
    public LanguageDto updateLanguage(@PathVariable int idCandidat, @PathVariable int idLanguage, @RequestBody LanguageDto language) {
        return languageService.updateLanguage(idCandidat, idLanguage, language);
    }
    @DeleteMapping("/candidat/{idCandidat}/languages/{idLanguage}")
    public ResponseEntity<String> deleteLanguage(@PathVariable int idCandidat, @PathVariable int idLanguage) {
        languageService.deleteLanguage(idCandidat, idLanguage);
        return new ResponseEntity<>("Language deleted successfully", HttpStatus.OK);
    }
}
