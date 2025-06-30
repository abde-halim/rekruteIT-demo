package com.springboot.rekruteIT.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Entity
@Table(name="experience")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String societe;
    private String position;
    private String type_contrat;
    private String type_lieu;
    @Lob

    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidat_id",nullable = false)
    private Candidat candidat;
}
