package com.tripick.mz.auth.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class UserFindRequest {
    private final String email;

    public UserFindRequest(String email) {
        this.email = email;
    }
}
