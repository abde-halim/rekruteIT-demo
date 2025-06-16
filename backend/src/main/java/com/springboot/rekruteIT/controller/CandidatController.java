package com.springboot.rekruteIT.controller;


import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.payload.CandidatDto;
import com.springboot.rekruteIT.service.CandidatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidat/")
public class CandidatController {

    private CandidatService candidatService;

    public CandidatController(CandidatService candidatService) {
        this.candidatService = candidatService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatDto> getCandidatById(@PathVariable int id) {
        return new ResponseEntity<>(candidatService.getCandidatById(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<CandidatDto> createCandidat(@RequestBody CandidatDto candidat) {
        return new ResponseEntity<>(candidatService.createCandidat(candidat), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<CandidatDto> updateCandidat(@PathVariable int id, @RequestBody CandidatDto candidat) {
        return new ResponseEntity<>(candidatService.updateCandidat(id,candidat), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<CandidatDto> deleteCandidat(@PathVariable int id) {
        return new ResponseEntity<>(candidatService.deleteCandidat(id), HttpStatus.OK);
    }


}
