package com.tripick.mz.auth.service;

import com.tripick.mz.auth.model.OAuth2UserInfo;
import com.tripick.mz.auth.model.OAuth2UserInfoFactory;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.Role;
import com.tripick.mz.member.repository.CredentialRepository;
import com.tripick.mz.member.repository.MemberRepository;
import java.nio.file.attribute.UserPrincipal;
import java.security.AuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  private final MemberRepository memberRepository;
  private final CredentialRepository credentialRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

    OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
    OAuth2User oAuth2User = oAuth2UserService.loadUser(oAuth2UserRequest);

    return processOAuth2User(oAuth2UserRequest, oAuth2User);
  }

  protected OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User){
    AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
    OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());

    if(!StringUtils.hasText(oAuth2UserInfo.getEmail())){
      throw new RuntimeException("Email not found from OAuth2 provider");
    }

    Credential credential = credentialRepository.findByEmail(oAuth2UserInfo.getEmail()).orElse(null);
    Member member = memberRepository.findByCredential(credential.getCredentialId()).orElseThrow(RuntimeException::new);
    if(credential != null){
      if(!credential.getSocialPlatform().equals(authProvider)){
        throw new RuntimeException("Email already signed up.");
      }
      member = updateMember(member, oAuth2UserInfo);
    } else {
      member = registerMember(authProvider, oAuth2UserInfo);
    }
    return UserPrincipal.create(member, oAuth2UserInfo.getAttributes());
  }

  private Member registerMember(AuthProvider authProvider, Oauth2UserInfo oauth2UserInfo){
    Credential crdential = Credential.builder()
        .email(oauth2UserInfo.getEmail())
        .role(Role.USER)
        .socialPlatform(authProvider.getName())
        .build();

    Member member = Member.builder()
        .credential(credential)
        .nickname(oauth2UserInfo.getName())
        .build();

    return memberRepository.save(member);
  }

  private Member updateMember(Member member, OAuth2UserInfo oAuth2UserInfo){
    return memberRepository.save(member.update(oAuth2UserInfo));
  }
}
