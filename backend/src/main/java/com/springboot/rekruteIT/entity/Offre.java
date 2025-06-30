package com.springboot.rekruteIT.entity;

import com.springboot.rekruteIT.enums.NiveauDetude;
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


//    @Enumerated(EnumType.STRING)
//    private com.springboot.rekruteIT.enums.Experience experience;
    private String experience;
    @Lob

    private String connaissances;
    private String contrat;
    private String formation;
    @Lob
    private String mission;
    private int salaire;
    private int nbr_postes;
    private String specialite;
    private String region;
    private String ville;
    @Lob
    private String add_notes;
    private LocalDate datePosted;
    @Lob
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
