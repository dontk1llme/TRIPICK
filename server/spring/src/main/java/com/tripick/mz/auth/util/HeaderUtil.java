package com.tripick.mz.auth.util;

import com.tripick.mz.auth.dto.TokenDto;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class HeaderUtil {
    public HttpHeaders setTokenHeaders(TokenDto tokenDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("access-token", tokenDto.getAccessToken());
        headers.add("refresh-token", tokenDto.getRefreshToken());
        return headers;
    }
}
