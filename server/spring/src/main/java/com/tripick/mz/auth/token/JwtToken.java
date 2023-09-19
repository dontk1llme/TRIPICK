package com.tripick.mz.auth.token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class JwtToken {

  private String grantType;
  private String accessToken;
  private String refreshToken;
}
