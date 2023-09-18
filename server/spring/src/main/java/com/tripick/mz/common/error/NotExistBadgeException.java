package com.tripick.mz.common.error;

public class NotExistBadgeException extends RuntimeException{
    public NotExistBadgeException() {
        super(ExceptionCode.NOT_EXIST_BADGE_EXCEPTION.getErrorMessage());
    }
    public NotExistBadgeException(String message) {
        super(message);
    }
}
