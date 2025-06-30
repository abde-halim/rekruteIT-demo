package com.springboot.rekruteIT.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.entity.Offre;
import com.springboot.rekruteIT.exceptions.RessourceNotFoundException;
import com.springboot.rekruteIT.repository.CandidatRepository;
import com.springboot.rekruteIT.repository.OffreRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final OffreRepository offreRepository;
    private final CandidatRepository candidatRepository;
    @Autowired
    public AIService(OffreRepository offreRepository, CandidatRepository candidatRepository) {
        this.offreRepository = offreRepository;
        this.candidatRepository = candidatRepository;
    }
    @Value("${app.model.api}")
    private String modelApi;

    public double getSimilarityScore(String jobText, String candidateText) {
        if (jobText == null || jobText.trim().isEmpty() ||
                candidateText == null || candidateText.trim().isEmpty()) {
            System.err.println("Skipping AI call because one or both text inputs are empty.");
            return 0.0;
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        Map<String, Object> body = Map.of(
                "jobText", jobText,
                "candidateText", candidateText
        );

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    modelApi,
                    HttpMethod.POST,
                    requestEntity,
                    Map.class
            );

            if (response.getBody() != null && response.getBody().containsKey("score")) {
                Object scoreObject = response.getBody().get("score");
                if (scoreObject instanceof Number) {
                    return ((Number) scoreObject).doubleValue();
                }
            }

        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Error from Python Service: " + e.getStatusCode());
            System.err.println("Response body: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("A general error occurred in AIService: " + e.getMessage());
        }

        return 0.0;
    }

    public List<Map<String, Object>> getBestMatchingCandidates(Integer offreId) {
        Offre offre = offreRepository.findById(offreId)
                .orElseThrow(() -> new RessourceNotFoundException("Offre"," not "," found"));

        String jobText = formatOffreToText(offre);

        List<Candidat> candidats = candidatRepository.findAll();
        List<Map<String, Object>> results = new ArrayList<>();

        for (Candidat candidat : candidats) {
            String candidatText = formatCandidatToText(candidat);
            double score = getSimilarityScore(jobText, candidatText);
            int percent = (int) Math.round(score * 100);

            Map<String, Object> entry = new HashMap<>();
            entry.put("candidatId", candidat.getUserAccountId());
            entry.put("nom", candidat.getNom());
            entry.put("prenom", candidat.getPrenom());
            entry.put("percent", percent);
            results.add(entry);
        }
        results.sort((a, b) -> ((Integer) b.get("percent")).compareTo((Integer) a.get("percent")));
        return results;
    }

    public List<Map<String, Object>> getBestMatchingOffres( Integer candidatId){
//public void getBestMatchingOffres( Integer candidatId){
        Candidat candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new RessourceNotFoundException("candidat"," not "," found"));

        String candidatText = formatCandidatToText(candidat);

        List<Offre> offres = offreRepository.findAll();
        List<Map<String, Object>> results = new ArrayList<>();

        for (Offre offre : offres) {
            String jobText = formatOffreToText(offre);
            double score = getSimilarityScore(jobText, candidatText);
            int percent = (int) Math.round(score * 100);

            Map<String, Object> entry = new HashMap<>();
            entry.put("offreId", offre.getId());
            entry.put("titre", offre.getTitre());
            entry.put("recruteur", offre.getRecruteur().getUserAccountId());
            entry.put("description", offre.getDescription());
            entry.put("percent", percent);
            results.add(entry);
        }
        results.sort((a, b) -> ((Integer) b.get("percent")).compareTo((Integer) a.get("percent")));
        return results;
    }
    private String formatOffreToText(Offre offre) {
        StringBuilder jobText = new StringBuilder();

        jobText.append("Job Position: ").append(offre.getTitre() != null ? offre.getTitre() : "N/A").append(". ");
        jobText.append("Description: ").append(offre.getDescription() != null ? offre.getDescription() : "N/A").append(". ");
        jobText.append("Mission: ").append(offre.getMission() != null ? offre.getMission() : "N/A").append(". ");
        jobText.append("Required Experience: ").append(offre.getExperience()).append(" years. ");
        jobText.append("Required Skills: ").append(offre.getConnaissances() != null ? offre.getConnaissances() : "N/A").append(". ");
        jobText.append("Required Education: ").append(offre.getFormation() != null ? offre.getFormation() : "N/A").append(". ");
        jobText.append("Required Languages: ").append(offre.getLanguages() != null ? offre.getLanguages() : "N/A").append(". ");
        jobText.append("Location: ").append(offre.getVille() != null ? offre.getVille() : "N/A").append(". ");
        jobText.append("Contract Type: ").append(offre.getContrat() != null ? offre.getContrat() : "N/A").append(". ");
        jobText.append("Specialty: ").append(offre.getSpecialite() != null ? offre.getSpecialite() : "N/A").append(". ");
        jobText.append("Salary: ").append(offre.getSalaire()).append(". ");
        jobText.append("Number of Positions: ").append(offre.getNbr_postes()).append(". ");

        if (offre.getAdd_notes() != null && !offre.getAdd_notes().trim().isEmpty()) {
            jobText.append("Additional Notes: ").append(offre.getAdd_notes()).append(". ");
        }

        return jobText.toString();
    }

    private String formatCandidatToText(Candidat candidat) {
        StringBuilder candidatText = new StringBuilder();

        candidatText.append("Candidate: ").append(candidat.getNom() != null ? candidat.getNom() : "")
                .append(" ").append(candidat.getPrenom() != null ? candidat.getPrenom() : "")
                .append(", Age: ").append(candidat.getAge()).append(". ");

        candidatText.append("Education Level: ").append(candidat.getNiveauScolaire() != null ? candidat.getNiveauScolaire() : "N/A").append(". ");

        if (candidat.getLanguages() != null && !candidat.getLanguages().isEmpty()) {
            String languages = candidat.getLanguages().stream()
                    .map(lang -> lang.getNom_lang() + " (" + (lang.getNiveau() != null ? lang.getNiveau() : "Unknown level") + ")")
                    .collect(Collectors.joining(", "));
            candidatText.append("Languages: ").append(languages).append(". ");
        }

        if (candidat.getDiplomes() != null && !candidat.getDiplomes().isEmpty()) {
            String diplomes = candidat.getDiplomes().stream()
                    .map(diplome -> {
                        StringBuilder diplomaInfo = new StringBuilder();
                        diplomaInfo.append(diplome.getDiplome_titre() != null ? diplome.getDiplome_titre() : "Diploma");
                        if (diplome.getSpecialite() != null) diplomaInfo.append(" in ").append(diplome.getSpecialite());
                        if (diplome.getEcole() != null) diplomaInfo.append(" from ").append(diplome.getEcole());
                        if (diplome.getDateDebut() != null && diplome.getDateFin() != null) {
                            diplomaInfo.append(" (").append(diplome.getDateDebut().getYear()).append("-").append(diplome.getDateFin().getYear()).append(")");
                        } else if (diplome.getDateFin() != null) {
                            diplomaInfo.append(" (").append(diplome.getDateFin().getYear()).append(")");
                        }
                        return diplomaInfo.toString();
                    })
                    .collect(Collectors.joining("; "));
            candidatText.append("Education: ").append(diplomes).append(". ");
        }

        if (candidat.getExperiences() != null && !candidat.getExperiences().isEmpty()) {
            String experiences = candidat.getExperiences().stream()
                    .map(exp -> {
                        StringBuilder expString = new StringBuilder();
                        expString.append(exp.getPosition() != null ? exp.getPosition() : "Position")
                                .append(" at ").append(exp.getSociete() != null ? exp.getSociete() : "Company");

                        String duration = calculateDuration(exp.getDateDebut(), exp.getDateFin());
                        if (!duration.isEmpty()) expString.append(" (").append(duration).append(")");
                        if (exp.getType_contrat() != null) expString.append(" - ").append(exp.getType_contrat());
                        if (exp.getType_lieu() != null) expString.append(" - ").append(exp.getType_lieu());
                        if (exp.getDescription() != null && !exp.getDescription().trim().isEmpty()) expString.append(": '").append(exp.getDescription()).append("'");
                        if (exp.getDateFin() == null && exp.getDateDebut() != null) expString.append(" (Current Position)");

                        return expString.toString();
                    })
                    .collect(Collectors.joining("; "));
            candidatText.append("Work Experience: ").append(experiences).append(". ");
        }

        if (candidat.getExperience() != null && !candidat.getExperience().trim().isEmpty()) {
            candidatText.append("Additional Experience Summary: ").append(candidat.getExperience()).append(". ");
        }

        candidatText.append("Location: ").append(candidat.getVille() != null ? candidat.getVille() : "N/A");
        if (candidat.getRegion() != null) candidatText.append(", ").append(candidat.getRegion());
        candidatText.append(". ");
        if (candidat.getTelephone() != null) candidatText.append("Phone: ").append(candidat.getTelephone()).append(".");

        return candidatText.toString();
    }

    private String calculateDuration(LocalDate start, LocalDate end) {
        if (start == null) {
            return "";
        }
        LocalDate endDate = (end == null) ? LocalDate.now() : end;
        Period period = Period.between(start, endDate);

        long years = period.getYears();
        long months = period.getMonths();

        if (years == 0 && months == 0) {
            return "Less than a month";
        }

        StringBuilder duration = new StringBuilder();
        if (years > 0) {
            duration.append(years).append(years > 1 ? " years" : " year");
        }
        if (months > 0) {
            if (duration.length() > 0) {
                duration.append(" ");
            }
            duration.append(months).append(months > 1 ? " months" : " month");
        }

        return duration.toString();
    }

}
