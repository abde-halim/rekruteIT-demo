package com.springboot.rekruteIT.repository;

import com.springboot.rekruteIT.entity.Diplome;
import com.springboot.rekruteIT.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiplomeRepository extends JpaRepository<Diplome, Integer> {
    List<Diplome> findByCandidatUserAccountId(int candidatId);
}
