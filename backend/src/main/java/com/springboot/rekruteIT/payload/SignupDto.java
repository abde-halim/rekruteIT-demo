package com.springboot.rekruteIT.payload;

import lombok.Data;

@Data
public class SignupDto {
    private String Email;
    private String username;
//    private String telephone;
    private String password;
    private String role;

}
