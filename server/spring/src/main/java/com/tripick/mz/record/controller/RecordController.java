package com.tripick.mz.record.controller;

import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.record.dto.request.CreateTripRecordImageRequestDto;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.request.UpdateTripRecordContentRequestDto;
import com.tripick.mz.record.dto.response.TripRecordResponseDto;
import com.tripick.mz.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/record")
@RestController
public class RecordController {

    private final RecordService recordService;

    @GetMapping("/{memberId}")
    public ResponseEntity<List<TripRecordResponseDto>> getTripRecordsByMemberId(@PathVariable int memberId) {
        log.info("RecordController_getTripRecordsByMemberId -> 사용자별 여행 기록 조회");
        List<TripRecordResponseDto> tripRecords = recordService.getTripRecordsByMemberId(memberId);
        return ResponseEntity.ok(tripRecords);
    }

    @PostMapping("/create")
    public ResponseResult createTripRecord(@RequestBody CreateTripRecordRequestDto createTripRecordRequestDto) {
        log.info("RecordController_createTripRecord -> 여행 기록 등록");
        recordService.createTripRecord(createTripRecordRequestDto);
        return ResponseResult.successResponse;
    }

    @PostMapping("/saveImage")
    public ResponseResult saveTripRecordImage(
            @RequestParam("tripRecordId") int tripRecordId,
            @RequestParam("images") List<MultipartFile> images){
        log.info("RecordController_saveTripRecordImage -> 여행 기록 사진 등록");
        CreateTripRecordImageRequestDto createTripRecordImageRequestDto = new CreateTripRecordImageRequestDto();
        createTripRecordImageRequestDto.setTripRecordId(tripRecordId);
        createTripRecordImageRequestDto.setImages(images);

        recordService.saveTripRecordImage(createTripRecordImageRequestDto);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/content")
    public ResponseResult updateTripRecordContent(@Valid @RequestBody UpdateTripRecordContentRequestDto updateTripRecordContentRequestDto){
        log.info("RecordController_updateTripRecordContent -> 여행 기록 내용 수정");
        recordService.updateTripRecordContent(updateTripRecordContentRequestDto);
        return ResponseResult.successResponse;
    }

    @DeleteMapping("/delete-record/{tripRecordId}")
    public ResponseResult deleteTripRecord(@PathVariable int tripRecordId){
        log.info("RecordController_deleteTripRecord -> 여행 기록 삭제");
        recordService.deleteTripRecord(tripRecordId);
        return ResponseResult.successResponse;
    }

    @DeleteMapping("/delete-record-image/{tripRecordImageId}")
    public ResponseResult deleteTripRecordImage(@PathVariable int tripRecordImageId){
        log.info("RecordController_deleteTripRecordImage -> 여행 기록 사진 삭제");
        recordService.deleteTripRecordImage(tripRecordImageId);
        return ResponseResult.successResponse;
    }
}
