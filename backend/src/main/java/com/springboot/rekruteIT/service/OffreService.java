package com.springboot.rekruteIT.service;

import com.springboot.rekruteIT.payload.LanguageDto;
import com.springboot.rekruteIT.payload.OffreDto;
import com.springboot.rekruteIT.payload.OffreResponse;

import java.util.List;

public interface OffreService {

    OffreResponse getAllOffres(int pageNo, int PageSize, String sortBy, String sortDir,String region);

    OffreDto getOffre(int offreID);

    OffreDto createOffre(int id, OffreDto offreDto);

    List<OffreDto> getOffreByRecruteurId(int id);

    OffreDto getOffreById(int recruteurtId,int OffreID);

    OffreDto updateOffre(int recruteurtId,int OffreID ,OffreDto offreDto);

    void deleteOffre(int recruteurtId,int OffreID);
}
