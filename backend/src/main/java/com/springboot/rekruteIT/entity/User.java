package com.springboot.rekruteIT.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String email;
//    private String telephone;
    private  String username;
//    private String login;
    private String password;
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "recruteur_id", referencedColumnName = "id")
//    private Recruteur recruteur;
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "candidat_id", referencedColumnName = "id")
//    private Candidat candidat;
//    private Long objectId;
//    private String objectType;
@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
@JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
private Set<Role> roles;
}
