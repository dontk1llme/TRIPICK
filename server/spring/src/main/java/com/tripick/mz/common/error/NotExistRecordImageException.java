package com.tripick.mz.common.error;

public class NotExistRecordImageException extends RuntimeException{
    public NotExistRecordImageException() {
        super(ExceptionCode.NOT_EXIST_RECORD_IMAGE_EXCEPTION.getErrorMessage());
    }
    public NotExistRecordImageException(String message) {
        super(message);
    }
}
