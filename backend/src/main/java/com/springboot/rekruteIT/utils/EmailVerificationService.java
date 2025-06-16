package com.springboot.rekruteIT.utils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;
@AllArgsConstructor
@Service
public class EmailVerificationService {
    private EmailService emailService;

    public String generateVerificationCode() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    public String sendVerificationCode(String email) {
        String code = generateVerificationCode();
        emailService.sendEmail(email, "Verification Code", "Please use the following code to complete your login: " + code);
        return code;
    }

    public boolean verifyCode(String userEmail, String userEnteredCode, String sentCode) {
        return sentCode.equals(userEnteredCode);
    }
    public static void main(String[] args) {
        EmailService emailService = new EmailService();
        EmailVerificationService service = new EmailVerificationService(emailService);
        service.sendVerificationCode("abdelilahhalim05@gmail.com");
    }
}