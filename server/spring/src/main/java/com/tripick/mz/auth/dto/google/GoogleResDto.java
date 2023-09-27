package com.tripick.mz.auth.dto.google;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GoogleResDto {
  private String access_token;
  private String expires_in;
  private String refresh_token;
  private String scope;
  private String token_type;
  private String id_token;
}
