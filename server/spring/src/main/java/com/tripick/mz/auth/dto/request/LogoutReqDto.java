package com.tripick.mz.auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LogoutReqDto {

    private int memberId;
    private String accessToken;

}
