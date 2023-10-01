package com.tripick.mz.member.repository;

import com.tripick.mz.auth.dto.response.MemberBadgeResDto;
import com.tripick.mz.member.entity.Badge;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.MemberBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberBadgeRepository extends JpaRepository<MemberBadge, Long> {
    @Query("SELECT new com.tripick.mz.auth.dto.response.MemberBadgeResDto(mb.badge, mb.achieved, mb.achievedDate, mb.visitCount) FROM MemberBadge mb WHERE mb.member.memberId = :#{#member.memberId}")
    List<MemberBadgeResDto> findByMemberWithoutMemberInfo(@Param("member") Member memebr);
}
