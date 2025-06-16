package com.springboot.rekruteIT.payload;

import lombok.Data;

import java.time.LocalDate;


@Data
public class CandidatureDto {
    private Long id;
    private int candidatId;
    private int offreId;
    private LocalDate dateCandidature;
}
