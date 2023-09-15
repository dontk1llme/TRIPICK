package com.tripick.mz.record.service.implement;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tripick.mz.common.S3.dto.S3FileDto;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.repository.MemberRepository;
import com.tripick.mz.record.dto.request.CreateTripRecordImageRequestDto;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.request.UpdateTripRecordContentRequestDto;
import com.tripick.mz.record.dto.response.TripRecordResponseDto;
import com.tripick.mz.record.entity.TripRecord;
import com.tripick.mz.record.entity.TripRecordImage;
import com.tripick.mz.record.repository.TripRecordImageRepository;
import com.tripick.mz.record.repository.TripRecordRepository;
import com.tripick.mz.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private static final String BUCKET_NAME = "tripickbucket/Tripick";
    private final AmazonS3Client amazonS3Client;
    private final TripRecordRepository tripRecordRepository;
    private final TripRecordImageRepository tripRecordImageRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<TripRecordResponseDto> getTripRecordsByMemberId(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        List<TripRecord> tripRecords = tripRecordRepository.findByMember(member);

        return tripRecords.stream().map(tripRecord -> {
            List<String> imageUrls = tripRecordImageRepository.findByTripRecordTripRecordId(tripRecord.getTripRecordId())
                    .stream()
                    .map(TripRecordImage::getImageUrl)
                    .collect(Collectors.toList());

            return new TripRecordResponseDto(tripRecord.getTripRecordId(),tripRecord.getNationName(), tripRecord.getContent(), imageUrls);
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createTripRecord(CreateTripRecordRequestDto createTripRecordRequestDto) {
        Member member = memberRepository.findById(createTripRecordRequestDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        TripRecord tripRecord = TripRecord.builder()
                .member(member)
                .nationName(createTripRecordRequestDto.getNationName())
                .content(createTripRecordRequestDto.getContent())
                .build();

                tripRecordRepository.save(tripRecord);
    }

    @Override
    public void saveTripRecordImage(CreateTripRecordImageRequestDto createTripRecordImageRequestDto) {
        TripRecord tripRecord = tripRecordRepository.findById(createTripRecordImageRequestDto.getTripRecordId()).orElseThrow(() -> new RuntimeException("기록 찾을수 없음"));
        List<S3FileDto> uploadedFiles = uploadImagesToS3(createTripRecordImageRequestDto.getImages(), createTripRecordImageRequestDto.getTripRecordId());

        for (S3FileDto uploadedFile : uploadedFiles) {
            TripRecordImage image = new TripRecordImage();
            image.setTripRecord(tripRecord);
            image.setImageUrl(uploadedFile.getUploadFileUrl());
            tripRecordImageRepository.save(image);
        }
    }

    @Override
    @Transactional
    public void deleteTripRecord(int tripRecordId) {
        // 여행 기록 삭제
        TripRecord tripRecord = tripRecordRepository.findById(tripRecordId)
                .orElseThrow(() -> new RuntimeException("여행 기록을 찾을 수 없습니다."));
        tripRecordRepository.delete(tripRecord);

        // 연결된 이미지 삭제
        List<TripRecordImage> tripRecordImages = tripRecordImageRepository.findByTripRecordTripRecordId(tripRecordId);
        tripRecordImageRepository.deleteAll(tripRecordImages);
    }

    @Override
    @Transactional
    public void updateTripRecordContent(UpdateTripRecordContentRequestDto updateTripRecordContentRequestDto) {
        String newContent = updateTripRecordContentRequestDto.getContent();
        TripRecord tripRecord = tripRecordRepository.findById(updateTripRecordContentRequestDto.getTripRecordId()).orElseThrow(
                ()-> new RuntimeException("글을 찾을 수 없습니다."));
        tripRecord.updateTripRecordContent(updateTripRecordContentRequestDto.getContent());
    }

    // S3에 여행 이미지 업로드
    private List<S3FileDto> uploadImagesToS3(List<MultipartFile> images, int tripRecordId) {
        List<S3FileDto> uploadedFiles = new ArrayList<>();

        for (MultipartFile image : images) {
            try (InputStream inputStream = image.getInputStream()) {
                String originalFileName = image.getOriginalFilename();
                String uploadFileName = getUuidFileName(originalFileName);
                String keyName = uploadFileName; // S3에 저장될 경로

                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(image.getSize());
                objectMetadata.setContentType(image.getContentType());

                // S3에 파일 업로드
                amazonS3Client.putObject(
                        new PutObjectRequest(BUCKET_NAME, keyName, inputStream, objectMetadata));

                String uploadFileUrl = amazonS3Client.getUrl(BUCKET_NAME, keyName).toString();
                uploadedFiles.add(
                        S3FileDto.builder()
                                .originalFileName(originalFileName)
                                .uploadFileName(uploadFileName)
                                .uploadFileUrl(uploadFileUrl)
                                .build());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return uploadedFiles;
    }

    private String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.lastIndexOf("."));
        return UUID.randomUUID().toString() + ext;
    }
}
