package com.tripick.mz.member.controller;

import com.tripick.mz.common.response.ResponseResult;
import com.tripick.mz.common.response.SingleResponseResult;
import com.tripick.mz.member.dto.request.UpdateMainBadgeRequestDto;
import com.tripick.mz.member.dto.request.UpdateNicknameRequestDto;
import com.tripick.mz.member.dto.response.BadgeResponseDto;
import com.tripick.mz.member.dto.response.MemberResponseDto;
import com.tripick.mz.member.service.MemberService;
import lombok.RequiredArgsConstructor;
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
    public ResponseResult getMember(@PathVariable int memberId) {
        MemberResponseDto memberResponseDto = memberService.getMemberById(memberId);
        return new SingleResponseResult<>(memberResponseDto);
    }

    @PatchMapping("/nickname")
    public ResponseResult updateNickname(@Valid @RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
        memberService.updateNickname(updateNicknameRequestDto);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/update-profile-image")
    public ResponseResult updateImage(@RequestParam("files") List<MultipartFile> multipartFiles, @RequestParam("memberId") int memberId) {
        memberService.updateImage(multipartFiles, memberId);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/delete-profile-image")
    public ResponseResult deleteImage(int memberId) {
        memberService.deleteImage(memberId);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/update-main-badge")
    public ResponseResult setMainBadge(@RequestBody UpdateMainBadgeRequestDto updateMainBadgeRequestDto) {
        memberService.updateMainBadge(updateMainBadgeRequestDto.getMemberId(), updateMainBadgeRequestDto.getBadgeId());
        return ResponseResult.successResponse;
    }

    @GetMapping("/badge/{memberId}")
    public ResponseResult getBadgeList(@PathVariable int memberId) {
        List<BadgeResponseDto> badgeResponseDto = memberService.getBadgeList(memberId);
        return new SingleResponseResult<>(badgeResponseDto);
    }
}