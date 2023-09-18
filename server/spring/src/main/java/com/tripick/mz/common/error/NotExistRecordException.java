package com.tripick.mz.common.error;

public class NotExistRecordException extends RuntimeException{
    public NotExistRecordException() {
        super(ExceptionCode.NOT_EXIST_RECORD_EXCEPTION.getErrorMessage());
    }
    public NotExistRecordException(String message) {
        super(message);
    }
}
