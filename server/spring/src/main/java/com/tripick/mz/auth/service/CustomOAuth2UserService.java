package com.tripick.mz.auth.service;

import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.repository.MemberRepository;
import java.util.Collections;
import javax.servlet.http.HttpSession;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  private final MemberRepository memberRepository;
  private final HttpSession httpSession;

  public CustomOAuth2UserService(MemberRepository memberRepository, HttpSession httpSession){
    this.memberRepository = memberRepository;
    this.httpSession = httpSession;
  }


  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
    OAuth2User oAuth2User = delegate.loadUser(userRequest);

    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
        .getUserInfoEndpoint().getUserNameAttributeName();

    OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttribute());

    Member member = saveOrUpdate(attributes);
    httpSession.setAttribute("user", new SessionUser(member));

    return new DefaultOAuth2User(
        Collections.singleton(new SimpleGrantedAuthority(member.getCredential().getRole().toString())),
        attributes.getAttributes(),
        attributes.getNameAttributeKey()
    );
  }

  private Member saveOrUpdate(OAuthAttributes attributes){
    Member member = memberRepository.findByEmail(attributes);
  }
}
