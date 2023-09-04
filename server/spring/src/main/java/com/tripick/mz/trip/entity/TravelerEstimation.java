package com.tripick.mz.trip.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "traveler_estimation")
public class TravelerEstimation {
    @Id
    private int travelerEstimationId;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private City city;

    @NotNull
    private int estimatedTraveler;

    @NotNull
    private int month;
}
