package com.springboot.rekruteIT.entity;

import com.springboot.rekruteIT.enums.NiveauDetude;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Candidat {
    @Id
////    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  userAccountId;

    @OneToOne
    @JoinColumn(name = "user_account_id")
    @MapsId
//    private User userId;
    private User userId;
    private String nom;
    private String prenom;
    private int age;
    private String image;
    private String ville;
    private String region;
    private String email;
    private String telephone;
    private String post;

    private String experience;

    private String niveauScolaire;

    @OneToMany(mappedBy = "candidat", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Language> languages = new HashSet<>();
    @OneToMany(mappedBy = "candidat", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Diplome> diplomes = new HashSet<>();
    @OneToMany(mappedBy = "candidat", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Experience> experiences = new HashSet<>();

    @OneToMany(mappedBy = "candidat", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Candidature> candidatures = new HashSet<>();

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
}