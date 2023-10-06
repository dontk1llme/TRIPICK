package com.tripick.mz.record.repository;

import com.tripick.mz.record.entity.TripRecordImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRecordImageRepository extends JpaRepository<TripRecordImage, Integer> {
    List<TripRecordImage> findByTripRecordTripRecordId(int tripRecordId);
}