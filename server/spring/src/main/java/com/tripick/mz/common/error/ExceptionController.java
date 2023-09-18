package com.tripick.mz.common.error;

import com.tripick.mz.common.response.ResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.tripick.mz")
public class ExceptionController {

    @ExceptionHandler(NotExistMemberException.class)
    public ResponseResult NotExistAccountException(NotExistMemberException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_MEMBER_EXCEPTION);
    }

    @ExceptionHandler(NotExistRecordException.class)
    public ResponseResult NotExistRecordException(NotExistRecordException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_RECORD_EXCEPTION);
    }

    @ExceptionHandler(NotExistRecordImageException.class)
    public ResponseResult NotExistRecordImageException(NotExistRecordImageException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_RECORD_IMAGE_EXCEPTION);
    }

    @ExceptionHandler(NotExistBadgeException.class)
    public ResponseResult NotExistBadgeException(NotExistBadgeException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_BADGE_EXCEPTION);
    }

}