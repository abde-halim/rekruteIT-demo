package com.springboot.rekruteIT.controller;

import com.springboot.rekruteIT.payload.CandidatureDto;
import com.springboot.rekruteIT.service.CandidatureService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    private final CandidatureService candidatureService;

    public CandidatureController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
    }

    @PostMapping("/create")
    public ResponseEntity<CandidatureDto> create(@RequestBody CandidatureDto candidatureDto) {
        return ResponseEntity.ok(candidatureService.createCandidature(candidatureDto));
    }

    @GetMapping
    public ResponseEntity<List<CandidatureDto>> getAll() {
        return ResponseEntity.ok(candidatureService.getAllCandidatures());
    }

    @GetMapping("/candidat/{candidatId}")
    public ResponseEntity<List<CandidatureDto>> getByCandidat(@PathVariable int candidatId) {
        return ResponseEntity.ok(candidatureService.getCandidaturesByCandidatId(candidatId));
    }

    @GetMapping("/offre/{offreId}")
    public ResponseEntity<List<CandidatureDto>> getByOffre(@PathVariable int offreId) {
        return ResponseEntity.ok(candidatureService.getCandidaturesByOffreId(offreId));
    }
}
