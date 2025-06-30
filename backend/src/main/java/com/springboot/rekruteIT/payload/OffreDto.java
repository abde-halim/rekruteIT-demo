package com.springboot.rekruteIT.payload;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OffreDto {
    public int id;
    public String titre;
    public String experience;
    public String connaissances;
    public String contrat;
    public String region;
    public String formation;
    public String mission;
    public int salaire;
    public int nbr_postes;
    public String specialite;
    public String ville;
    public String add_notes;
    private LocalDate datePosted;
    private String description;
    private String languages;
}
