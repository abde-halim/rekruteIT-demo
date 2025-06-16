package com.springboot.rekruteIT.utils;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class SmsService {
    private static final String ACCOUNT_SID = "AC9612706c94afb4c6312c6dfd099bc6bb";
    private static final String AUTH_TOKEN = "0e66833ba0eba3b1161aa6a87defd0fc";
    private static final String FROM_NUMBER = "+18316105783";

    @PostConstruct
    public void init() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendSms(String to, String body) {
        Message.creator(new PhoneNumber(to), new PhoneNumber(FROM_NUMBER), body).create();
    }
}