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
    private String city;
    private String country;
    private String startDate;
    private String endDate;
    private String imageUrl;
    private int traveler;
    private float minimumTemperature;
    private float averageTemperature;
    private float maximumTemperature;
    private float exchangeRate;
    private float priceIndex;
    private float crimeRate;
    private boolean activated;
}