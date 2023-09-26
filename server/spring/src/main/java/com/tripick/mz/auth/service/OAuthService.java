package com.tripick.mz.auth.service;


import com.tripick.mz.auth.dto.google.GoogleInfoResponse;
import com.tripick.mz.auth.dto.google.GoogleRequest;
import com.tripick.mz.auth.dto.google.GoogleResponse;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {

  @Value("${spring.security.oauth2.client.registration.google.client-id}")
  private String CLIENT_ID;
  @Value("${spring.security.oauth2.client.registration.google.client-secret}")
  private String CLIENT_SECRET;

  @Transactional
  @RequestMapping(value="/api/v1/oauth2/google", method = RequestMethod.GET)
  public String getGoogleInfo(@RequestParam(value = "code") String authCode) {

    RestTemplate restTemplate = new RestTemplate();

    GoogleRequest googleOAuthRequestParam = GoogleRequest.builder()
        .clientId(CLIENT_ID)
        .clientSecret(CLIENT_SECRET)
        .code(authCode)
        .redirectUri("http://localhost:8080/login/oauth/code/googel")
        .grantType("authorization_code").build();

    ResponseEntity<GoogleResponse> response = restTemplate.postForEntity("https://oauth2.googleapis.com/token",
         googleOAuthRequestParam, GoogleResponse.class);

    String jwtToken = response.getBody().getId_token();

    Map<String, String> map = new HashMap<>();

    map.put("id_token", jwtToken);

    ResponseEntity<GoogleInfoResponse> infoResponse = restTemplate.postForEntity("https://oauth2.googleapis.com/tokeninfo",
        map, GoogleInfoResponse.class);

    String email = infoResponse.getBody().getEmail();
    log.info("이메일 {}", email);

    return email;
  }
}
