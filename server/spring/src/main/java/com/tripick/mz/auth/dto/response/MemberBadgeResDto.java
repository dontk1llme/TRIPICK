package com.tripick.mz.auth.dto.response;

import com.tripick.mz.member.entity.Badge;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MemberBadgeResDto {
    private Badge badge;
    private boolean achieved;
    private LocalDateTime achievedDate;
    private int visitCount;
}
