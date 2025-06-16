package com.springboot.rekruteIT.repository;

import com.springboot.rekruteIT.entity.Diplome;
import com.springboot.rekruteIT.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository  extends JpaRepository<Experience, Integer> {
    List<Experience> findByCandidatUserAccountId(int candidatId);

}
