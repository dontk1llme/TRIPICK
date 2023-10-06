package com.tripick.mz.common.error;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    NOT_EXIST_MEMBER_EXCEPTION(450, "사용자 계정이 존재하지 않습니다."),
    NOT_EXIST_RECORD_EXCEPTION(451, "여행 기록이 존재하지 않습니다."),
    NOT_EXIST_BADGE_EXCEPTION(452, "뱃지가 존재하지 않습니다."),
    NOT_EXIST_RECORD_IMAGE_EXCEPTION(453, "여행 기록 사진이 존재하지 않습니다."),
    NOT_EXIST_PICKED_TRIP_EXCEPTION(454, "존재하지 않는 일정입니다."),
    NOT_EXIST_TRIP_CONTENT(455,"내용이 존재하지 않습니다.");

    private final int errorCode;
    private final String errorMessage;

    ExceptionCode(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
