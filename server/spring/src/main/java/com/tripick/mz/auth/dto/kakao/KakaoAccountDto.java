package com.tripick.mz.auth.dto.kakao;

import java.util.Map;
import lombok.Getter;

@Getter
public class KakaoAccountDto {

  private String id;
  private String connected_at;
  private Map<String, Object> kakao_account;
}
