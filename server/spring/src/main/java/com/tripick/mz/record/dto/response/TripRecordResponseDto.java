package com.tripick.mz.record.dto.response;

import com.tripick.mz.record.entity.TripRecordImage;
import lombok.*;

import java.awt.*;
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
    private List<TripRecordImageResponseDto> images;
}
