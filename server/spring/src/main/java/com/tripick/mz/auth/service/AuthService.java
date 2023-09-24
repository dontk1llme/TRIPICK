package com.tripick.mz.auth.service;

import com.tripick.mz.auth.dto.UserDto;
import com.tripick.mz.auth.model.Token;
import com.tripick.mz.member.repository.CredentialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenService tokenService;
    private final CredentialRepository credentialRepository;

    public Token refreshAccessToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto principal = (UserDto) authentication.getPrincipal();

        String savedRefreshToken = credentialRepository.findByEmail(principal.getEmail()).orElseThrow(RuntimeException::new).getRefreshToken();
        String refreshedAccessToken = tokenService.refreshAccessToken(savedRefreshToken, principal);

        return new Token(refreshedAccessToken);
    }

    public void signOut() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto principal = (UserDto) authentication.getPrincipal();
        String accessToken = (String) authentication.getCredentials();

        Long expirationInMs = tokenService.getExpirationInMs(accessToken);

        tokenService.deleteRefreshToken(principal.getEmail());
    }
}
