package com.tripick.mz.member.repository;

import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
  Optional<Member> findByCredential(Credential credential);
  Optional<Member> findByMemberId(int memberId);
  Optional<Member> deleteMemberByMemberId(int memberId);
}
