package com.tripick.mz.auth.service;


import com.tripick.mz.auth.dto.TokenDto;
import com.tripick.mz.auth.dto.google.GoogleInfoResDto;
import com.tripick.mz.auth.dto.google.GoogleReqDto;
import com.tripick.mz.auth.dto.google.GoogleResDto;

import java.util.*;

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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleAuthService {

  @Value("${spring.security.oauth2.client.registration.google.client-id}")
  private String CLIENT_ID;
  @Value("${spring.security.oauth2.client.registration.google.client-secret}")
  private String CLIENT_SECRET;
  @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
  private String GOOGLE_REDIRECT_URI;
  @Value("${spring.security.oauth2.client.provider.google.token-uri}")
  private String GOOGLE_TOKEN_URI;
  @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
  private String GOOGLE_USER_INFO_URI;

  private final JwtProvider jwtProvider;
  private final CredentialRepository credentialRepository;
  private final MemberRepository memberRepository;
  private final MemberBadgeRepository memberBadgeRepository;
  private final BadgeRepository badgeRepository;

  private TokenDto tokenDto;

  @Transactional
  public LoginResponseDto googleLogin(String code) {
    GoogleResDto googleResponse = getGoogleIdToken(code);
    Member member = getGoogleUserInfo(googleResponse);
    Member existMember = memberRepository.findByMemberId(member.getMemberId()).orElse(null);

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
  public GoogleResDto getGoogleIdToken(String code) {

    RestTemplate restTemplate = new RestTemplate();

    GoogleReqDto googleOAuthRequestParam = GoogleReqDto.builder()
            .clientId(CLIENT_ID)
            .clientSecret(CLIENT_SECRET)
            .code(code)
            .redirectUri(GOOGLE_REDIRECT_URI)
            .grantType("authorization_code").build();

    ResponseEntity<GoogleResDto> response = restTemplate.postForEntity(GOOGLE_TOKEN_URI,
            googleOAuthRequestParam, GoogleResDto.class);

    return response.getBody();
  }

  @Transactional
  public Member getGoogleUserInfo(GoogleResDto googleResponse){
    RestTemplate restTemplate = new RestTemplate();

    String jwtToken = googleResponse.getId_token();

    Map<String, String> map = new HashMap<>();
    map.put("id_token", jwtToken);

    ResponseEntity<GoogleInfoResDto> infoResponse = restTemplate.postForEntity(GOOGLE_USER_INFO_URI,
            map, GoogleInfoResDto.class);

    log.info("유저 정보 = {}", infoResponse);

    String email = infoResponse.getBody().getEmail();
    String nickname = infoResponse.getBody().getName();
    String profileImage = infoResponse.getBody().getPicture();

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
            .providerType("google")
            .build();

    credentialRepository.save(credential);

    return Member.builder()
            .credential(credential)
            .nickname(nickname)
            .profileImage(profileImage)
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
