package com.springboot.rekruteIT.service.Impl;

import com.springboot.rekruteIT.entity.Candidat;
import com.springboot.rekruteIT.entity.Language;
import com.springboot.rekruteIT.entity.Offre;
import com.springboot.rekruteIT.entity.Recruteur;
import com.springboot.rekruteIT.exceptions.RekruteITException;
import com.springboot.rekruteIT.exceptions.RessourceNotFoundException;
import com.springboot.rekruteIT.mappers.OffreMapper;
import com.springboot.rekruteIT.payload.OffreDto;
import com.springboot.rekruteIT.payload.OffreResponse;
import com.springboot.rekruteIT.repository.OffreRepository;
import com.springboot.rekruteIT.repository.RecruteurRepository;
import com.springboot.rekruteIT.service.OffreService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OffreServiceImpl implements OffreService {
    private OffreRepository offreRepository;
    private RecruteurRepository recruteurRepository;
//    private ModelMapper mapper;
    private OffreMapper offreMapper;

    @Override
    public OffreResponse getAllOffres(int pageNo, int pageSize, String sortBy, String sortDir,String region) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Specification<Offre> spec = Specification.where(null);

        if (region != null && !region.isBlank()) {
            Specification<Offre> regionSpec = (root, query, builder) ->
                    builder.equal(builder.lower(root.get("region")), region.toLowerCase());
            spec = spec.and(regionSpec);
        }

//        Page<Offre> posts = offreRepository.findAll(pageable);
        Page<Offre> posts = offreRepository.findAll(spec,pageable);

        List<Offre> listOfPosts = posts.getContent();

        List<OffreDto> content = listOfPosts.stream()
                .map(post -> offreMapper.toDto(post))
                .collect(Collectors.toList());

        OffreResponse offreResponse = new OffreResponse();
        offreResponse.setContent(content);
        offreResponse.setPageNo(posts.getNumber());
        offreResponse.setPageSize(posts.getSize());
        offreResponse.setTotalElements(posts.getTotalElements());
        offreResponse.setTotalPages(posts.getTotalPages());
        offreResponse.setLast(posts.isLast());

        return offreResponse;
    }

    public OffreDto createOffre(int id, OffreDto offreDto){
        Offre offre = offreMapper.toEntity(offreDto);
        Recruteur recruteur = recruteurRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Recruteur", "id", String.valueOf(id)));
        offre.setRecruteur(recruteur);
        Offre newOffre = offreRepository.save(offre);
        OffreDto newOffreDto = offreMapper.toDto(newOffre);
        return newOffreDto;
    }
    public List<OffreDto> getOffreByRecruteurId(int id){
        List<Offre> offres = offreRepository.findByRecruteurUserAccountId(id);
        return offres.stream().map(language -> offreMapper.toDto(language)).collect(Collectors.toList());
    }
    public OffreDto getOffreById(int recruteurtId,int offreID){
        Recruteur recruteur = recruteurRepository.findById(recruteurtId).orElseThrow(
                () -> new RessourceNotFoundException("Recruteur", "id", String.valueOf(recruteurtId)));
        Offre offre = offreRepository.findById(offreID).orElseThrow(() -> new RessourceNotFoundException("Offre", "id", String.valueOf(offreID)));
        if(offre.getRecruteur().getUserId() != (recruteur.getUserId())){
            throw new RekruteITException(HttpStatus.BAD_REQUEST,"language doesn't belog to recruteur");
        }
        return offreMapper.toDto(offre);
    }
    public OffreDto getOffre(int offreID){
        Offre offre = offreRepository.findById(offreID).orElseThrow(() -> new RessourceNotFoundException("Offre", "id", String.valueOf(offreID)));

        return offreMapper.toDto(offre);
    }


    public OffreDto updateOffre(int recruteurtId,int offreID ,OffreDto offreDto){
        Recruteur recruteur = recruteurRepository.findById(recruteurtId).orElseThrow(
                () -> new RessourceNotFoundException("Recruteur", "id", String.valueOf(recruteurtId)));
        Offre offre = offreRepository.findById(offreID).orElseThrow(() -> new RessourceNotFoundException("Offre", "id", String.valueOf(offreID)));
        if(offre.getRecruteur().getUserId() != (recruteur.getUserId())){
            throw new RekruteITException(HttpStatus.BAD_REQUEST,"offre doesn't belog to recruteur");
        }
        offre.setTitre(offreDto.getTitre());
        offre.setDescription(offreDto.getDescription());
        offre.setExperience(offreDto.getExperience());
        offre.setFormation(offreDto.getFormation());
        offre.setConnaissances(offreDto.getConnaissances());
        offre.setContrat(offreDto.getContrat());
        offre.setSalaire(offreDto.getSalaire());
        offre.setMission(offreDto.getMission());
        offre.setNbr_postes(offreDto.getNbr_postes());
         offre.setSpecialite(offreDto.getSpecialite());
         offre.setVille(offreDto.getVille());
         offre.setVille(offreDto.getVille());
        offre.setRegion(offreDto.getRegion());
         offre.setAdd_notes(offreDto.getAdd_notes());
         offre.setLanguages(offreDto.getLanguages());
         Offre offreResponse = offreRepository.save(offre);
        return offreMapper.toDto(offreResponse);
    }
    public void deleteOffre(int recruteurtId,int OffreID){

    }
//    public Offre mapToOffreEntity(OffreDto offreDto){
//        Offre offreResponse = mapper.map(offreDto, Offre.class);
//        return offreResponse;
//    }
//    public OffreDto mapToOffreDto(Offre offre){
//        OffreDto offreResponse = mapper.map(offre, OffreDto.class);
//        return offreResponse;
//    }

}
