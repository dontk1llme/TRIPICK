package com.tripick.mz.domain.member;

import com.tripick.mz.member.dto.request.UpdateNicknameRequestDto;
import com.tripick.mz.member.entity.Badge;
import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.repository.BadgeRepository;
import com.tripick.mz.member.repository.MemberRepository;
import com.tripick.mz.member.service.implement.MemberServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@SpringBootTest
class MemberServiceImplTest {

    @InjectMocks
    private MemberServiceImpl memberService;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private BadgeRepository badgeRepository;

    @Test
    void testGetMemberById() {
        Member mockMember = mock(Member.class);
        Credential mockCredential = mock(Credential.class);
        when(mockMember.getCredential()).thenReturn(mockCredential);
        when(mockCredential.getEmail()).thenReturn("test@example.com");
        when(memberRepository.findById(anyInt())).thenReturn(Optional.of(mockMember));

        memberService.getMemberById(1);

        verify(memberRepository, times(1)).findById(anyInt());
    }


    @Test
    void testUpdateNickname() {
        Member mockMember = mock(Member.class);
        when(memberRepository.findById(anyInt())).thenReturn(Optional.of(mockMember));

        memberService.updateNickname(new UpdateNicknameRequestDto(1, "newNickname"));

        verify(mockMember, times(1)).updateNickname("newNickname");
    }

    @Test
    void testUpdateMainBadge() {
        Member mockMember = mock(Member.class);
        Badge mockBadge = mock(Badge.class);
        when(memberRepository.findById(anyInt())).thenReturn(Optional.of(mockMember));
        when(badgeRepository.findById(anyInt())).thenReturn(Optional.of(mockBadge));

        memberService.updateMainBadge(1, 10);

        verify(mockMember, times(1)).updateMainBadge(10);
    }

    @Test
    void testDeleteImage() {
        Member mockMember = mock(Member.class);
        when(memberRepository.findById(anyInt())).thenReturn(Optional.of(mockMember));

        String resultImageUrl = memberService.deleteImage(1);

        verify(mockMember, times(1)).updateProfileImage(anyString());
    }

}
