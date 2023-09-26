package com.tripick.mz.auth.dto.response;

import com.tripick.mz.member.entity.Member;
import lombok.Data;

@Data
public class LoginResponseDto {
  public boolean loginSuccess;
  public Member account;
}
