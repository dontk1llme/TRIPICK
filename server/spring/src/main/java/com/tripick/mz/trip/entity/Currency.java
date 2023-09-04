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
@Table(name = "currency")
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int currencyId;

    @OneToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @NotNull
    private LocalDate currencyDate;

    @NotNull
    private float exchangeRate;
}
