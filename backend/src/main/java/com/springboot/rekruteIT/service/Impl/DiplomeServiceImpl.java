package com.springboot.rekruteIT.service.Impl;

import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.entity.Diplome;
import com.springboot.rekruteIT.entity.Language;
import com.springboot.rekruteIT.exceptions.RekruteITException;
import com.springboot.rekruteIT.exceptions.RessourceNotFoundException;
import com.springboot.rekruteIT.payload.DiplomeDto;
import com.springboot.rekruteIT.payload.LanguageDto;
import com.springboot.rekruteIT.repository.CandidatRepository;
import com.springboot.rekruteIT.repository.DiplomeRepository;
import com.springboot.rekruteIT.repository.LanguageRepository;
import com.springboot.rekruteIT.service.DiplomeService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiplomeServiceImpl implements DiplomeService {

    private DiplomeRepository diplomeRepository;
    private CandidatRepository candidatRepository;
    private ModelMapper mapper;

    public DiplomeServiceImpl(DiplomeRepository diplomeRepository,CandidatRepository candidatRepository,ModelMapper mapper) {
        this.diplomeRepository = diplomeRepository;
        this.candidatRepository = candidatRepository;
        this.mapper = mapper;
    }

    public List<DiplomeDto> getDiplomesByCandidatId(int id){
        List<Diplome> diplomes = diplomeRepository.findByCandidatUserAccountId(id);
        return diplomes.stream().map(diplome -> mapToDiplomeDto(diplome)).collect(Collectors.toList());
            }

    public DiplomeDto createDiplome(int id,DiplomeDto diplomeDto){
        Diplome diplome = mapToDiplomeEntity(diplomeDto);
        Candidat candidat = candidatRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Diplome", "id", String.valueOf(id)));
        diplome.setCandidat(candidat);
        Diplome newDiplome = diplomeRepository.save(diplome);
        return mapToDiplomeDto(newDiplome);
    }
    public DiplomeDto getDiplomeById(int candidatId, int diplomeId){
        Candidat candidat = candidatRepository.findById(candidatId).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(candidatId)));
        Diplome diplome = diplomeRepository.findById(diplomeId).orElseThrow(() -> new RessourceNotFoundException("Language", "id", String.valueOf(diplomeId)));
//        if(diplome.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"diplome doesn't belog to candidat");
//        }
        return mapToDiplomeDto(diplome);
    }
    public DiplomeDto updateDiplome(int candidatId,int diplomeId  ,DiplomeDto diplomeDto){
        Candidat candidat = candidatRepository.findById(candidatId).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(candidatId)));
        Diplome diplome = diplomeRepository.findById(diplomeId).orElseThrow(() -> new RessourceNotFoundException("Language", "id", String.valueOf(diplomeId)));
//        if(diplome.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"diplome doesn't belog to candidat");
//        }
//        diplome.setNiveau(languageDto.getNiveau());
//        diplome.setNom_lang(languageDto.getNom_lang());
//        Diplome updatedLanguage = languageRepository.save(language);
        diplome.setDiplome_titre(diplomeDto.getDiplome_titre());
        diplome.setEcole(diplomeDto.getEcole());
        diplome.setDateDebut(diplomeDto.getDateDebut());
        diplome.setDateFin(diplomeDto.getDateFin());
        diplome.setSpecialite(diplomeDto.getSpecialite());
        Diplome updatedDiplome = diplomeRepository.save(diplome);
        return mapToDiplomeDto(updatedDiplome);

    }

    public void deleteDiplome(int candidatId,int diplomeId){
        Candidat candidat = candidatRepository.findById(candidatId).orElseThrow(
                () -> new RessourceNotFoundException("Candidat", "id", String.valueOf(candidatId)));
        Diplome diplome = diplomeRepository.findById(diplomeId).orElseThrow(() -> new RessourceNotFoundException("Language", "id", String.valueOf(diplomeId)));
//        if(diplome.getCandidat().getUserId() != (candidat.getUserId())){
//            throw new RekruteITException(HttpStatus.BAD_REQUEST,"diplome doesn't belog to candidat");
//        }
        diplomeRepository.delete(diplome);
    }
public DiplomeDto mapToDiplomeDto(Diplome diplome){
    DiplomeDto diplomeDto = mapper.map(diplome, DiplomeDto.class);
    return diplomeDto;
}
    public Diplome mapToDiplomeEntity(DiplomeDto diplomeDto){
        Diplome diplome = mapper.map(diplomeDto, Diplome.class);
        return diplome;
    }
}
