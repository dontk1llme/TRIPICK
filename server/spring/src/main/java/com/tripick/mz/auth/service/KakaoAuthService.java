package com.tripick.mz.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tripick.mz.auth.dto.kakao.KakaoAccountDto;
import com.tripick.mz.auth.dto.kakao.KakaoTokenDto;
import com.tripick.mz.auth.dto.TokenDto;
import com.tripick.mz.auth.dto.response.LoginResponseDto;
import com.tripick.mz.auth.dto.response.MemberResDto;
import com.tripick.mz.auth.util.JwtProvider;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.MemberBadge;
import com.tripick.mz.member.entity.Role;
import com.tripick.mz.member.exception.BadgeNotFoundException;
import com.tripick.mz.member.exception.MemberNotFoundException;
import com.tripick.mz.member.repository.BadgeRepository;
import com.tripick.mz.member.repository.CredentialRepository;
import com.tripick.mz.member.repository.MemberBadgeRepository;
import com.tripick.mz.member.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoAuthService {

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
  @Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
  private String KAKAO_GRANT_TYPE;
  @Value("${spring.security.oauth2.client.registration.kakao.default-image-url}")
  private String KAKAO_DEFAULT_IMAGE;

  private final JwtProvider jwtProvider;
  private final CredentialRepository credentialRepository;
  private final MemberRepository memberRepository;
  private final BadgeRepository badgeRepository;
  private final MemberBadgeRepository memberBadgeRepository;

  private TokenDto tokenDto;

  @Transactional
  public LoginResponseDto kakaoLogin(String code) {
    KakaoTokenDto kakaoTokenDto = getKakaoAccessToken(code);
    Member member = getKakaoUserInfo(kakaoTokenDto);
    Member existMember = memberRepository.findById(member.getMemberId()).orElse(null);

    if(existMember == null) {
      log.info("존재하지 않는 회원정보입니다. 새로 저장합니다.");
      memberRepository.save(member);
      log.info("member_id = {}", member.getMemberId());
      setDefaultBadges(member);
    }

    int memberId = member.getMemberId();
    member = memberRepository.findByMemberId(memberId).orElseThrow(MemberNotFoundException::new);



    log.info("[login] 계정 확인 완료" + member.getNickname() + "로그인 성공!");
    log.info("grantType = {}", tokenDto.getGrantType());
    log.info("accessToken = {}", tokenDto.getAccessToken());
    log.info("refreshToken = {}", tokenDto.getRefreshToken());

    return LoginResponseDto.builder()
            .tokenDto(tokenDto)
            .memberResDto(MemberResDto.builder()
                    .memberId(member.getMemberId())
                    .email(member.getCredential().getEmail())
                    .profileImage(member.getProfileImage())
                    .nickname(member.getNickname())
                    .role(member.getCredential().getRole())
                    .memberBadgeList(memberBadgeRepository.findByMemberWithoutMemberInfo(member))
                    .mainBadge(member.getMainBadge())
                    .createdAt(member.getCreatedAt())
                    .updatedAt(member.getUpdatedAt())
                    .build())
            .build();
  }

  @Transactional
  public KakaoTokenDto getKakaoAccessToken(String code) {

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    headers.add("Accept", "application/json");
//    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", KAKAO_GRANT_TYPE);
    params.add("client_id", KAKAO_CLIENT_ID);
    params.add("redirect_uri", KAKAO_REDIRECT_URI);
    params.add("code", code);
    params.add("client_secret", KAKAO_CLIENT_SECRET);

    HttpEntity<MultiValueMap<String,String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

    RestTemplate restTemplate = new RestTemplate();
    restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
    log.info("token-uri = {}", KAKAO_TOKEN_URI);

    ResponseEntity<String> accessTokenResponse =
            restTemplate.postForEntity(KAKAO_TOKEN_URI, kakaoTokenRequest, String.class);

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
  public Member getKakaoUserInfo(KakaoTokenDto kakaoTokenDto) {
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", "Bearer " + kakaoTokenDto.getAccess_token());

    HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

    ResponseEntity<String> accountInfoResponse = restTemplate.exchange(
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
    String picture = (String) kakaoProfile.get("profile_image_url");

    if(picture == null){
      picture = KAKAO_DEFAULT_IMAGE;
    }

    tokenDto = jwtProvider.generateTokenDto(email);
    Credential credential = credentialRepository.findByEmail(email).orElse(null);

    if(credential != null) {
      log.info("이미 존재하는 email입니다. 바로 유저 정보를 반환합니다.");
      credential.updateRefreshToken(tokenDto.getRefreshToken());
      return memberRepository.findByCredential(credential).orElse(null);
    }

    credential = Credential.builder()
        .email(email)
        .refreshToken(tokenDto.getRefreshToken())
        .credentialId(UUID.randomUUID().toString())
        .role(Role.USER)
        .providerType("kakao")
        .build();

    credentialRepository.save(credential);

    return Member.builder()
        .credential(credential)
        .nickname(nickname)
        .profileImage(picture)
        .mainBadge(1)
        .build();
  }

  @Transactional
  public void setDefaultBadges(Member member){
    List<MemberBadge> memberBadges = new ArrayList<>();

    for(int i=1; i<=5; i++){
      MemberBadge memberBadge = MemberBadge.builder()
              .badge(badgeRepository.findById(i).orElseThrow(BadgeNotFoundException::new))
              .member(member)
              .achieved(i>1? false:true)
              .achievedDate(member.getCreatedAt())
              .build();
      memberBadges.add(memberBadge);
    }

    memberBadgeRepository.saveAll(memberBadges);
  }
}
