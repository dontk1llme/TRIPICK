package com.tripick.mz.record.controller;

import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.record.dto.request.CreateTripRecordImageRequestDto;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.request.UpdateTripRecordContentRequestDto;
import com.tripick.mz.record.dto.response.TripRecordResponseDto;
import com.tripick.mz.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/record")
@RestController
public class RecordController {

    private final RecordService recordService;

    @GetMapping("/{memberId}")
    public ResponseEntity<List<TripRecordResponseDto>> getTripRecordsByMemberId(@PathVariable int memberId) {
        List<TripRecordResponseDto> tripRecords = recordService.getTripRecordsByMemberId(memberId);
        return ResponseEntity.ok(tripRecords);
    }

    @PostMapping("/create")
    public ResponseResult createTripRecord(@RequestBody CreateTripRecordRequestDto createTripRecordRequestDto) {
        recordService.createTripRecord(createTripRecordRequestDto);
        return ResponseResult.successResponse;
    }

    @PostMapping("/saveImage")
    public ResponseResult saveTripRecordImage(
            @RequestParam("tripRecordId") int tripRecordId,
            @RequestParam("images") List<MultipartFile> images){
        CreateTripRecordImageRequestDto createTripRecordImageRequestDto = new CreateTripRecordImageRequestDto();
        createTripRecordImageRequestDto.setTripRecordId(tripRecordId);
        createTripRecordImageRequestDto.setImages(images);

        recordService.saveTripRecordImage(createTripRecordImageRequestDto);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/content")
    public ResponseResult updateTripRecordContent(@Valid @RequestBody UpdateTripRecordContentRequestDto updateTripRecordContentRequestDto){
        recordService.updateTripRecordContent(updateTripRecordContentRequestDto);
        return ResponseResult.successResponse;
    }

    @DeleteMapping("/delete-record/{tripRecordId}")
    public ResponseResult deleteTripRecord(@PathVariable int tripRecordId){
        recordService.deleteTripRecord(tripRecordId);
        return ResponseResult.successResponse;
    }

    @DeleteMapping("/delete-record-image/{tripRecordImageId}")
    public ResponseResult deleteTripRecordImage(@PathVariable int tripRecordImageId){
        recordService.deleteTripRecordImage(tripRecordImageId);
        return ResponseResult.successResponse;
    }
}
