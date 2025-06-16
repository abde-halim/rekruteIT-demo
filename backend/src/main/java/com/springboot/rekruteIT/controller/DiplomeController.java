package com.springboot.rekruteIT.controller;


import com.springboot.rekruteIT.entity.Diplome;
import com.springboot.rekruteIT.payload.CandidatDto;
import com.springboot.rekruteIT.payload.DiplomeDto;
import com.springboot.rekruteIT.payload.LanguageDto;
import com.springboot.rekruteIT.service.DiplomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DiplomeController {

    private DiplomeService diplomeService;

    public DiplomeController(DiplomeService diplomeService) {
        this.diplomeService = diplomeService;
    }

    @PostMapping("/candidat/{id}/diplomes/create")
    public ResponseEntity<DiplomeDto> createDiplome(@PathVariable int id, @RequestBody DiplomeDto diplomeDto) {
        return new ResponseEntity<>(diplomeService.createDiplome(id,diplomeDto), HttpStatus.CREATED);
    }
    @GetMapping("/candidat/{id}/diplomes")
    public List<DiplomeDto> getDiplomesByCandidatId(@PathVariable int id) {
        return diplomeService.getDiplomesByCandidatId(id);
    }

    @GetMapping("/candidat/{idCandidat}/diplomes/{idDiplome}")
    public DiplomeDto getLanguageById(@PathVariable int idCandidat, @PathVariable int idDiplome) {
        return diplomeService.getDiplomeById(idCandidat, idDiplome);
    }

    @PutMapping("/candidat/{idCandidat}/diplomes/{idDiplome}")
    public DiplomeDto updateDiplome(@PathVariable int idCandidat, @PathVariable int idDiplome, @RequestBody DiplomeDto diplome) {
        return diplomeService.updateDiplome(idCandidat, idDiplome, diplome);
    }
    @DeleteMapping("/candidat/{idCandidat}/diplomes/{idDiplome}")
    public ResponseEntity<String> deleteDiplome(@PathVariable int idCandidat, @PathVariable int idDiplome) {
        diplomeService.deleteDiplome(idCandidat, idDiplome);
        return new ResponseEntity<>("Diplome deleted successfully", HttpStatus.OK);
    }
}
