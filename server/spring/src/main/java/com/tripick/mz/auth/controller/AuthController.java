package com.tripick.mz.auth.controller;

import com.tripick.mz.auth.dto.kakao.KakaoTokenDto;
import com.tripick.mz.auth.dto.TokenDto;
import com.tripick.mz.auth.service.KakaoOAuthService;
import com.tripick.mz.common.response.SingleResponseResult;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final KakaoOAuthService kakaoOAuthService;

    @GetMapping("/login/oauth2/callback/kakao")
    public ResponseEntity kakaoLogin(HttpServletRequest request) {
        String code = request.getParameter("code");
        KakaoTokenDto kakaoTokenDto = kakaoOAuthService.getKakaoAccessToken(code);
        TokenDto tokenDto = kakaoOAuthService.kakaoLogin(kakaoTokenDto);

        return ResponseEntity.ok().headers(kakaoOAuthService.setTokenHeaders(tokenDto)).body(
            new SingleResponseResult<>(tokenDto));
    }
//
//    @GetMapping("/login/oauth2/callback/google")
//    public ResponseEntity googleLogin(@RequestParam String code) {
//
//        return ResponseEntity.ok().headers(headers).body(tokenDto);
//    }

}