package com.tripick.mz.auth.controller;

import com.tripick.mz.auth.common.ApiResponse;
import com.tripick.mz.auth.dto.request.AuthRequest;
import com.tripick.mz.auth.dto.response.AuthResponse;
import com.tripick.mz.auth.service.AuthService;
import com.tripick.mz.auth.service.GoogleAuthService;
import com.tripick.mz.auth.service.KakaoAuthService;
import com.tripick.mz.auth.util.AuthTokenProvider;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
  @PostMapping(value="/kakao")
  public ResponseEntity<AuthResponse> kakaoAuthRequest(@RequestBody AuthRequest authRequest){
    return ApiResponse.success(kakaoAuthService.login(authRequest));
  }

  /**
   * GOOGLE 소셜 로그인 기능
   */
  @PostMapping(value="/google")
  public ResponseEntity<AuthResponse> googleAuthRequest(@RequestBody AuthRequest authRequest){
    return ApiResponse.success(googleAuthService.login(authRequest));
  }

  @GetMapping("/refresh")
  public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest request){
    String appToken = JwtH.getAccessToken(request);
  }
}
