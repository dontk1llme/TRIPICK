package com.tripick.mz.auth.model;

import java.util.Map;

public class GoogleOAuth2User extends OAuth2UserInfo{

  public GoogleOAuth2User(Map<String, Object> attributes){
    super(attributes);
  }
  @Override
  public String getOauth2Id() {
    return (String) attributes.get("sub");
  }

  @Override
  public String getEmail() {
    return (String) attributes.get("email");
  }

  @Override
  public String getNickName() {
    return (String) attributes.get("name");
  }
}
