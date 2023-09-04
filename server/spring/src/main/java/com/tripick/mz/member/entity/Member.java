package com.tripick.mz.member.entity;

import com.tripick.mz.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
@Table(name = "member")
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @OneToOne
    @JoinColumn(name = "credential_id")
    private Credential credential;

    @NotNull
    private String profileImage;

    @NotNull
    @Column(length = 20)
    private String nickname;
}
