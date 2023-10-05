package com.tripick.mz.trip.controller;

import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.trip.dto.request.PickTripRequestDto;
import com.tripick.mz.trip.dto.response.PickedTripResponseDto;
import com.tripick.mz.trip.service.TripService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/trip")
@RestController
public class TripController {

    private final TripService tripService;

    @PostMapping("/pick")
    public ResponseResult pickTrip(@RequestBody PickTripRequestDto pickTripRequestDto) {
        log.info("TripController_pickTrip -> 여행 일정 찜");
        tripService.pick(pickTripRequestDto);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/remove/{pickedTripId}")
    public ResponseResult removePickedTrip(@PathVariable String pickedTripId) {
        log.info("TripController_removePickedTrip -> 여행 일정 찜 해제");
        tripService.removePickedTrip(pickedTripId);
        return ResponseResult.successResponse;
    }

    @GetMapping("/list/picked/{memberId}")
    public List<PickedTripResponseDto> getPickedTripList(@PathVariable int memberId){
        log.info("TripController_getPickedTripList -> 찜한 여행 일정 리스트 조회");
        return tripService.getPickedTripList(memberId);
    }
}
