package com.springboot.rekruteIT.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JWTAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String email;
    private int userId;

    private String role;
    public JWTAuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
    public JWTAuthResponse(String accessToken, String username, String email, String role,int userId) {
        this.accessToken = accessToken;
        this.username = username;
        this.email = email;
        this.role = role;
        this.userId = userId;

    }
//    public JWTAuthResponse(String accessToken, String username, String email,String  role) {
//        this.accessToken = accessToken;
//        this.role = role;
//
//    }
//    public void setAccessToken(String accessToken) {
//        this.accessToken = accessToken;
//    }
//
//    public void setTokenType(String tokenType) {
//        this.tokenType = tokenType;
//    }
//
//    public String getAccessToken() {
//        return accessToken;
//    }
//
//    public String getTokenType() {
//        return tokenType;
//    }
//
//    public String getRole() {
//        return role;
//    }
//    public void setRole(String role) {
//        this.role = role;
//    }
}
