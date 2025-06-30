package com.springboot.rekruteIT.controller;

import com.springboot.rekruteIT.payload.MatchDto;
import com.springboot.rekruteIT.service.Impl.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/match-score")
    public Map<String, Object> getMatchScore(@RequestBody MatchDto request) {
        double score = aiService.getSimilarityScore(request.getJobText(), request.getCandidateText());
        return Map.of(
                "score", score,
                "percent", Math.round(score * 100)
        );
    }
    @GetMapping("/match-offre-candidats/{offreId}")
    public List<Map<String, Object>> matchOffreWithAllCandidates(@PathVariable Integer offreId) {
        return aiService.getBestMatchingCandidates(offreId);
    }
    @GetMapping("/match-candidat-offres/{candidatId}")
    public List<Map<String, Object>> matchCandidatWithAllOffres(@PathVariable Integer candidatId) {
        return aiService.getBestMatchingOffres(candidatId);
    }

}
