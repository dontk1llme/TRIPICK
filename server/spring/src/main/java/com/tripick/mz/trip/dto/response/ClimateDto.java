package com.tripick.mz.trip.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ClimateDto {
    private float temp_min;
    private float temp_avg;
    private float temp_max;
}
