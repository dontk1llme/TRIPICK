package com.tripick.mz.auth.filter;

import com.tripick.mz.auth.token.AuthToken;
import com.tripick.mz.auth.token.AuthTokenProvider;
import com.tripick.mz.auth.token.JwtTokenProvider;
import com.tripick.mz.auth.util.JwtHeaderUtil;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

@Log4j2
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

  private final JwtTokenProvider jwtTokenProvider;

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    String token = resolveToken((HttpServletRequest) request);

    // 토큰 유효성 검사
    if(token!=null && jwtTokenProvider.validateToken(token)){
      Authentication authentication = jwtTokenProvider.getAuthentication(token);
      SecurityContextHolder.getContext().setAuthentication((authentication));
    }
    chain.doFilter(request, response);
  }

  // 헤더에서 토큰 추출
  private String resolveToken(HttpServletRequest request){
    String bearerToken = request.getHeader("Authorization");
    if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
      return bearerToken.substring(7);
    }
    return null;
  }
}
