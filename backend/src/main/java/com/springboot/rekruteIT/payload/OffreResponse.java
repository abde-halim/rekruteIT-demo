package com.springboot.rekruteIT.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OffreResponse {
    private List<OffreDto> content;
    private int pageNo;
    private int pageSize;
    private double totalElements;
    private int totalPages;
    private boolean last;
}
