package com.tripick.mz.auth.handler;

import com.tripick.mz.auth.repository.CookieAuthorizationRequestRepository;
import com.tripick.mz.auth.util.CookieUtils;
import java.io.IOException;
import javax.naming.AuthenticationException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

  private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;

  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException authenticationException) throws IOException {
    String targetUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
        .map(Cookie::getValue)
        .orElse("/");

    targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
        .queryParam("error", authenticationException.getLocalizedMessage())
        .build().toUriString();

    cookieAuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    getRedirectStrategy().sendRedirect(request, response, targetUrl);
  }
}
