package com.tripick.mz.member.entity;

import com.tripick.mz.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.engine.spi.CascadeStyle;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder(toBuilder = true)
@Table(name = "member")
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @OneToOne
    @JoinColumn(name = "credential_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Credential credential;

    @NotNull
    private String profileImage;

    @NotNull
    @Column(length = 20)
    private String nickname;

    @OneToMany(mappedBy = "member")
    private List<MemberBadge> memberBadgeList;

    @Column(nullable = true)
    private int mainBadge;

    //닉네임 수정
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    //프로필사진 수정
    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    // 대표 뱃지 수정
    public void updateMainBadge(int badgeId) {
        this.mainBadge = badgeId;
    }
}
