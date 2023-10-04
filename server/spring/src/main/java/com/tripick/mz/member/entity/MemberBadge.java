package com.tripick.mz.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "member_badge")
public class MemberBadge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberBadgeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne
    @JoinColumn(name= "badge_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Badge badge;

    @NotNull
    private boolean achieved;

    @NotNull
    private int visitCount;

    @NotNull
    private LocalDateTime achievedDate;

    public void updateVisitCount() {
        this.visitCount++;
    }

    public void updateAchieved() {
        if(!this.achieved) {
            this.achievedDate = LocalDateTime.now();
        }

        this.achieved = true;
    }

}
