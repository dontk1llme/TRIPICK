package com.tripick.mz.member.exception;

public class BadgeNotFoundException extends RuntimeException{

    public BadgeNotFoundException() {}

    public BadgeNotFoundException(String message) {
        super(message);
    }
}