package com.springboot.rekruteIT.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CodeVerificationDto {
    private String email;
    private String password;
    private String role;
    private String code;
}
