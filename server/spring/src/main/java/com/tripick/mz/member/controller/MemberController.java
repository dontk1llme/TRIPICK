package com.tripick.mz.member.controller;

import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.common.response.SingleResponseResult;
import com.tripick.mz.member.dto.request.UpdateMainBadgeRequestDto;
import com.tripick.mz.member.dto.request.UpdateNicknameRequestDto;
import com.tripick.mz.member.dto.response.BadgeResponseDto;
import com.tripick.mz.member.dto.response.MemberResponseDto;
import com.tripick.mz.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{memberId}")
    public ResponseResult getMember(@PathVariable int memberId) {
        log.info("MemberController_getMember -> 사용자 정보 조회");
        MemberResponseDto memberResponseDto = memberService.getMemberById(memberId);
        return new SingleResponseResult<>(memberResponseDto);
    }

    @PatchMapping("/nickname")
    public ResponseResult updateNickname(@Valid @RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
        log.info("MemberController_updateNickname -> 사용자 닉네임 수정");
        memberService.updateNickname(updateNicknameRequestDto);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/update-profile-image")
    public ResponseResult updateImage(@RequestParam("files") List<MultipartFile> multipartFiles, @RequestParam("memberId") int memberId) {
        log.info("MemberController_updateImage -> 사용자 프로필 사진 수정");
        memberService.updateImage(multipartFiles, memberId);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/delete-profile-image/{memberId}")
    public ResponseResult deleteImage(@PathVariable int memberId) {
        log.info("MemberController_deleteImage -> 사용자 프로필 사진 삭제");
        memberService.deleteImage(memberId);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/update-main-badge")
    public ResponseResult setMainBadge(@RequestBody UpdateMainBadgeRequestDto updateMainBadgeRequestDto) {
        log.info("MemberController_setMainBadge -> 사용자 메인 뱃지 설정");
        memberService.updateMainBadge(updateMainBadgeRequestDto.getMemberId(), updateMainBadgeRequestDto.getBadgeId());
        return ResponseResult.successResponse;
    }

    @GetMapping("/badge/{memberId}")
    public ResponseResult getBadgeList(@PathVariable int memberId) {
        log.info("MemberController_getBadgeList -> 사용자 보유 뱃지 조회");
        List<BadgeResponseDto> badgeResponseDto = memberService.getBadgeList(memberId);
        return new SingleResponseResult<>(badgeResponseDto);
    }
}