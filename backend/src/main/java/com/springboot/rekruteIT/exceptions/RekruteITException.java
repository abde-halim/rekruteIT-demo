package com.springboot.rekruteIT.exceptions;

import org.springframework.http.HttpStatus;

public class RekruteITException extends RuntimeException {
  private HttpStatus status;
  private String message;

  public RekruteITException(HttpStatus status, String message) {
    this.status = status;
    this.message = message;
  }

  public HttpStatus getStatus() {
    return status;
  }

  @Override
  public String getMessage() {
    return message;
  }

  public RekruteITException(String message, HttpStatus status, String message1) {
    super(message);
    this.status = status;
    this.message = message1;
  }
}
