package com.springboot.rekruteIT.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class RessourceNotFoundException extends RuntimeException{
    private String Resourcename;
    private String fieldName;
    private String fieldValue;


    public RessourceNotFoundException(String Resourcename, String fieldName, String fieldValue) {
        super(String.format("%s not found with %s : '%s'", Resourcename,fieldName,fieldValue));
        this.Resourcename = Resourcename;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourcename() {
        return Resourcename;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getFieldValue() {
        return fieldValue;
    }
}
