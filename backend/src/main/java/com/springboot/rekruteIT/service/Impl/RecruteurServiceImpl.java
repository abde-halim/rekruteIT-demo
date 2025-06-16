package com.springboot.rekruteIT.service.Impl;

import com.springboot.rekruteIT.entity.Offre;
import com.springboot.rekruteIT.entity.User;
import com.springboot.rekruteIT.payload.OffreDto;
import com.springboot.rekruteIT.payload.OffreResponse;
import com.springboot.rekruteIT.payload.RecruteurDto;
import com.springboot.rekruteIT.entity.Recruteur;
import com.springboot.rekruteIT.exceptions.RessourceNotFoundException;
import com.springboot.rekruteIT.payload.RecruteurResponse;
import com.springboot.rekruteIT.repository.RecruteurRepository;
import com.springboot.rekruteIT.repository.UserRepository;
import com.springboot.rekruteIT.service.RecruteurService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecruteurServiceImpl implements RecruteurService {
    private RecruteurRepository recruteurRepository;
    private UserRepository userRepository;


    public RecruteurServiceImpl(RecruteurRepository recruteurRepository,UserRepository userRepository) {
        this.recruteurRepository = recruteurRepository;
        this.userRepository = userRepository;
    }

    @Override
    public RecruteurResponse getAllRecruteurs(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Recruteur> posts = recruteurRepository.findAll(pageable);

        List<Recruteur> ListOfPosts = posts.getContent();

        List<RecruteurDto> content = ListOfPosts.stream().map(post -> mapToDto(post)).collect(Collectors.toList());
        RecruteurResponse recruteurResponse = new RecruteurResponse();
        recruteurResponse.setContent(content);
        recruteurResponse.setPageNo(pageNo);
        recruteurResponse.setPageSize(pageSize);
        recruteurResponse.setTotalElements(ListOfPosts.size());
        recruteurResponse.setTotalPages(posts.getTotalPages());
        recruteurResponse.setLast(posts.isLast());
        return recruteurResponse;
    }

    public RecruteurDto createRecruteur(RecruteurDto recruteurDto){
        Recruteur recruteur = mapToEntity(recruteurDto);

        Recruteur newRecruteur = recruteurRepository.save(recruteur);
        RecruteurDto RecruteurDtoResponse = mapToDto(newRecruteur);


        return RecruteurDtoResponse;
    }

    public RecruteurDto getRecruteur(int id){
        Recruteur recruteur = recruteurRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Recruteur","id",String.valueOf(id)));
        return mapToDto(recruteur);
    }


    public RecruteurDto updateRecruteur(int id,RecruteurDto recruteurDto){
        Recruteur recruteur = recruteurRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Recruteur","id",String.valueOf(id)));
        //recruteur.setAdresse(recruteurDto.getAdresse());
        recruteur.setLogo(recruteurDto.getLogo());
//        recruteur.setEmail(recruteurDto.getEmail());
//        recruteur.setLogin(recruteurDto.getLogin());
//        recruteur.setPassword(recruteurDto.getPassword());
        recruteur.setTelephone(recruteurDto.getTelephone());
        recruteur.setRegion(recruteurDto.getRegion());
        recruteur.setDescription(recruteurDto.getDescription());
        recruteur.setNomSociete(recruteurDto.getNomSociete());
        recruteur.setVille(recruteurDto.getVille());
        recruteur.setSiteWeb(recruteurDto.getSiteWeb());
        Recruteur updateRecruteur = recruteurRepository.save(recruteur);
        return mapToDto(updateRecruteur);
    }

    public RecruteurDto deleteRecruteur(int id){
        Recruteur recruteur = recruteurRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Recruteur","id",String.valueOf(id)));
        recruteurRepository.delete(recruteur);
        return null;
    }


    private Recruteur mapToEntity(RecruteurDto recruteurDto){
        Recruteur recruteur = new Recruteur();
        User user = userRepository.findById(recruteurDto.getUserId())
                .orElseThrow(() -> new RessourceNotFoundException("User", "id", String.valueOf(recruteurDto.getUserId())));
       // recruteur.setAdresse(recruteurDto.getAdresse());
        recruteur.setUserId(user);
        recruteur.setLogo(recruteurDto.getLogo());
        recruteur.setRegion(recruteurDto.getRegion());
        recruteur.setDescription(recruteurDto.getDescription());
        recruteur.setNomSociete(recruteurDto.getNomSociete());
        recruteur.setVille(recruteurDto.getVille());
//        recruteur.setLogin(recruteurDto.getLogin());
//        recruteur.setEmail(recruteurDto.getEmail());
//        recruteur.setPassword(recruteurDto.getPassword());
        recruteur.setTelephone(recruteurDto.getTelephone());
        recruteur.setSiteWeb(recruteurDto.getSiteWeb());
        return recruteur;
    }
    private RecruteurDto mapToDto(Recruteur recruteur){
        RecruteurDto recruteurResponse = new RecruteurDto();
        recruteurResponse.setUserId(recruteur.getUserAccountId());
        recruteurResponse.setNomSociete(recruteur.getNomSociete());
        //recruteurResponse.setAdresse(recruteur.getAdresse());
//        recruteurResponse.setEmail(recruteur.getEmail());
//        recruteurResponse.setLogin(recruteur.getLogin());
        recruteurResponse.setLogo(recruteur.getLogo());
        recruteurResponse.setRegion(recruteur.getRegion());
        recruteurResponse.setDescription(recruteur.getDescription());
//        recruteurResponse.setNomSociete(recruteur.getNomSociete());
        recruteurResponse.setVille(recruteur.getVille());
//        recruteurResponse.setPassword(recruteur.getPassword());
        recruteurResponse.setSiteWeb(recruteur.getSiteWeb());
        recruteurResponse.setTelephone(recruteur.getTelephone());
        return recruteurResponse;
    }

}


