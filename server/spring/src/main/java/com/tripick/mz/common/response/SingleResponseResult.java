package com.tripick.mz.common.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SingleResponseResult<T> extends ResponseResult {

    private T data;

    public SingleResponseResult(T data) {
        super(successResponse.statusCode, successResponse.messages, successResponse.developerMessage,
                successResponse.timestamp);
        this.data = data;
    }
}