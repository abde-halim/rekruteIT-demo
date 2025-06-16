package com.springboot.rekruteIT.service.Impl;

import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.entity.Recruteur;
import com.springboot.rekruteIT.entity.User;
import com.springboot.rekruteIT.exceptions.RessourceNotFoundException;
import com.springboot.rekruteIT.payload.CandidatDto;
import com.springboot.rekruteIT.payload.RecruteurDto;
import com.springboot.rekruteIT.repository.CandidatRepository;
import com.springboot.rekruteIT.repository.UserRepository;
import com.springboot.rekruteIT.service.CandidatService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service

public class CandidatServiceImpl implements CandidatService {

    private CandidatRepository candidatRepository;
    private UserRepository userRepository;

    private ModelMapper mapper;


    public CandidatServiceImpl(CandidatRepository candidatRepository,ModelMapper mapper,UserRepository userRepository) {
        this.candidatRepository = candidatRepository;
        this.mapper = mapper;
        this.userRepository = userRepository;
    }

    public CandidatDto getCandidatById(int id){
        Candidat candidat = candidatRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Candidat","id",String.valueOf(id)));
        return mapToDto(candidat);
    }

    public CandidatDto createCandidat(CandidatDto candidatDto){
        Candidat candidat = mapToEntity(candidatDto);
//        System.out.println(candidat);
        Candidat newCandidat = candidatRepository.save(candidat);
        return mapToDto(newCandidat);
    }

    public CandidatDto deleteCandidat(int id){
        Candidat candidat = candidatRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Candidat","id",String.valueOf(id)));
        candidatRepository.delete(candidat);
        return mapToDto(candidat);
    }
    public CandidatDto updateCandidat(int id, CandidatDto candidatDto){
        Candidat candidat = candidatRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Candidat", "id", String.valueOf(id)));

        candidat.setNom(candidatDto.getNom());
        candidat.setPrenom(candidatDto.getPrenom());
        candidat.setTelephone(candidatDto.getTelephone());
        candidat.setVille(candidatDto.getVille());
        candidat.setRegion(candidatDto.getRegion());
        candidat.setImage(candidatDto.getImage());
        Candidat updatedCandidat = candidatRepository.save(candidat);

        return mapToDto(updatedCandidat);
    }


    private Candidat mapToEntity(CandidatDto candidatDto){
        Candidat candidat = new Candidat();
        User user = userRepository.findById(candidatDto.getUserId())
                .orElseThrow(() -> new RessourceNotFoundException("User", "id", String.valueOf(candidatDto.getUserId())));


        candidat.setUserId(user);
        candidat.setNom(candidatDto.getNom());
        candidat.setPrenom(candidatDto.getPrenom());
//        candidat.setEmail(candidatDto.getEmail());
        candidat.setTelephone(candidatDto.getTelephone());
        candidat.setVille(candidatDto.getVille());
        candidat.setRegion(candidatDto.getRegion());
        candidat.setImage(candidatDto.getImage());
//        candidat.setLogin(candidatDto.getLogin());
//        candidat.setPassword(candidatDto.getPassword());
//        Candidat candidat = mapper.map(candidatDto, Candidat.class);
//        User user = userRepository.findById(candidatDto.getUserId())
//                .orElseThrow(() -> new RessourceNotFoundException("User", "id", String.valueOf(candidatDto.getUserId())));
//
//
//        candidat.setUserId(user);
//        System.out.println(candidat);
        return candidat;
    }

    private CandidatDto mapToDto(Candidat candidat){
//        CandidatDto candidatResponse = new CandidatDto();
//        candidatResponse.setId(candidat.getId());
//        candidatResponse.setEmail(candidat.getEmail());
//        candidatResponse.setImage(candidat.getImage());
//        candidatResponse.setLogin(candidat.getLogin());
//        candidatResponse.setRegion(candidat.getRegion());
//        candidatResponse.setNom(candidat.getNom());
//        candidatResponse.setPrenom(candidat.getPrenom());
//        candidatResponse.setVille(candidat.getVille());
//        candidatResponse.setPassword(candidat.getPassword());
//        candidatResponse.setTelephone(candidat.getTelephone());
        CandidatDto candidatResponse = mapper.map( candidat, CandidatDto.class);
        return candidatResponse;
    }
}
