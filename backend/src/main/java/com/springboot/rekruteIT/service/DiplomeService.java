package com.springboot.rekruteIT.service;

import com.springboot.rekruteIT.payload.DiplomeDto;

import java.util.List;

public interface DiplomeService {

    DiplomeDto createDiplome(int id, DiplomeDto diplomeDto);

    DiplomeDto getDiplomeById(int idCandidat, int idDiplome);
    List<DiplomeDto> getDiplomesByCandidatId(int id);
    DiplomeDto updateDiplome(int idCandidat, int idDiplome,DiplomeDto diplomeDto);

    void deleteDiplome(int idCandidat, int idDiplome);
}
