package com.springboot.rekruteIT.service;

import com.springboot.rekruteIT.payload.CandidatDto;
import org.springframework.stereotype.Service;

public interface CandidatService {
    CandidatDto getCandidatById(int id);

    CandidatDto createCandidat(CandidatDto candidatDto);

    CandidatDto updateCandidat(int id ,CandidatDto candidatDto);

    CandidatDto deleteCandidat(int id);
}

