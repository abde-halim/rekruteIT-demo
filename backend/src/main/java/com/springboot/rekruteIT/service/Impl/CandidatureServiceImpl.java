package com.springboot.rekruteIT.service.Impl;

import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.entity.Candidature;
import com.springboot.rekruteIT.entity.Offre;
import com.springboot.rekruteIT.exceptions.RekruteITException;
import com.springboot.rekruteIT.payload.CandidatureDto;
import com.springboot.rekruteIT.repository.CandidatRepository;
import com.springboot.rekruteIT.repository.CandidatureRepository;
import com.springboot.rekruteIT.repository.OffreRepository;
import com.springboot.rekruteIT.service.CandidatureService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository candidatureRepo;
    private final CandidatRepository candidatRepo;
    private final OffreRepository offreRepo;
    private ModelMapper mapper;
    private AIService aiService;

    @Override
    public CandidatureDto createCandidature(CandidatureDto candidatureDto) {
        Candidat candidat = candidatRepo.findById(candidatureDto.getCandidatId())
                .orElseThrow(() -> new RekruteITException(HttpStatus.NOT_FOUND, "Candidat not found"));
        Offre offre = offreRepo.findById(candidatureDto.getOffreId())
                .orElseThrow(() -> new RekruteITException(HttpStatus.NOT_FOUND, "offre not found"));
        String jobText = formatOffreToText(offre);
        String candidatText = formatCandidatToText(candidat);

        double score = aiService.getSimilarityScore(jobText, candidatText);
        int percent = (int) Math.round(score * 100);

        Candidature candidature = new Candidature();
        candidature.setCandidat(candidat);
        candidature.setOffre(offre);
        candidature.setMatchScore(percent);
        Candidature saved = candidatureRepo.save(candidature);
        return mapToDTO(saved);
    }

    @Override
    public List<CandidatureDto> getAllCandidatures() {
        List<Candidature> candidatures = candidatureRepo.findAll();
        return candidatures.stream().map(candidature -> mapToDTO(candidature)).collect(Collectors.toList());
    }

    @Override
    public List<CandidatureDto> getCandidaturesByCandidatId(int candidatId) {
        return candidatureRepo.findByCandidatUserIdUserId(candidatId).stream().map(candidature -> mapToDTO(candidature))
                .collect(Collectors.toList());
    }

    @Override
    public List<CandidatureDto> getCandidaturesByOffreId(int offreId) {
        return candidatureRepo.findByOffreId(offreId).stream().map(candidature -> mapToDTO(candidature))
                .collect(Collectors.toList());
    }
    // private String formatOffreToText(Offre offre) {
    // return String.format(
    // "%s developer position requiring skills in %s. Experience needed: %s.",
    // offre.getDescription(),offre.getConnaissances(),
    // offre.getFormation(),
    // offre.getAnnees_experience(),
    // offre.getLanguages(),
    // offre.getVille()
    // );
    // }
    //
    // private String formatCandidatToText(Candidat candidat) {
    // return String.format(
    // "%s with skills in %s. Experience: %s. Education: %s.",
    // candidat.getExperience(),
    // candidat.getNiveauScolaire(),
    // candidat.getLanguages(),
    // candidat.getDiplomes(),
    // candidat.getVille()
    // );
    // }

    private String formatOffreToText(Offre offre) {
        StringBuilder jobText = new StringBuilder();

        // Job title and description
        jobText.append("Job Position: ").append(offre.getTitre() != null ? offre.getTitre() : "N/A").append(". ");
        jobText.append("Description: ").append(offre.getDescription() != null ? offre.getDescription() : "N/A")
                .append(". ");
        jobText.append("Mission: ").append(offre.getMission() != null ? offre.getMission() : "N/A").append(". ");

        // Required experience
        jobText.append("Required Experience: ").append(offre.getExperience()).append(" years. ");

        // Skills and knowledge
        jobText.append("Required Skills: ").append(offre.getConnaissances() != null ? offre.getConnaissances() : "N/A")
                .append(". ");

        // Education requirements
        jobText.append("Required Education: ").append(offre.getFormation() != null ? offre.getFormation() : "N/A")
                .append(". ");

        // Languages
        jobText.append("Required Languages: ").append(offre.getLanguages() != null ? offre.getLanguages() : "N/A")
                .append(". ");

        // Location and contract details
        jobText.append("Location: ").append(offre.getVille() != null ? offre.getVille() : "N/A").append(". ");
        jobText.append("Contract Type: ").append(offre.getContrat() != null ? offre.getContrat() : "N/A").append(". ");
        jobText.append("Specialty: ").append(offre.getSpecialite() != null ? offre.getSpecialite() : "N/A")
                .append(". ");
        jobText.append("Salary: ").append(offre.getSalaire()).append(". ");
        jobText.append("Number of Positions: ").append(offre.getNbr_postes()).append(". ");

        // Additional notes
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

        candidatText.append("Education Level: ")
                .append(candidat.getNiveauScolaire() != null ? candidat.getNiveauScolaire() : "N/A").append(". ");

        if (candidat.getLanguages() != null && !candidat.getLanguages().isEmpty()) {
            String languages = candidat.getLanguages().stream()
                    .map(lang -> lang.getNom_lang() + " ("
                            + (lang.getNiveau() != null ? lang.getNiveau() : "Unknown level") + ")")
                    .collect(Collectors.joining(", "));
            candidatText.append("Languages: ").append(languages).append(". ");
        }

        if (candidat.getDiplomes() != null && !candidat.getDiplomes().isEmpty()) {
            String diplomes = candidat.getDiplomes().stream()
                    .map(diplome -> {
                        StringBuilder diplomaInfo = new StringBuilder();
                        diplomaInfo.append(diplome.getDiplome_titre() != null ? diplome.getDiplome_titre() : "Diploma");

                        if (diplome.getSpecialite() != null) {
                            diplomaInfo.append(" in ").append(diplome.getSpecialite());
                        }

                        if (diplome.getEcole() != null) {
                            diplomaInfo.append(" from ").append(diplome.getEcole());
                        }

                        if (diplome.getDateDebut() != null && diplome.getDateFin() != null) {
                            diplomaInfo.append(" (").append(diplome.getDateDebut().getYear())
                                    .append("-").append(diplome.getDateFin().getYear()).append(")");
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
                        if (!duration.isEmpty()) {
                            expString.append(" (").append(duration).append(")");
                        }

                        if (exp.getType_contrat() != null) {
                            expString.append(" - ").append(exp.getType_contrat());
                        }

                        if (exp.getType_lieu() != null) {
                            expString.append(" - ").append(exp.getType_lieu());
                        }

                        if (exp.getDescription() != null && !exp.getDescription().trim().isEmpty()) {
                            expString.append(" - ").append(exp.getDescription());
                        }

                        if (exp.getDateFin() == null && exp.getDateDebut() != null) {
                            expString.append(" (Current Position)");
                        }

                        return expString.toString();
                    })
                    .collect(Collectors.joining("; "));
            candidatText.append("Work Experience: ").append(experiences).append(". ");
        }

        if (candidat.getExperience() != null && !candidat.getExperience().trim().isEmpty()) {
            candidatText.append("Additional Experience Summary: ").append(candidat.getExperience()).append(". ");
        }

        candidatText.append("Location: ").append(candidat.getVille() != null ? candidat.getVille() : "N/A");
        if (candidat.getRegion() != null) {
            candidatText.append(", ").append(candidat.getRegion());
        }
        candidatText.append(". ");

        if (candidat.getTelephone() != null) {
            candidatText.append("Phone: ").append(candidat.getTelephone()).append(".");
        }

        return candidatText.toString();
    }

    private String calculateDuration(LocalDate startDate, LocalDate endDate) {
        if (startDate == null) {
            return "";
        }

        LocalDate actualEndDate = (endDate != null) ? endDate : LocalDate.now();

        if (startDate.isAfter(actualEndDate)) {
            return "Invalid date range";
        }

        Period period = Period.between(startDate, actualEndDate);
        int years = period.getYears();
        int months = period.getMonths();

        StringBuilder duration = new StringBuilder();

        if (years > 0) {
            duration.append(years).append(years == 1 ? " year" : " years");
        }

        if (months > 0) {
            if (duration.length() > 0) {
                duration.append(" ");
            }
            duration.append(months).append(months == 1 ? " month" : " months");
        }

        if (duration.length() == 0) {
            return "Less than 1 month";
        }

        return duration.toString();
    }

    public CandidatureDto mapToDTO(Candidature candidature) {
        CandidatureDto candidatureDto = mapper.map(candidature, CandidatureDto.class);
        return candidatureDto;
    }

    public Candidature DTOTomap(CandidatureDto candidatureDto) {
        Candidature candidature = mapper.map(candidatureDto, Candidature.class);
        return candidature;
    }
}
