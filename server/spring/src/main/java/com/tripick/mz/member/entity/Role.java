package com.tripick.mz.member.entity;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER("ROLE_USER", "사용자"),
    ADMIN("ROLE_ADMIN", "관리자"),
    GUEST("GUEST", "게스트");

    private final String code;
    private final String displayName;

    public static Role of(String code){
        return Arrays.stream(Role.values())
            .filter(r-> r.getCode().equals(code))
            .findAny()
            .orElse(GUEST);
    }
}
