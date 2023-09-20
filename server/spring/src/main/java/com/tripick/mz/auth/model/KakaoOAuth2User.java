package com.tripick.mz.auth.model;

import java.util.Map;

public class KakaoOAuth2User extends OAuth2UserInfo{

  private Integer id;

  public KakaoOAuth2User(Map<String, Object> attributes){
    super((Map<String, Object>) attributes.get("kakao_account"));
    this.id = (Integer) attributes.get("id");
  }

  @Override
  public String getOauth2Id() {
    return this.id.toString();
  }

  @Override
  public String getEmail() {
    return (String) attributes.get("email");
  }

  @Override
  public String getNickName() {
    return (String) ((Map<String, Object>) attributes.get("profile")).get("nickname");
  }
}
