package com.tripick.mz.record.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CreateTripRecordImageRequestDto {

    private int tripRecordId;

    private List<MultipartFile> images;
}
