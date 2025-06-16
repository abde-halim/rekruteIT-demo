package com.springboot.rekruteIT.repository;

import com.springboot.rekruteIT.entity.Language;
import com.springboot.rekruteIT.payload.LanguageDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
    List<Language> findByCandidatUserAccountId(int candidatId);
}

