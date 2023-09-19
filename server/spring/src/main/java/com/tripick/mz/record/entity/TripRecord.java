package com.tripick.mz.record.entity;

import com.tripick.mz.common.entity.BaseEntity;
import com.tripick.mz.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
@Table(name = "trip_record")
public class TripRecord extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tripRecordId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private String nationName;

    @OneToMany(mappedBy = "tripRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TripRecordImage> tripRecordImages;

    public void updateTripRecordContent(String content) {
        this.content = content;
    }
}
