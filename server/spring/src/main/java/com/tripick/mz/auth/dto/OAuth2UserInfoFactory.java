package com.tripick.mz.auth.dto;

import com.tripick.mz.member.entity.ProviderType;
import java.util.Map;

public class OAuth2UserInfoFactory {
  public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
    switch (providerType) {
      case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
      case KAKAO: return new KakaoOAuth2UserInfo(attributes);
      default: throw new IllegalArgumentException("Invalid Provider Type.");
    }
  }
}
