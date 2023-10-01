package com.tripick.mz.member.exception;

public class CredentialNotFoundException extends RuntimeException{
    public CredentialNotFoundException() {}

    public CredentialNotFoundException(String message) {
        super(message);
    }
}