package com.tripick.mz.member.dto.response;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BadgeResponseDto {
    private int badgeId;
    private boolean achieved; //획득 여부
}

