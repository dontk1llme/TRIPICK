package com.tripick.mz.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripick.mz.auth.dto.UserDto;
import com.tripick.mz.auth.model.Token;
import com.tripick.mz.auth.service.TokenService;
import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.common.response.SingleResponseResult;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.repository.CredentialRepository;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final TokenService tokenService;
    private final ObjectMapper objectMapper;
    private final CredentialRepository credentialRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");

        String accessToken = tokenService.createAccessToken(
            UserDto.builder()
                .email(email)
                .authorities(oAuth2User.getAuthorities())
                .build());

        String refreshToken = tokenService.createRefreshToken();

        log.info("email = {}", email);

        Credential credential = credentialRepository.findByEmail(email).orElseThrow();

        credential.updateRefreshToken(refreshToken);

        makeResponse(response, accessToken, refreshToken);
    }

    private void makeResponse(HttpServletResponse response, String accessToken, String refreshToken) throws IOException{
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpServletResponse.SC_OK);

//        response.getWriter().write(objectMapper.writeValueAsString(
//            ResponseResult.builder().
//        ));

    }
}
