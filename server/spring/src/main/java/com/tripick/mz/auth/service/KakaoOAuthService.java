package com.tripick.mz.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tripick.mz.auth.dto.kakao.KakaoAccountDto;
import com.tripick.mz.auth.dto.kakao.KakaoTokenDto;
import com.tripick.mz.auth.dto.TokenDto;
import com.tripick.mz.auth.util.JwtProvider;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.Role;
import com.tripick.mz.member.repository.CredentialRepository;
import com.tripick.mz.member.repository.MemberRepository;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoOAuthService {

  @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
  private String KAKAO_CLIENT_ID;
  @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
  private String KAKAO_CLIENT_SECRET;
  @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
  private String KAKAO_REDIRECT_URI;
  @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
  private String KAKAO_TOKEN_URI;
  @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
  private String KAKAO_USER_INFO_URI;

  private final JwtProvider jwtProvider;
  private final CredentialRepository credentialRepository;
  private final MemberRepository memberRepository;

  @Transactional
  public KakaoTokenDto getKakaoAccessToken(String code) {

    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("client_id", KAKAO_CLIENT_ID);
    params.add("redirect_uri", KAKAO_REDIRECT_URI);
    params.add("code", code);
    params.add("client_secret", KAKAO_CLIENT_SECRET);

    HttpEntity<MultiValueMap<String,String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

    RestTemplate rt = new RestTemplate();
    log.info("token-uri = {}", KAKAO_TOKEN_URI);
    ResponseEntity<String> accessTokenResponse = rt.exchange(
        KAKAO_TOKEN_URI,
        HttpMethod.POST,
        kakaoTokenRequest,
        String.class
    );

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    KakaoTokenDto kakaoTokenDto = null;

    try {
      kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
    } catch (JsonProcessingException e) {
      log.error(e.toString());
    }

    return kakaoTokenDto;
  }

  @Transactional
  public Member getKakaoInfo(KakaoTokenDto kakaoTokenDto) {
    RestTemplate rt = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", "Bearer " + kakaoTokenDto.getAccess_token());

    HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

    ResponseEntity<String> accountInfoResponse = rt.exchange(
        KAKAO_USER_INFO_URI,
        HttpMethod.POST,
        accountInfoRequest,
        String.class
    );

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    KakaoAccountDto kakaoAccountDto = null;

    try {
      kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoAccountDto.class);
    } catch (JsonProcessingException e) {
      log.error(e.toString());
    }

    Map<String, Object> kakaoAccount = kakaoAccountDto.getKakao_account();
    Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

    String email = (String) kakaoAccount.get("email");
    String nickname = (String) kakaoProfile.get("nickname");

    Credential credential = credentialRepository.findByEmail(email).orElse(null);
    String refreshToken = jwtProvider.generateTokenDto(email).getRefreshToken();

    if(credential != null) {
      credential.updateRefreshToken(refreshToken);
      log.info("이미 존재하는 email입니다. 바로 유저 정보를 반환합니다.");
      return memberRepository.findByCredential(credential).orElse(null);
    }

    credential = Credential.builder()
        .email(email)
        .refreshToken(refreshToken)
        .credentialId(UUID.randomUUID().toString())
        .role(Role.USER)
        .providerType("kakao")
        .build();

    credentialRepository.save(credential);

    return Member.builder()
        .credential(credential)
        .nickname(nickname)
        .profileImage("")
        .build();
  }

  @Transactional
  public TokenDto kakaoLogin(KakaoTokenDto kakaoTokenDto) {
    Member member = getKakaoInfo(kakaoTokenDto);
    Credential credential = member.getCredential();

    Member existMember = memberRepository.findById(member.getMemberId()).orElse(null);

    if(existMember == null) {
      log.info("존재하지 않는 회원정보입니다. 새로 저장합니다.");
      memberRepository.save(member);
    }

    log.info("[login] 계정 확인 완료" + member);

    TokenDto tokenDto = jwtProvider.generateTokenDto(credential.getEmail());

    credential.updateRefreshToken(tokenDto.getRefreshToken());

    return tokenDto;
  }

  public HttpHeaders setTokenHeaders(TokenDto tokenDto) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", tokenDto.getAccessToken());

    return headers;
  }
}
