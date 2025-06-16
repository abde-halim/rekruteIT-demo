package com.springboot.rekruteIT.repository;

import com.springboot.rekruteIT.entity.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatRepository extends JpaRepository<Candidat, Integer> {
}
