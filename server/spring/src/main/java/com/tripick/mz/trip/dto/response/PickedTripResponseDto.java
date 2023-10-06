package com.tripick.mz.trip.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class PickedTripResponseDto {
    private String uuid;
    private String name;
    private String country;
    private String start_date;
    private String end_date;
    private String image_url;
    private int traveler;
    private ClimateDto climate;
    private float exchange;
    private float price;
    private float crime;
}