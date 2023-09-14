package com.tripick.mz.record.dto.response;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TripRecordResponseDto {
    private int tripRecordId;
    private String nationName;
    private String content;
    private List<String> images;
}
