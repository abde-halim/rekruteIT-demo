package com.springboot.rekruteIT.repository;

import com.springboot.rekruteIT.entity.Language;
import com.springboot.rekruteIT.entity.Offre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OffreRepository extends JpaRepository<Offre, Integer> {
    List<Offre> findByRecruteurUserAccountId(int recruteurId);
}
