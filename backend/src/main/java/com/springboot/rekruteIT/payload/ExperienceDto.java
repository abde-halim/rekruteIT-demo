package com.springboot.rekruteIT.payload;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExperienceDto {
    private int id;
    private String societe;
    private String position;
    private String type_contrat;
    private String type_lieu;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
}
