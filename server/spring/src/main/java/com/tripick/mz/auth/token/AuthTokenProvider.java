package com.tripick.mz.auth.token;

import com.tripick.mz.auth.exception.TokenValidFailedException;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
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
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthTokenProvider {

  @Value("${app.auth.tokenExpiry}")
  private String expiry;

  private final Key key;
  private static final String AUTHORITIES_KEY = "role";

  public AuthTokenProvider(@Value("${app.auth.tokenSecret}") String secretKey){
    this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
  }

  public AuthToken createToken(String id, Role roleType, String expiry){
    Date expiryDate = getExpiryDate(expiry);
    return new AuthToken(id, roleType, expiryDate, key);
  }

  public AuthToken createUserAppToken(String id) {
    return createToken(id, Role.USER, expiry);
  }

  public AuthToken convertAuthToken(String token) {
    return new AuthToken(token, key);
  }

  public static Date getExpiryDate(String expiry) {
    return new Date(System.currentTimeMillis() + Long.parseLong(expiry));
  }

  public Authentication getAuthentication(AuthToken authToken){

    if(authToken.validate()) {

      Claims claims = authToken.getTokenClaims();
      Collection<? extends GrantedAuthority> authorities =
          Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
              .map(SimpleGrantedAuthority::new)
              .collect(Collectors.toList());

      Credential principal = new Credential(claims.getSubject(), "", authorities);

      return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
    } else {
      throw new TokenValidFailedException();
    }
  }
}
