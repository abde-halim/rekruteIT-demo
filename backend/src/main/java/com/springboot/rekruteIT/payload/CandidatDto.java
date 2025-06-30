package com.springboot.rekruteIT.payload;

import lombok.Data;

import java.util.Set;

@Data
    public class CandidatDto {
    private int userId;
    private String nom;
    private String prenom;
    private int age;
    private String image;
    private String ville;
    private String telephone;
    private String region;
    private String experience;
    private String niveauScolaire;
    private String email;

    private String post;
//    private String password;
    private Set<LanguageDto> languages;
    private Set<DiplomeDto> diplomes;
    private Set<ExperienceDto> experiences;
}
