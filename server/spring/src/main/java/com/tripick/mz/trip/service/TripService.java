package com.tripick.mz.trip.service;

import com.tripick.mz.trip.dto.request.PickTripRequestDto;
import com.tripick.mz.trip.dto.response.PickedTripResponseDto;

import java.util.List;

public interface TripService {
    // 여행 일정 찜
    void pick(PickTripRequestDto pickTripRequestDto);

    // 여행 일정 찜 해제
    void removePickedTrip(String pickedTripId);

    List<PickedTripResponseDto> getPickedTripList(String memberId);
}
