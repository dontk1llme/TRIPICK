package com.tripick.mz.auth.service;

import com.tripick.mz.auth.dto.request.AuthRequest;
import com.tripick.mz.auth.dto.response.AuthResponse;
import com.tripick.mz.auth.token.AuthTokenProvider;
import com.tripick.mz.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

  private final ClientKakao clientKakao;
  private final MemberQuerydslRepository memberQuerydslRepository;
  private final AuthTokenProvider authTokenProvider;
  private final MemberRepository memberRepository;

  @Transactional
  public AuthResponse login(AuthRequest authRequest){
    Members
  }

}
