package com.tripick.mz.auth.dto.response;

import com.tripick.mz.member.entity.MemberBadge;
import com.tripick.mz.member.entity.Role;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MemberResDto {
    private int memberId;
    private String email;
    private String profileImage;
    private String nickname;
    private Role role;
    private List<MemberBadgeResDto> memberBadgeList;
    private int mainBadge;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
