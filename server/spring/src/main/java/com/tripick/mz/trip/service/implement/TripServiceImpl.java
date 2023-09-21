package com.tripick.mz.trip.service.implement;

import com.tripick.mz.trip.dto.request.PickTripRequestDto;
import com.tripick.mz.trip.dto.response.PickedTripResponseDto;
import com.tripick.mz.trip.entity.PickedTrip;
import com.tripick.mz.trip.repository.TripRepository;
import com.tripick.mz.trip.service.TripService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public void pick(PickTripRequestDto pickTripRequestDto) {
        log.info("TripServiceImpl_pick -> 여행 일정 찜 시도");

        tripRepository.save(
                PickedTrip.builder()
                        .city(pickTripRequestDto.getCity())
                        .country(pickTripRequestDto.getCountry())
                        .startDate(pickTripRequestDto.getStartDate())
                        .endDate(pickTripRequestDto.getEndDate())
                        .exchangeRate(pickTripRequestDto.getExchangeRate())
                        .priceIndex(pickTripRequestDto.getPriceIndex())
                        .traveler(pickTripRequestDto.getTraveler())
                        .climate(pickTripRequestDto.getClimate())
                        .crimeRate(pickTripRequestDto.getCrimeRate())
                        .flightFee(pickTripRequestDto.getFlightFee())
                        .memberId(pickTripRequestDto.getMemberId())
                        .activated(true)
                        .build()
        );
    }

    @Override
    public void removePickedTrip(String pickedTripId) {
        log.info("TripServiceImpl_removePickedTrip -> 여행 일정 찜 해제 시도");

        Query query = new Query();
        Update update = new Update();

        query.addCriteria(Criteria.where("_id").is(pickedTripId));
        update.set("activated", false);

        mongoTemplate.updateMulti(query, update, "picked_trip");
    }

    @Override
    public List<PickedTripResponseDto> getPickedTripList(String memberId) {
        log.info("TripServiceImpl_getPickedTripList -> 찜한 여행 일정 조회 시도");

        List<PickedTrip> pickedTripList = tripRepository.findByMemberIdAndActivated(memberId, true);

        return pickedTripList.stream()
                .map(pickedTrip -> PickedTripResponseDto.builder()
                    .id(pickedTrip.getId())
                    .city(pickedTrip.getCity())
                    .country(pickedTrip.getCountry())
                    .startDate(pickedTrip.getStartDate())
                    .endDate(pickedTrip.getEndDate())
                    .traveler(pickedTrip.getTraveler())
                    .exchangeRate(pickedTrip.getExchangeRate())
                    .priceIndex(pickedTrip.getPriceIndex())
                    .crimeRate(pickedTrip.getCrimeRate())
                    .flightFee(pickedTrip.getFlightFee())
                    .activated(pickedTrip.isActivated())
                    .build())
                .collect(Collectors.toList());
    }
}
