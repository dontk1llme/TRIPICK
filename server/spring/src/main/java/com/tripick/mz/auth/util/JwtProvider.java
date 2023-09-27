package com.tripick.mz.auth.util;

import com.tripick.mz.auth.dto.TokenDto;
import com.tripick.mz.auth.dto.UserDto;
import com.tripick.mz.auth.exception.ExpiredTokenException;
import com.tripick.mz.auth.exception.UnAuthorizedAccessException;
import com.tripick.mz.auth.exception.WrongTokenException;
import com.tripick.mz.member.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtProvider {

  private final Key key;
  private final String AUTHORITIES_KEY = "auth";
  @Value("${jwt.bearer.type}")
  private String BEARER_TYPE;
  @Value("${jwt.bearer.prefix}")
  private String BEARER_PREFIX;
  private long ACCESS_TOKEN_EXPIRE_TIME = 1000L * 60L * 30L;
  private long REFRESH_TOKEN_EXPIRE_TIME = 1000L * 60L * 60L * 24L * 7L;

  public JwtProvider(@Value("${jwt.secret}") String secretKey) {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    this.key = Keys.hmacShaKeyFor(keyBytes);
  }

  public TokenDto generateTokenDto(String email){
    long now = (new Date()).getTime();

    Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
    String accessToken = Jwts.builder()
        .setSubject(email)
        .claim(AUTHORITIES_KEY, Role.USER)
        .setExpiration(accessTokenExpiresIn)
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();

    String refreshToken = Jwts.builder()
        .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();

    return TokenDto.builder()
        .grantType(BEARER_TYPE)
        .accessToken(BEARER_PREFIX + accessToken)
        .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
        .refreshToken(refreshToken)
        .build();
  }

  public Authentication getAuthentication(String accessToken) {

    Claims claims = parseClaims(accessToken);

    String email = claims.getSubject();

    if(claims.get(AUTHORITIES_KEY) == null) {
      throw new RuntimeException("권한 정보가 없는 토큰입니다.");
    }

    Collection<? extends GrantedAuthority> authorities =
        Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());

    UserDto userDto = UserDto.builder()
        .email(email)
        .authorities(authorities)
        .build();

    return new UsernamePasswordAuthenticationToken(userDto, accessToken, authorities);
  }

  public boolean validateToken(String token) {

    try {
      Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token);

      return true;
    } catch (SecurityException | MalformedJwtException e) {
      throw new WrongTokenException("잘못된 토큰입니다.");
    } catch (ExpiredJwtException e) {
      throw new ExpiredTokenException("만료된 토큰입니다.");
    } catch (UnsupportedJwtException e) {
      throw new WrongTokenException("잘못된 토큰입니다.");
    } catch (IllegalArgumentException e) {
      log.error("잘못된 Argument를 입력했습니다.");
    }
    return false;
  }

  private Claims parseClaims(String accessToken) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(accessToken)
          .getBody();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }

}
