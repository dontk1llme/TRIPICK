package com.tripick.mz.record.service.implement;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tripick.mz.common.S3.dto.S3FileDto;
import com.tripick.mz.common.error.NotExistContentException;
import com.tripick.mz.common.error.NotExistMemberException;
import com.tripick.mz.common.error.NotExistRecordException;
import com.tripick.mz.common.error.NotExistRecordImageException;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.MemberBadge;
import com.tripick.mz.member.entity.QMemberBadge;
import com.tripick.mz.member.repository.MemberRepository;
import com.tripick.mz.record.dto.request.CreateTripRecordImageRequestDto;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.request.UpdateTripRecordContentRequestDto;
import com.tripick.mz.record.dto.response.TripRecordImageResponseDto;
import com.tripick.mz.record.dto.response.TripRecordResponseDto;
import com.tripick.mz.record.entity.QTripRecordImage;
import com.tripick.mz.record.entity.TripRecord;
import com.tripick.mz.record.entity.TripRecordImage;
import com.tripick.mz.record.repository.TripRecordImageRepository;
import com.tripick.mz.record.repository.TripRecordRepository;
import com.tripick.mz.record.service.RecordService;
import com.tripick.mz.trip.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private static final String BUCKET_NAME = "tripickbucket/Tripick";
    private final AmazonS3Client amazonS3Client;
    private final TripRecordRepository tripRecordRepository;
    private final TripRecordImageRepository tripRecordImageRepository;
    private final MemberRepository memberRepository;
    private final NationRepository nationRepository;
    private final JPAQueryFactory queryFactory;
    private final QMemberBadge memberBadge = QMemberBadge.memberBadge;
    private final QTripRecordImage tripRecordImage = QTripRecordImage.tripRecordImage;

    @Override
    public List<String> getTripRecordsByMemberId(int memberId) {
        log.info("RecordServiceImpl_getTripRecordsByMemberId -> 여행 기록 조회 시도");
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);

        List<TripRecord> tripRecords = tripRecordRepository.findByMember(member);

        // 중복된 나라 이름 제거
        return tripRecords.stream()
                .map(TripRecord::getNationName)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<TripRecordResponseDto> getTripRecordsByNationName(int memberId, String nationName) {
        log.info("RecordServiceImpl_getTripRecordsByNationName -> 나라 이름과 사용자 ID별 여행 기록 조회 시도");

        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);

        List<TripRecord> tripRecords = tripRecordRepository.findByMemberAndNationName(member, nationName);

        return tripRecords.stream().map(tripRecord -> {
            List<TripRecordImageResponseDto> images = tripRecordImageRepository.findByTripRecordTripRecordId(tripRecord.getTripRecordId())
                    .stream()
                    .map(tripRecordImage -> new TripRecordImageResponseDto(tripRecordImage.getTripRecordImageId(), tripRecordImage.getImageUrl()))
                    .collect(Collectors.toList());

            return new TripRecordResponseDto(
                    tripRecord.getTripRecordId(),
                    tripRecord.getNationName(),
                    tripRecord.getContent(),
                    images
            );
        }).collect(Collectors.toList());
    }


    @Override
    @Transactional
    public void createTripRecord(CreateTripRecordRequestDto createTripRecordRequestDto) {
        log.info("RecordServiceImpl_createTripRecord -> 여행 기록 작성 시도");
        Member member = memberRepository.findById(createTripRecordRequestDto.getMemberId())
                .orElseThrow(NotExistMemberException::new);

        int badgeId = nationRepository.findByName(createTripRecordRequestDto.getNationName()).getBadgeId();

        MemberBadge mb = queryFactory.selectFrom(memberBadge)
                .where(memberBadge.badge.badgeId.eq(badgeId),
                        memberBadge.member.memberId.eq(member.getMemberId()))
                .fetchOne();

        mb.updateVisitCount();

        if(mb.getVisitCount() >= 3) {
            mb.updateAchieved();
        }

        TripRecord tripRecord = TripRecord.builder()
                .member(member)
                .nationName(createTripRecordRequestDto.getNationName())
                .content(createTripRecordRequestDto.getContent())
                .build();

                tripRecordRepository.save(tripRecord);
    }

    @Override
    @Transactional
    public void saveTripRecordImage(CreateTripRecordImageRequestDto createTripRecordImageRequestDto) {
        log.info("RecordServiceImpl_saveTripRecordImage -> 여행 기록 사진 등록 시도");
        TripRecord tripRecord = tripRecordRepository.findById(createTripRecordImageRequestDto.getTripRecordId()).orElseThrow(NotExistRecordException::new);
        List<S3FileDto> uploadedFiles = uploadImagesToS3(createTripRecordImageRequestDto.getImages(), createTripRecordImageRequestDto.getTripRecordId());

        for (S3FileDto uploadedFile : uploadedFiles) {
            TripRecordImage image = new TripRecordImage();
            image.setTripRecord(tripRecord);
            image.setImageUrl(uploadedFile.getUploadFileUrl());
            tripRecordImageRepository.save(image);
        }

        MemberBadge mb = queryFactory.selectFrom(memberBadge)
                .where(memberBadge.member.eq(tripRecord.getMember()),
                        memberBadge.badge.badgeId.eq(2))
                .fetchOne();

        if(!mb.isAchieved()) {
            List<TripRecord> tripRecords = tripRecordRepository.findByMember(tripRecord.getMember());
            int imageCount = 0;

            for (TripRecord tr : tripRecords) {
                imageCount += tr.getTripRecordImages().size();

                if (imageCount >= 10) {
                    mb.updateAchieved();
                    break;
                }
            }
        }

        System.out.println(mb.isAchieved());
    }

    @Override
    @Transactional
    public void deleteTripRecord(int tripRecordId) {
        log.info("RecordServiceImpl_deleteTripRecord -> 여행 기록 삭제 시도");
        TripRecord tripRecord = tripRecordRepository.findById(tripRecordId)
                .orElseThrow(NotExistRecordException::new);
        tripRecordRepository.delete(tripRecord);

        List<TripRecordImage> tripRecordImages = tripRecordImageRepository.findByTripRecordTripRecordId(tripRecordId);
        tripRecordImageRepository.deleteAll(tripRecordImages);
    }

    @Override
    @Transactional
    public void updateTripRecordContent(UpdateTripRecordContentRequestDto updateTripRecordContentRequestDto) {
        log.info("RecordServiceImpl_updateTripRecordContent -> 여행 기록 내용 수정 시도");

        if(updateTripRecordContentRequestDto.getContent() == null) {
            throw new NotExistContentException();
        }

        TripRecord tripRecord = tripRecordRepository.findById(updateTripRecordContentRequestDto.getTripRecordId()).orElseThrow(
                NotExistRecordException::new);
        tripRecord.updateTripRecordContent(updateTripRecordContentRequestDto.getContent());
    }



    @Override
    @Transactional
    public void deleteTripRecordImage(int tripRecordImageId) {
        log.info("RecordServiceImpl_deleteTripRecordImage -> 여행 기록 이미지 삭제 시도");
        TripRecordImage tripRecordImage = tripRecordImageRepository.findById(tripRecordImageId)
                .orElseThrow(NotExistRecordImageException::new);
        tripRecordImageRepository.delete(tripRecordImage);
    }

    // S3에 여행 이미지 업로드
    private List<S3FileDto> uploadImagesToS3(List<MultipartFile> images, int tripRecordId) {
        List<S3FileDto> uploadedFiles = new ArrayList<>();

        for (MultipartFile image : images) {
            try (InputStream inputStream = image.getInputStream()) {
                String originalFileName = image.getOriginalFilename();
                String uploadFileName = getUuidFileName(originalFileName);
                String keyName = uploadFileName;

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
