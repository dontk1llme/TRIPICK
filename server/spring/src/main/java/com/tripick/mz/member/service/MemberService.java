package com.tripick.mz.member.service;

import com.tripick.mz.common.S3.dto.S3FileDto;
import com.tripick.mz.member.dto.request.UpdateNicknameRequestDto;
import com.tripick.mz.member.dto.response.BadgeResponseDto;
import com.tripick.mz.member.dto.response.MemberResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {
    //내 정보 조회
    MemberResponseDto getMemberById(int memberId);
    //닉네임 변경
    void updateNickname(UpdateNicknameRequestDto updateNicknameRequestDto);

    //프로필 사진 변경
    List<S3FileDto> updateImage(List<MultipartFile> multipartFiles, int memberId);

    //프로필 사진 삭제
    String deleteImage(int memberId);

    //대표 뱃지 변경
    void updateMainBadge(int memberId, int badgeId);

    //내 뱃지 조회
    List<BadgeResponseDto> getBadgeList(int memberId);
}
