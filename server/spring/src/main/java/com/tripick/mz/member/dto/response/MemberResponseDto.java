package com.tripick.mz.member.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MemberResponseDto {
    private int memberId;
    private String email;
    private LocalDateTime createdAt;
    private String nickname;
    private String profileImage;
    private int mainBadge;
    private List<BadgeResponseDto> badges;
}
