package com.springboot.rekruteIT.service;

import com.springboot.rekruteIT.payload.LanguageDto;

import java.util.List;

public interface LanguageService {
  //  LanguageDto getLanguagesByCandidatID(int postId);

    LanguageDto createLanguage(int id,LanguageDto languageDto);

    List<LanguageDto> getLanguagesByCandidatId(int id);

    LanguageDto getLanguageById(int candidatId,int languageId);

    LanguageDto updateLanguage(int candidatId,int languageId ,LanguageDto languageDto);

    void deleteLanguage(int candidatId,int languageId);
}
