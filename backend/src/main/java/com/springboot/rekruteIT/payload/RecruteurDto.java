package com.springboot.rekruteIT.payload;

import lombok.Data;

import java.util.Set;

@Data
public class RecruteurDto {
    private int userId;
    private String nomSociete;
    private String description;
    private String ville;
    private String logo;
    private String siteWeb;
    private String email;
    private String telephone;
//    private String adresse;
    private String region;
//    private String login;
//    private String password;
    private Set<OffreDto> offres;
}
