package com.tripick.mz.record.service;

import com.tripick.mz.record.dto.request.CreateTripRecordImageRequestDto;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.response.TripRecordResponseDto;

import java.util.List;

public interface RecordService {
    // 여행 기록 조회
    List<TripRecordResponseDto> getTripRecordsByMemberId(int memberId);

    // 여행 기록 생성
    void createTripRecord(CreateTripRecordRequestDto createTripRecordRequestDto);

    // 여행 기록 이미지 등록
    void saveTripRecordImage(CreateTripRecordImageRequestDto createTripRecordImageRequestDto);
}
