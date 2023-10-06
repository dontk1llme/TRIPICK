package com.tripick.mz.record.service;

import com.tripick.mz.record.dto.request.CreateTripRecordImageRequestDto;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.request.UpdateTripRecordContentRequestDto;
import com.tripick.mz.record.dto.response.TripRecordResponseDto;

import java.util.List;

public interface RecordService {
    // 여행 기록이 있는 나라 조회
    List<String> getTripRecordsByMemberId(int memberId);
    
    // 여행 기록 생성
    void createTripRecord(CreateTripRecordRequestDto createTripRecordRequestDto);

    // 여행 기록 이미지 등록
    void saveTripRecordImage(CreateTripRecordImageRequestDto createTripRecordImageRequestDto);

    // 여행 기록 삭제
    void deleteTripRecord(int tripRecordId);
    
    // 여행 기록 내용 변경
    void updateTripRecordContent(UpdateTripRecordContentRequestDto updateTripRecordContentRequestDto);

    //여행 기록 이미지 삭제
    void deleteTripRecordImage(int tripRecordImageId);

    //나라별 기록 조회
    List<TripRecordResponseDto> getTripRecordsByNationName(int memberId, String nationName);
}
