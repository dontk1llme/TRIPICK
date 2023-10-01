package com.tripick.mz.auth.controller;

import com.tripick.mz.auth.dto.request.LogoutReqDto;
import com.tripick.mz.auth.dto.request.MemberDeleteReqDto;
import com.tripick.mz.auth.dto.response.LoginResponseDto;
import com.tripick.mz.auth.service.AuthService;
import com.tripick.mz.auth.service.GoogleAuthService;
import com.tripick.mz.auth.service.KakaoAuthService;
import com.tripick.mz.auth.util.HeaderUtil;
import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.common.response.SingleResponseResult;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final KakaoAuthService kakaoAuthService;
    private final GoogleAuthService googleAuthService;
    private final AuthService authService;
    private final HeaderUtil headerUtil;

    @GetMapping("/login/kakao")
    public ResponseEntity kakaoLogin(HttpServletRequest request) {
        String code = request.getParameter("code");
        LoginResponseDto loginResponseDto = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok().headers(headerUtil.setTokenHeaders(loginResponseDto.getTokenDto()))
                .body(new SingleResponseResult<>(loginResponseDto.getMemberResDto()));
    }

    @GetMapping("/login/google")
    public ResponseEntity googleLogin(HttpServletRequest request) {
        String code = request.getParameter("code");
        LoginResponseDto loginResponseDto = googleAuthService.googleLogin(code);
        return ResponseEntity.ok().headers(headerUtil.setTokenHeaders(loginResponseDto.getTokenDto()))
                .body(new SingleResponseResult<>(loginResponseDto.getMemberResDto()));
    }

    @PatchMapping("/logout")
    public ResponseResult logout(@RequestBody LogoutReqDto logoutReqDto){
        authService.logout(logoutReqDto);
        return ResponseResult.successResponse;
    }

    @DeleteMapping("/delete")
    public ResponseResult deleteMember(@RequestBody MemberDeleteReqDto memberDeleteReqDto){
        authService.deleteMember(memberDeleteReqDto);
        return ResponseResult.successResponse;
    }

}