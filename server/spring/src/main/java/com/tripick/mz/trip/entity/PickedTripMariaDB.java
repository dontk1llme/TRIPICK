package com.tripick.mz.trip.entity;

import com.tripick.mz.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "picked_trip")
@Deprecated
public class PickedTripMariaDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pickedTripId;

    @ManyToOne
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private City city;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private float currency;

    private float crimeRate;

    @NotNull
    private int travelerEstimation;

    private float relativePriceIndex;

    @NotNull
    private boolean activated;
}
