package com.tripick.mz.trip.entity;

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
@Table(name = "climate")
public class Climate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int climateId;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private City city;

    @NotNull
    private float averageTemp;

    @NotNull
    private LocalDate climateDate;

    @NotNull
    private int rainyDay;

    @NotNull
    private float lowestTemp;

    @NotNull
    private float highestTemp;

    @NotNull
    private int sunshineDuration;
}
