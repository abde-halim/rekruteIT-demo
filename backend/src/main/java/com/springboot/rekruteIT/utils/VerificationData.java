// VerificationData.java
package com.springboot.rekruteIT.utils;

public class VerificationData {
    private String password;
    private String code;

    public VerificationData(String password, String code) {
        this.password = password;
        this.code = code;
    }

    public String getPassword() {
        return password;
    }

    public String getCode() {
        return code;
    }
}
