package com.springboot.rekruteIT.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "candidat_id", nullable = false)
    private Candidat candidat;

    @ManyToOne
    @JoinColumn(name = "offre_id", nullable = false)
    private Offre offre;

    private LocalDate dateCandidature;
    private Integer matchScore;
    @PrePersist
    public void prePersist() {
        this.dateCandidature = LocalDate.now();
    }
}
