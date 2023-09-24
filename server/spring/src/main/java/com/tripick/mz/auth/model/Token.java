package com.tripick.mz.auth.model;

import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
public class Token {
    private String token;
    private String refreshToken;
}
