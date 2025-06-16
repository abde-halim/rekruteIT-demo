package com.springboot.rekruteIT.service;

import com.springboot.rekruteIT.payload.OffreResponse;
import com.springboot.rekruteIT.payload.RecruteurDto;
import com.springboot.rekruteIT.payload.RecruteurResponse;

public interface RecruteurService {

    RecruteurResponse getAllRecruteurs(int pageNo, int PageSize, String sortBy, String sortDir);

    RecruteurDto createRecruteur(RecruteurDto recruteurDto);

    RecruteurDto getRecruteur(int id);

    RecruteurDto updateRecruteur(int id,RecruteurDto recruteurDto);

    RecruteurDto deleteRecruteur(int id);
}
