package com.tripick.mz.auth.dto.response;

import com.tripick.mz.auth.dto.TokenDto;
import com.tripick.mz.member.entity.Badge;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.MemberBadge;
import com.tripick.mz.member.entity.Role;
import lombok.*;
import org.springframework.security.core.token.Token;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LoginResponseDto {
  private TokenDto tokenDto;
  private MemberResDto memberResDto;
}