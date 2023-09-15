package com.tripick.mz.auth.token;

import com.tripick.mz.member.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import java.security.Key;
import java.util.Date;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AuthToken {

  @Getter
  private final String token;
  private Key key;

  private static final String AUTHORITIES_KEY = "role";

  AuthToken(String socialId, Role roleType, Date expiry, Key key){
    String role = roleType.toString();
    this.key = key;
    this.token = createAuthToken(socialId, role, expiry);
  }

  private String createAuthToken(String socialId, String role, Date expiry){
    return Jwts.builder()
        .setSubject(socialId)
        .claim(AUTHORITIES_KEY, role)
        .signWith(key, SignatureAlgorithm.HS256)
        .setExpiration(expiry)
        .compact();
  }

  public boolean validate() {
    return this.getTokenClaims() != null;
  }

  public Claims getTokenClaims() {
    try{
      return Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token)
          .getBody();
    } catch (SecurityException e) {
      log.info("Invalid JWT signature.");
    } catch (MalformedJwtException e) {
      log.info("Invalid JWT token.");
    } catch (ExpiredJwtException e) {
      log.info("Expired JWT token.");
    } catch (UnsupportedJwtException e) {
      log.info("Unssupported JWT token.");
    } catch (IllegalArgumentException e) {
      log.info("JWT token compact of handler are invalid.");
    }
    return null;
  }
}
