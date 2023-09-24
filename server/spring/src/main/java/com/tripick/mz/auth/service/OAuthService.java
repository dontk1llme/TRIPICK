package com.tripick.mz.auth.service;

import com.tripick.mz.auth.dto.OAuth2Attribute;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.repository.CredentialRepository;
import com.tripick.mz.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
  private final MemberRepository memberRepository;
  private final CredentialRepository credentialRepository;

  @Override
  @Transactional
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

    OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
    OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
            .getUserInfoEndpoint().getUserNameAttributeName();

    log.info("registrationId = {}", registrationId);
    log.info("userNameAttributeName = {}", userNameAttributeName);

    OAuth2Attribute attribute =
            OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

    Member member = saveOrUpdate(attribute);

    return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(member.getCredential().getRoleKey())),
            attribute.getAttributes(), attribute.getNameAttributeKey());
  }

  private Member saveOrUpdate(OAuth2Attribute attribute) {
    Credential credential = credentialRepository.findByEmail(attribute.getEmail())
            .orElse(attribute.toCredentialEntity());

    credentialRepository.save(credential);

    Member member = memberRepository.findByCredential(credential)
            .orElse(attribute.toMemberEntity());

    return memberRepository.save(member);
  }


}
