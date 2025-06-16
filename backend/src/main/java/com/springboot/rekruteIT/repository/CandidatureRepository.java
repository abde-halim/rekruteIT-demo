package com.springboot.rekruteIT.repository;

import com.springboot.rekruteIT.entity.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findByCandidatUserIdUserId(int candidatId);
    List<Candidature> findByOffreId(int offreId);
}
