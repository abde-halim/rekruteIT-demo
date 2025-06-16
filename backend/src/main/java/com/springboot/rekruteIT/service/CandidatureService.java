package com.springboot.rekruteIT.service;

import com.springboot.rekruteIT.payload.CandidatureDto;

import java.util.List;

public interface CandidatureService {
    CandidatureDto createCandidature(CandidatureDto dto);
    List<CandidatureDto> getAllCandidatures();
    List<CandidatureDto> getCandidaturesByCandidatId(int candidatId);
    List<CandidatureDto> getCandidaturesByOffreId(int offreId);
}
