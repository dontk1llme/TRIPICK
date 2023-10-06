package com.tripick.mz.auth.service;

import com.tripick.mz.auth.dto.request.LogoutReqDto;
import com.tripick.mz.auth.dto.request.MemberDeleteReqDto;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.exception.CredentialNotFoundException;
import com.tripick.mz.member.exception.MemberNotFoundException;
import com.tripick.mz.member.repository.CredentialRepository;
import com.tripick.mz.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final CredentialRepository credentialRepository;

    @Transactional
    public void logout(LogoutReqDto logoutReqDto){
        Member member = memberRepository.findByMemberId(
                logoutReqDto.getMemberId()).orElseThrow(MemberNotFoundException::new);

        Credential credential = credentialRepository.findByCredentialId(
                member.getCredential().getCredentialId()).orElseThrow(CredentialNotFoundException::new);

        credential.updateRefreshToken(null);
        log.info("{} 님의 로그아웃 요청이 정상적으로 처리되었습니다.", member.getNickname());
    }

    @Transactional
    public void deleteMember(MemberDeleteReqDto memberDeleteReqDto){
        Member member = memberRepository.findByMemberId(
                memberDeleteReqDto.getMemberId()).orElseThrow(MemberNotFoundException::new);

        Credential credential = credentialRepository.findByCredentialId(
                member.getCredential().getCredentialId()).orElseThrow(CredentialNotFoundException::new);

        credentialRepository.deleteCredentialByCredentialId(member.getCredential().getCredentialId());
        memberRepository.deleteMemberByMemberId(member.getMemberId());
        log.info("{} 님의 회원 탈퇴가 완료되었습니다.", member.getNickname());
    }

}
