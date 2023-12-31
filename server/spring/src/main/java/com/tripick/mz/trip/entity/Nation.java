package com.tripick.mz.trip.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="nation")
public class Nation {
    @Id
    private int nationId;

    @NotNull
    @Column(length = 30)
    private String name;

    @NotNull
    private int badgeId;
}
