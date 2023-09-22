package com.tripick.mz.common.error;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@Builder
public class ErrorResponseEntity {
    private int status;
    private String code;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ExceptionCode e){
        return ResponseEntity
                .status(e.getErrorCode())
                .body(ErrorResponseEntity.builder()
                        .status(e.getErrorCode())
                        .code(e.name())
                        .message(e.getErrorMessage())
                        .build()
                );
    }
}