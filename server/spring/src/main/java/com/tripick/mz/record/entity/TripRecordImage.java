package com.tripick.mz.record.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "trip_record_image")
public class TripRecordImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tripRecordImageId;

    @ManyToOne
    @JoinColumn(name = "trip_record_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private TripRecord tripRecord;

    @NotNull
    private String imageUrl;
}
