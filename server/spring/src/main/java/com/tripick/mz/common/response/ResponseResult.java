package com.tripick.mz.common.response;

import com.tripick.mz.common.error.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseResult {
    int statusCode; // 요청 성공 or 예외 코드
    String messages; // 프론트에 보여주는 메세지
    String developerMessage; // 개발자 메세지
    LocalDateTime timestamp; // 응답 시간

    public static final ResponseResult successResponse =
            ResponseResult.builder()
                    .statusCode(HttpStatus.OK.value())
                    .messages("성공 :)")
                    .developerMessage("성공하였습니다.")
                    .timestamp(LocalDateTime.now()).build();

    public static final ResponseResult failResponse =
            ResponseResult.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .messages("실패 :(")
                    .developerMessage("실패하였습니다.")
                    .timestamp(LocalDateTime.now()).build();

    public static final ResponseResult exceptionResponse(ExceptionCode exceptionCode) {
        return ResponseResult.builder()
                .statusCode(exceptionCode.getErrorCode())
                .messages("에러발생 :(")
                .developerMessage(exceptionCode.getErrorMessage())
                .timestamp(LocalDateTime.now()).build();
    }
}