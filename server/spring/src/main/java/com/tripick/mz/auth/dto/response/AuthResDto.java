package com.tripick.mz.auth.dto.response;

import com.tripick.mz.member.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResDto {

  private String accessToken;
  private String refreshToken;
  private Long accessTokenExpiresIn;
  private int memberId;
  private String email;
  private Role memberRole;
  private String nickname;
  private String profileImageUrl;

}
