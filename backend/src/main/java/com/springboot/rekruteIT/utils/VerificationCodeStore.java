// VerificationCodeStore.java
package com.springboot.rekruteIT.utils;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class VerificationCodeStore {
    private final Map<String, VerificationData> codeMap = new ConcurrentHashMap<>();

    public void storeCode(String email, String password, String code) {
        codeMap.put(email, new VerificationData(password, code));
    }

    public VerificationData getData(String email) {
        return codeMap.get(email);
    }

    public void removeCode(String email) {
        codeMap.remove(email);
    }
}
