package com.springboot.rekruteIT.payload;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class DiplomeDto {
    private int id;
    private String ecole;
    private String diplome_titre;
    private String specialite;
    private LocalDate dateDebut;
    private LocalDate dateFin;
}
