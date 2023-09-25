package com.tripick.mz.auth.controller;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.tripick.mz.auth.dto.response.AuthResDto;
import com.tripick.mz.auth.service.AuthService;
import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.common.response.SingleResponseResult;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login/oauth2")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/code/{registrationId}")
    public ResponseResult callback(
            @PathVariable(name="registrationId")String registrationId,
            @RequestParam(name="code") String code) throws IOException {
        System.out.println("code = " + code);
        AuthResDto authResDto = authService.login(registrationId, code);
        return new SingleResponseResult<>(authResDto);
    }

}