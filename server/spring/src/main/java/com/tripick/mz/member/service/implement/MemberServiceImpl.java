package com.tripick.mz.member.service.implement;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tripick.mz.common.S3.dto.S3FileDto;
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
@Transactional
public class MemberServiceImpl implements MemberService {
    private static final String DEFAULT_IMAGE = "https://tripickbucket.s3.ap-northeast-2.amazonaws.com/Tripick/default_profile.png";

    private String bucketName = "tripickbucket/Tripick";
    private final AmazonS3Client amazonS3Client;
    private final MemberRepository memberRepository;
    private final BadgeRepository badgeRepository;
    public MemberResponseDto getMemberById(int memberId) {
        // 멤버 정보 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 뱃지 정보 조회
        List<MemberBadge> memberBadges = member.getMemberBadgeList();

        List<BadgeResponseDto> badgeResponses = memberBadges.stream()
                .map(memberBadge -> {
                    Badge badge = memberBadge.getBadge();
                    return new BadgeResponseDto(badge.getBadgeId(),memberBadge.isAchieved()
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
    @Transactional
    public MemberResponseDto updateNickname(UpdateNicknameRequestDto updateNicknameRequestDto) {
        String newNickname = updateNicknameRequestDto.getNickname();
        Member member = memberRepository.findById(updateNicknameRequestDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        member.updateNickname(updateNicknameRequestDto.getNickname());
        return null;
    }

    @Override
    @Transactional
    public List<S3FileDto> updateImage(List<MultipartFile> multipartFiles,int memberId) {
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
            Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
            member.updateProfileImage(uploadFileUrl);
        } catch (IOException e) {
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
        Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
        member.updateProfileImage(DEFAULT_IMAGE);
        return member.getProfileImage();
    }

    @Override
    public void updateMainBadge(int memberId, int badgeId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("멤버 찾을수 없음"));

        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(() -> new RuntimeException("뱃지 정보 없음"));

        // 대표 뱃지 업데이트
        member.updateMainBadge(badgeId);
        memberRepository.save(member);
    }
}
