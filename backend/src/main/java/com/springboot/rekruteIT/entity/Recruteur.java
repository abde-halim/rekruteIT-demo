package com.springboot.rekruteIT.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
// @Table(name="recruteur", UniqueConstraint)
public class Recruteur {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  userAccountId;

    @OneToOne
    @JoinColumn(name = "user_account_id")
    @MapsId
    private User userId;

    //
    // private String nomSociete;
    //
    private String nomSociete;
    private String description;
    private String ville;
    // private String adresse;
    private String logo;
    private String siteWeb;
    // private String email;
    // private String telephone;
    // private String email;
    private String telephone;
    private String region;
    // private String login;
    // private String password;
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
    @OneToMany(mappedBy = "recruteur", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Offre> offres = new HashSet<>();
}
