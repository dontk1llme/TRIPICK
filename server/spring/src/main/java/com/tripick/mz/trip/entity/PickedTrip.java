package com.tripick.mz.trip.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import javax.persistence.Id;

@Data
@Document(collection = "picked_trip")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class PickedTrip {
    @Id
    private String id;

    private String uuid;

    @Field("member_id")
    private String memberId;
    private String city;
    private String country;

    @Field("start_date")
    private String startDate;

    @Field("end_date")
    private String endDate;
    private int traveler;
    private float climate;

    @Field("exchange_rate")
    private float exchangeRate;

    @Field("price_index")
    private float priceIndex;

    @Field("crime_rate")
    private float crimeRate;

    private boolean activated;
}
