package com.springboot.rekruteIT.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Entity
@Table(name="language")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom_lang;
    private String niveau;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidat_id",nullable = false)
    private Candidat candidat;
}
