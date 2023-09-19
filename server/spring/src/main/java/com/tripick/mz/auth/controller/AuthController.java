package com.tripick.mz.auth.controller;

import com.tripick.mz.auth.common.ApiResponse;
import com.tripick.mz.auth.dto.request.AuthRequest;
import com.tripick.mz.auth.dto.request.AuthRequestDto;
import com.tripick.mz.auth.dto.response.AuthResponse;
import com.tripick.mz.auth.service.AuthService;
import com.tripick.mz.auth.service.GoogleAuthService;
import com.tripick.mz.auth.service.implement.AuthServiceImple;
import com.tripick.mz.auth.token.JwtToken;
import com.tripick.mz.auth.util.JwtHeaderUtil;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
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

  private final AuthServiceImple authServiceImple;

  @PostMapping("/login")
  public ResponseEntity<JwtToken> loginSuccess(AuthRequestDto authRequestDto) {
    JwtToken token = authServiceImple.login(authRequestDto.getEmail(), authRequestDto.getPassword());
    return ResponseEntity.ok(token);
  }
}
