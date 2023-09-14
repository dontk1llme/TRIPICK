package com.tripick.mz.record.controller;

import com.tripick.mz.common.error.ResponseDto;
import com.tripick.mz.record.dto.request.CreateTripRecordImageRequestDto;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.response.TripRecordResponseDto;
import com.tripick.mz.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<?> createTripRecord(@RequestBody CreateTripRecordRequestDto createTripRecordRequestDto) {
        try {
            recordService.createTripRecord(createTripRecordRequestDto);
            return new ResponseEntity<>(new ResponseDto(200, "성공:)", "여행 기록 등록 성공"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseDto(500, "에러:(", "여행 기록 등록 실패"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/saveImage")
    public ResponseEntity<?> saveTripRecordImage(
            @RequestParam("tripRecordId") int tripRecordId,
            @RequestParam("images") List<MultipartFile> images
    ){
        CreateTripRecordImageRequestDto createTripRecordImageRequestDto = new CreateTripRecordImageRequestDto();
        createTripRecordImageRequestDto.setTripRecordId(tripRecordId);
        createTripRecordImageRequestDto.setImages(images);

        try{
            recordService.saveTripRecordImage(createTripRecordImageRequestDto);
            return new ResponseEntity<>(new ResponseDto(200, "성공:)", "여행 기록 사진 등록 성공"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseDto(500, "에러:(", "여행 기록 사진 등록 실패"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
