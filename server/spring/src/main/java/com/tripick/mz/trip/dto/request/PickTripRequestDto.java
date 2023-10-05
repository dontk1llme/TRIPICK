package com.tripick.mz.trip.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class PickTripRequestDto {
    private String uuid;
    private int memberId;
    private String city;
    private String country;
    private String startDate;
    private String endDate;
    private int traveler;
    private float exchangeRate;
    private float priceIndex;
    private float crimeRate;
    private float climate;
    private boolean activated;
}


