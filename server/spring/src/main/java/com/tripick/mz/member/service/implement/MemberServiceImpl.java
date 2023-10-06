package com.tripick.mz.member.service.implement;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tripick.mz.common.S3.dto.S3FileDto;
import com.tripick.mz.common.error.NotExistBadgeException;
import com.tripick.mz.common.error.NotExistMemberException;
import com.tripick.mz.member.dto.request.UpdateNicknameRequestDto;
import com.tripick.mz.member.dto.response.BadgeResponseDto;
import com.tripick.mz.member.dto.response.MemberResponseDto;
import com.tripick.mz.member.entity.Badge;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.MemberBadge;
import com.tripick.mz.member.repository.BadgeRepository;
import com.tripick.mz.member.repository.MemberRepository;
import com.tripick.mz.member.service.MemberService;
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
@Transactional
public class MemberServiceImpl implements MemberService {
    private static final String DEFAULT_IMAGE = "https://tripickbucket.s3.ap-northeast-2.amazonaws.com/Tripick/default_profile.png";

    private String bucketName = "tripickbucket/Tripick";
    private final AmazonS3Client amazonS3Client;
    private final MemberRepository memberRepository;
    private final BadgeRepository badgeRepository;
    public MemberResponseDto getMemberById(int memberId) {
        log.info("MemberServiceImpl_getMemberById -> 사용자 정보 조회 시도");
        // 멤버 정보 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);
        // 뱃지 정보 조회
        List<MemberBadge> memberBadges = member.getMemberBadgeList();

        List<BadgeResponseDto> badgeResponses = memberBadges.stream()
                .map(memberBadge -> {
                    Badge badge = memberBadge.getBadge();
                    return new BadgeResponseDto(badge.getBadgeId(), memberBadge.isAchieved(),badge.getName(),badge.getDetail(),badge.getImage()
                    );
                })
                .collect(Collectors.toList());

        return new MemberResponseDto(
                member.getMemberId(),
                member.getCredential().getEmail(),
                member.getCreatedAt(),
                member.getNickname(),
                member.getProfileImage(),
                member.getMainBadge(),
                badgeResponses
        );
    }

    @Override
    public List<BadgeResponseDto> getBadgeList(int memberId) {
        log.info("MemberServiceImpl_getBadgeList -> 사용자 보유 뱃지 조회 시도");
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);

        List<MemberBadge> memberBadges = member.getMemberBadgeList();

        if (memberBadges.isEmpty()) {
            throw new NotExistBadgeException();
        }

        List<BadgeResponseDto> badgeResponses = memberBadges.stream()
                .map(memberBadge -> {
                    Badge badge = memberBadge.getBadge();
                    return new BadgeResponseDto(badge.getBadgeId(), memberBadge.isAchieved(),badge.getName(),badge.getDetail(),badge.getImage());
                })
                .collect(Collectors.toList());

        return badgeResponses;
    }


    @Override
    @Transactional
    public void updateNickname(UpdateNicknameRequestDto updateNicknameRequestDto) {
        log.info("MemberServiceImpl_updateNickname -> 사용자 닉네임 수정 시도");
        Member member = memberRepository.findById(updateNicknameRequestDto.getMemberId())
                .orElseThrow(NotExistMemberException::new);
        member.updateNickname(updateNicknameRequestDto.getNickname());
    }

    @Override
    @Transactional
    public List<S3FileDto> updateImage(List<MultipartFile> multipartFiles,int memberId) {
        log.info("MemberServiceImpl_updateImage -> 사용자 프로필 사진 수정 시도");
        List<S3FileDto> s3files = new ArrayList<>();
        String originalFileName = multipartFiles.get(0).getOriginalFilename();
        String uploadFileName = getUuidFileName(originalFileName);
        String uploadFileUrl = "";

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFiles.get(0).getSize());
        objectMetadata.setContentType(multipartFiles.get(0).getContentType());

        try (InputStream inputStream = multipartFiles.get(0).getInputStream()) {

            String keyName = uploadFileName; // ex) 구분/년/월/일/파일.확장자

            // S3에 폴더 및 파일 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata));

            // S3에 업로드한 폴더 및 파일 URL
            uploadFileUrl = amazonS3Client.getUrl(bucketName, keyName).toString();
            Member member = memberRepository.findById(memberId).orElseThrow(NotExistMemberException::new);
            member.updateProfileImage(uploadFileUrl);
        } catch (IOException e) {
            log.error("MemberServiceImpl_updateImage -> 사용자 이미지 변경 실패: {}", e.getMessage());
            e.printStackTrace();
        }

        s3files.add(
                S3FileDto.builder()
                        .originalFileName(originalFileName)
                        .uploadFileName(uploadFileName)
                        .uploadFileUrl(uploadFileUrl)
                        .build());
        return s3files;
    }

    public String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + ext;
    }

    @Override
    @Transactional
    public String deleteImage(int memberId) {
        log.info("MemberServiceImpl_deleteImage -> 사용자 프로필 사진 수정 시도");
        Member member = memberRepository.findById(memberId).orElseThrow(NotExistMemberException::new);
        member.updateProfileImage(DEFAULT_IMAGE);
        return member.getProfileImage();
    }

    @Override
    @Transactional
    public void updateMainBadge(int memberId, int badgeId) {
        log.info("MemberServiceImpl_updateMainBadge -> 사용자 메인 뱃지 수정 시도");
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);

        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(NotExistBadgeException::new);

        // 대표 뱃지 업데이트
        member.updateMainBadge(badgeId);
        memberRepository.save(member);
    }


}
