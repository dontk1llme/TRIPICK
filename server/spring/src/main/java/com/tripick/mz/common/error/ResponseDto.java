package com.tripick.mz.common.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class ResponseDto {
    private final Integer statusCode; // 상태 코드
    private final String messages; // 성공 or 오류
    private final String developerMessage; // 무슨 오류인지
}
