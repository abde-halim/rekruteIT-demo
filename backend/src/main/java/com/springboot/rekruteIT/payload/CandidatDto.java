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
    private String region;
//    private String email;
    private String telephone;
//    private String login;
//    private String password;
    private Set<LanguageDto> languages;
    private Set<DiplomeDto> diplomes;
    private Set<ExperienceDto> experiences;
}
