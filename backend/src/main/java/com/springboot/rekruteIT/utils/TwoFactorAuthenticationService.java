package com.springboot.rekruteIT.utils;

import java.util.Random;

import com.springboot.rekruteIT.utils.SmsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TwoFactorAuthenticationService {
    @Autowired
    private SmsService smsService;

    public String generateVerificationCode() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    public void sendVerificationCode(String phoneNumber) {
        String code = generateVerificationCode();
        smsService.sendSms(phoneNumber, "Your verification code is: " + code);
    }

    public boolean verifyCode(String phoneNumber, String inputCode, String actualCode) {
        return actualCode.equals(inputCode);
    }
    public static void main(String[] args) {
        SmsService smsService = new SmsService();
        TwoFactorAuthenticationService service = new TwoFactorAuthenticationService(smsService);
        service.sendVerificationCode("+212663586494");
    }
}