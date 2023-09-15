package com.tripick.mz.record.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class CreateTripRecordRequestDto {
    @NotNull
    private int memberId;

    private String nationName;

    @NotBlank
    private String content;

}
