package com.tripick.mz.member.controller;

import com.tripick.mz.S3.dto.S3FileDto;
import com.tripick.mz.common.error.ResponseDto;
import com.tripick.mz.member.dto.request.UpdateMainBadgeRequestDto;
import com.tripick.mz.member.dto.request.UpdateNicknameRequestDto;
import com.tripick.mz.member.dto.response.MemberResponseDto;
import com.tripick.mz.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{memberId}")
    public MemberResponseDto getMember(@PathVariable int memberId) {
        return memberService.getMemberById(memberId);
    }

    @PatchMapping("/nickname")
    public ResponseEntity<?> updateNickname(@Valid @RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
        MemberResponseDto memberResponseDto = memberService.updateNickname(updateNicknameRequestDto);
        return new ResponseEntity<>(new ResponseDto(200, "성공:)", "닉네임 변경 성공"), HttpStatus.OK);
    }

    @PatchMapping("/update-profile-image")
    public ResponseEntity<?> updateImage(@RequestParam("files") List<MultipartFile> multipartFiles, @RequestParam("memberId") int memberId) {
        List<S3FileDto> uploadedFiles = memberService.updateImage(multipartFiles, memberId);
        return new ResponseEntity<>(new ResponseDto(200, "성공:)", "프로필 사진 변경 성공"), HttpStatus.OK);
    }

    @PatchMapping("/delete-profile-image")
    public ResponseEntity<?> deleteImage(@RequestParam("memberId") int memberId) {
        String deletedImageUrl = memberService.deleteImage(memberId);
        return new ResponseEntity<>(new ResponseDto(200, "성공:)", "프로필 사진 삭제 성공"), HttpStatus.OK);
    }

    @PatchMapping("/update-main-badge")
    public ResponseEntity<?> setMainBadge(@RequestBody UpdateMainBadgeRequestDto requestDto) {
        memberService.updateMainBadge(requestDto.getMemberId(), requestDto.getBadgeId());
        return new ResponseEntity<>(new ResponseDto(200, "성공:)", "대표 뱃지 변경 성공"), HttpStatus.OK);
    }

}