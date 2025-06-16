package com.springboot.rekruteIT.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Offre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String titre;
    private int annees_experience;
    private String connaissances;
    private String contrat;
    private String formation;
    private String mission;
    private int salaire;
    private int nbr_postes;
    private String specialite;

    private String ville;
    private String add_notes;
    private LocalDate datePosted;
    private String description;
    private String languages;
    @PrePersist
    public void prePersist() {
        this.datePosted = LocalDate.now();
    }
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruteur_id",nullable = false)
    private Recruteur recruteur;
    @OneToMany(mappedBy = "offre", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Candidature> candidatures = new HashSet<>();

}
