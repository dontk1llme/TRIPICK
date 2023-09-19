package com.tripick.mz.auth.service.implement;

import com.tripick.mz.auth.service.AuthService;
import com.tripick.mz.auth.token.JwtToken;
import com.tripick.mz.auth.token.JwtTokenProvider;
import com.tripick.mz.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class AuthServiceImple implements AuthService {

  private final BCryptPasswordEncoder encoder;
  private final MemberRepository memberRepository;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;
  private final JwtTokenProvider jwtTokenProvider;

  public JwtToken login(String email, String password){

    UsernamePasswordAuthenticationToken authenticationtoken = new UsernamePasswordAuthenticationToken(email, password);
    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationtoken);

    JwtToken token = jwtTokenProvider.generateToken(authentication);

    return token;
  }

}
