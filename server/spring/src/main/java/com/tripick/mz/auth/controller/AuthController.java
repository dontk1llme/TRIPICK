package com.tripick.mz.auth.controller;

import com.tripick.mz.auth.service.AuthService;
import com.tripick.mz.auth.service.GoogleAuthService;
import com.tripick.mz.auth.service.KakaoAuthService;
import com.tripick.mz.auth.util.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final KakaoAuthService kakaoAuthService;
  private final GoogleAuthService googleAuthService;
  private final AuthTokenProvider authTokenProvider;
  private final AuthService authService;

  /**
   * KAKAO 소셜 로그인 기능
   */


}
