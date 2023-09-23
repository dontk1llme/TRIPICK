package com.tripick.mz.domain.record;
import com.tripick.mz.common.error.NotExistContentException;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.record.dto.request.CreateTripRecordRequestDto;
import com.tripick.mz.record.dto.request.UpdateTripRecordContentRequestDto;
import com.tripick.mz.record.entity.TripRecord;
import com.tripick.mz.record.entity.TripRecordImage;
import com.tripick.mz.record.repository.TripRecordImageRepository;
import com.tripick.mz.record.repository.TripRecordRepository;
import com.tripick.mz.member.repository.MemberRepository;
import com.tripick.mz.record.service.implement.RecordServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class RecordServiceImplTest {

    @InjectMocks
    private RecordServiceImpl recordService;

    @Mock
    private TripRecordRepository tripRecordRepository;

    @Mock
    private TripRecordImageRepository tripRecordImageRepository;

    @Mock
    private MemberRepository memberRepository;

    @Test
    void getTripRecordsByMemberIdTest() {
        Member mockMember = mock(Member.class);
        TripRecord mockTripRecord = mock(TripRecord.class);
        TripRecordImage mockTripRecordImage = mock(TripRecordImage.class);

        when(memberRepository.findById(anyInt())).thenReturn(Optional.of(mockMember));
        when(tripRecordRepository.findByMember(mockMember)).thenReturn(Collections.singletonList(mockTripRecord));
        when(tripRecordImageRepository.findByTripRecordTripRecordId(anyInt())).thenReturn(Collections.singletonList(mockTripRecordImage));

        recordService.getTripRecordsByMemberId(1);

        verify(memberRepository, times(1)).findById(anyInt());
        verify(tripRecordRepository, times(1)).findByMember(any());
        verify(tripRecordImageRepository, times(1)).findByTripRecordTripRecordId(anyInt());
    }

    @Test
    void createTripRecordTest() {
        Member mockMember = mock(Member.class);
        CreateTripRecordRequestDto mockRequest = new CreateTripRecordRequestDto();

        when(memberRepository.findById(anyInt())).thenReturn(Optional.of(mockMember));

        recordService.createTripRecord(mockRequest);

        verify(memberRepository, times(1)).findById(anyInt());
        verify(tripRecordRepository, times(1)).save(any());
    }

    @Test
    void deleteTripRecordTest() {
        TripRecord mockTripRecord = mock(TripRecord.class);

        when(tripRecordRepository.findById(anyInt())).thenReturn(Optional.of(mockTripRecord));

        recordService.deleteTripRecord(1);

        verify(tripRecordRepository, times(1)).findById(anyInt());
        verify(tripRecordRepository, times(1)).delete(any());
        verify(tripRecordImageRepository, times(1)).findByTripRecordTripRecordId(anyInt());
        verify(tripRecordImageRepository, times(1)).deleteAll(any());
    }

    @Test
    void updateTripRecordContentTest_exception() {
        TripRecord mockTripRecord = mock(TripRecord.class);
        UpdateTripRecordContentRequestDto mockRequest = new UpdateTripRecordContentRequestDto();
        mockRequest.setTripRecordId(1); // 예시 ID
        mockRequest.setContent(null); // content를 null로 설정

        when(tripRecordRepository.findById(anyInt())).thenReturn(Optional.of(mockTripRecord));

        assertThrows(NotExistContentException.class, () -> {
            recordService.updateTripRecordContent(mockRequest);
        });
    }

    @Test
    void updateTripRecordContentTest_success() {
        TripRecord mockTripRecord = mock(TripRecord.class);
        UpdateTripRecordContentRequestDto mockRequest = new UpdateTripRecordContentRequestDto();
        mockRequest.setTripRecordId(1);
        mockRequest.setContent("기록 내용");

        when(tripRecordRepository.findById(anyInt())).thenReturn(Optional.of(mockTripRecord));

        recordService.updateTripRecordContent(mockRequest);

        verify(tripRecordRepository, times(1)).findById(anyInt());
        verify(mockTripRecord, times(1)).updateTripRecordContent(anyString());
    }

    @Test
    void deleteTripRecordImageTest() {
        TripRecordImage mockTripRecordImage = mock(TripRecordImage.class);

        when(tripRecordImageRepository.findById(anyInt())).thenReturn(Optional.of(mockTripRecordImage));

        recordService.deleteTripRecordImage(1);

        verify(tripRecordImageRepository, times(1)).findById(anyInt());
        verify(tripRecordImageRepository, times(1)).delete(any());
    }
}
