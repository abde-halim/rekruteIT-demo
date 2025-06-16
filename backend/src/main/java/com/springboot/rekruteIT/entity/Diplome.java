package com.springboot.rekruteIT.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="diplome")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Diplome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String ecole;
    private String diplome_titre;
    private String specialite;
    private LocalDate dateDebut;
    private LocalDate dateFin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidat_id",nullable = false)
    private Candidat candidat;
}
