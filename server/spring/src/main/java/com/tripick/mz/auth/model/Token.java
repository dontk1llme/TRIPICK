package com.tripick.mz.auth.model;

import lombok.*;

@ToString
@NoArgsConstructor
@Getter
public class Token {
    private String token;

    public Token(String token){
        this.token = token;
    }
}
