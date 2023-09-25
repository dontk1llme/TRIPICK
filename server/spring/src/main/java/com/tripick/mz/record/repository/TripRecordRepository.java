package com.tripick.mz.record.repository;

import com.tripick.mz.member.entity.Member;
import com.tripick.mz.record.entity.TripRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRecordRepository extends JpaRepository<TripRecord, Integer> {
    List<TripRecord> findByMember(Member member);

    List<TripRecord> findByMemberAndNationName(Member member, String nationName);
}