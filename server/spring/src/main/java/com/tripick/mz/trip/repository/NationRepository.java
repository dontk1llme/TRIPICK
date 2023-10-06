package com.tripick.mz.trip.repository;

import com.tripick.mz.trip.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationRepository extends JpaRepository<Nation, String> {

    Nation findByName(String nationName);
}