package com.springboot.rekruteIT.service.Impl;

import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.entity.Language;
import com.springboot.rekruteIT.exceptions.RekruteITException;
import com.springboot.rekruteIT.exceptions.RessourceNotFoundException;
import com.springboot.rekruteIT.payload.LanguageDto;
import com.springboot.rekruteIT.repository.CandidatRepository;
import com.springboot.rekruteIT.repository.LanguageRepository;
import com.springboot.rekruteIT.service.LanguageService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LanguageServiceImpl implements LanguageService {

    private LanguageRepository languageRepository;
    private CandidatRepository candidatRepository;
    private ModelMapper mapper;

    public LanguageServiceImpl(LanguageRepository languageRepository , CandidatRepository candidatRepository,ModelMapper mapper) {
        this.languageRepository = languageRepository;
        this.candidatRepository = candidatRepository;
        this.mapper = mapper;
    }


    public LanguageDto createLanguage(int id,LanguageDto languageDto){
        Language language = mapToLanguageEntity(languageDto);
        Candidat candidat = candidatRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(id)));
        language.setCandidat(candidat);
        Language newLanguage = languageRepository.save(language);
        return mapToLanguageDto(newLanguage);
    }

    public List<LanguageDto> getLanguagesByCandidatId(int id){
        List<Language> languages = languageRepository.findByCandidatUserAccountId(id);
        return languages.stream().map(language -> mapToLanguageDto(language)).collect(Collectors.toList());
    }

    public LanguageDto getLanguageById(int candidatId, int languageId){
        Candidat candidat = candidatRepository.findById(candidatId).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(candidatId)));
        Language language = languageRepository.findById(languageId).orElseThrow(() -> new RessourceNotFoundException("Language", "id", String.valueOf(languageId)));
//        if(language.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"language doesn't belog to candidat");
//        }
        return mapToLanguageDto(language);
    }

    public LanguageDto updateLanguage(int candidatId,int languageId ,LanguageDto languageDto){
        Candidat candidat = candidatRepository.findById(candidatId).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(candidatId)));
        Language language = languageRepository.findById(languageId).orElseThrow(() -> new RessourceNotFoundException("Language", "id", String.valueOf(languageId)));
//        if(language.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"language doesn't belog to candidat");
//        }
        language.setNiveau(languageDto.getNiveau());
        language.setNom_lang(languageDto.getNom_lang());
        Language updatedLanguage = languageRepository.save(language);
        return mapToLanguageDto(updatedLanguage);
    }

    public void deleteLanguage(int candidatId,int languageId){
        Candidat candidat = candidatRepository.findById(candidatId).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(candidatId)));
        Language language = languageRepository.findById(languageId).orElseThrow(() -> new RessourceNotFoundException("Language", "id", String.valueOf(languageId)));
//        if(language.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"language doesn't belog to candidat");
//        }
        languageRepository.delete(language);
            }
    public LanguageDto mapToLanguageDto(Language language){
//        LanguageDto languageDto = new LanguageDto();
//        languageDto.setNiveau(language.getNiveau());
//        languageDto.setId(language.getId());
//        languageDto.setNom_lang(language.getNom_lang());
        LanguageDto languageDto = mapper.map(language, LanguageDto.class);
        return languageDto;
    }
    public Language mapToLanguageEntity(LanguageDto languageDto){
//        Language language = new Language();
//        language.setId(languageDto.getId());
//        language.setNom_lang(languageDto.getNom_lang());
//        language.setNiveau(languageDto.getNiveau());
        Language language = mapper.map(languageDto, Language.class);
        return language;
    }
}
