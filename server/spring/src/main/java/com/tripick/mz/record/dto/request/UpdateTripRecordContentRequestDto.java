package com.tripick.mz.record.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTripRecordContentRequestDto {

    @NotNull
    private int tripRecordId;

    @NotBlank
    private String content;
}
