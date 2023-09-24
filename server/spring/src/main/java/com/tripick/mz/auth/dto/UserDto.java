package com.tripick.mz.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@NoArgsConstructor
@Getter
public class UserDto {
    private String email;
    private Collection<? extends GrantedAuthority> authorities;

    @Builder
    public UserDto(String email, Collection<? extends GrantedAuthority> authorities) {
        this.email = email;
        this.authorities = authorities;
    }
}
