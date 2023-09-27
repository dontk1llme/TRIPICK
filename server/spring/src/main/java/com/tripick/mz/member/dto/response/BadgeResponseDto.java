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
    private boolean achieved;
    private String name;
    private String content;
    private String image;
}

