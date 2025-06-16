package com.springboot.rekruteIT.controller;


import com.springboot.rekruteIT.payload.LanguageDto;
import com.springboot.rekruteIT.payload.OffreDto;
import com.springboot.rekruteIT.payload.OffreResponse;
import com.springboot.rekruteIT.service.LanguageService;
import com.springboot.rekruteIT.service.OffreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OffreController {

    private OffreService offreService;

    public OffreController(OffreService offreService) {
        this.offreService = offreService;
    }

    @GetMapping("/offres")
    public OffreResponse getPosts(
            @RequestParam(value = "pageNo",defaultValue = "0",required = false) int pageNo,
            @RequestParam(value = "PageSize",defaultValue = "10",required = false) int pageSize,
            @RequestParam(value = "sortBy",defaultValue= "id",required = false) String sortBy,
            @RequestParam(value = "sortDir",defaultValue="ASC",required =false ) String sortDir
    ) {

        return offreService.getAllOffres(pageNo,pageSize,sortBy,sortDir);
    }
    @GetMapping("/offres/{offreID}")
    public OffreDto getOffre(@PathVariable  int offreID){
        return offreService.getOffre(offreID);
    }

    @PostMapping("/recruteur/{id}/offres/create")
    public ResponseEntity<OffreDto>  createOffre(@PathVariable  int id,@RequestBody OffreDto offreDto){
        return new ResponseEntity<>(offreService.createOffre(id,offreDto), HttpStatus.CREATED);

    }

    @GetMapping("/recruteur/{id}/offres")
    public List<OffreDto> getOffers(@PathVariable int id) {
        return offreService.getOffreByRecruteurId(id);
    }

     @GetMapping("/recruteur/{idRecruteur}/offres/{idOffre}")
    public OffreDto getOffre(@PathVariable int idRecruteur,@PathVariable int idOffre) {
        return offreService.getOffreById(idRecruteur,idOffre);
    }
    @PutMapping("/recruteur/{idRecruteur}/offres/{idOffre}")
    public OffreDto updateOffre(@PathVariable int idRecruteur,@PathVariable int idOffre,@RequestBody OffreDto offreDto) {
        return offreService.updateOffre(idRecruteur,idOffre,offreDto);
    }

}
