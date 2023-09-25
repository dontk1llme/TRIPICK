package com.tripick.mz.common.error;

public class NotExistContentException extends RuntimeException{
    public NotExistContentException() {
        super(ExceptionCode.NOT_EXIST_TRIP_CONTENT.getErrorMessage());
    }
    public NotExistContentException(String message) {
        super(message);
    }
}
