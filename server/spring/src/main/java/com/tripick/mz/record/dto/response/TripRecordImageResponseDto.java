package com.tripick.mz.record.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TripRecordImageResponseDto {
    private int tripRecordImageId;
    private String imageUrl;
}
