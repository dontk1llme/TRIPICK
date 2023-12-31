package com.tripick.mz.trip.repository;

import com.tripick.mz.trip.entity.PickedTrip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends MongoRepository<PickedTrip, Integer> {
    List<PickedTrip> findByMemberIdAndActivated(int memberId, boolean activated);
}
