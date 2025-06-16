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

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository candidatureRepo;
    private final CandidatRepository candidatRepo;
    private final OffreRepository offreRepo;
    private ModelMapper mapper;


    @Override
    public CandidatureDto createCandidature(CandidatureDto candidatureDto) {
        Candidat candidat = candidatRepo.findById(candidatureDto.getCandidatId())
                .orElseThrow(() -> new RekruteITException(HttpStatus.NOT_FOUND,"Candidat not found"));
        Offre offre = offreRepo.findById(candidatureDto.getOffreId())
                .orElseThrow(() -> new RekruteITException(HttpStatus.NOT_FOUND,"offre not found"));
        Candidature candidature = new Candidature();
        candidature.setCandidat(candidat);
        candidature.setOffre(offre);
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
        return candidatureRepo.findByCandidatUserIdUserId(candidatId).stream().map(candidature -> mapToDTO(candidature)).collect(Collectors.toList());
    }

    @Override
    public List<CandidatureDto> getCandidaturesByOffreId(int offreId) {
        return candidatureRepo.findByOffreId(offreId).stream().map(candidature -> mapToDTO(candidature)).collect(Collectors.toList());
    }
    public CandidatureDto mapToDTO(Candidature candidature) {
        CandidatureDto candidatureDto = mapper.map(candidature, CandidatureDto.class);
        return candidatureDto;
    }
    public Candidature DTOTomap(CandidatureDto candidatureDto) {
        Candidature candidature = mapper.map(candidatureDto , Candidature.class);
        return candidature;
    }
}
