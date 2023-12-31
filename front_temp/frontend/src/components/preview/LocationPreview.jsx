import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as api from 'api';
import * as hooks from 'hooks';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

import { GoHeartFill, GoHeart } from 'react-icons/go';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const LocationPreview = ({ place, type }) => {
    const {
        memberId
    } = hooks.loginUserState();

    const { cartLocation, setCartLocation, compareLocation, setCompareLocation } = hooks.cartState();
    const { detailLocation, setDetailLocation, setViewDetail } = hooks.detailState();
    const { view, setView, message, setMessage, response, setResponse, type: modalType, setType } = hooks.modalState();
    const [currentPlace, setCurrentPlace] = useState(null);
    const navigate = useNavigate();

    const handleCompareLocation = data => {
        if(compareLocation.indexOf(data) !== -1) {
            setView(true);
            setMessage('이미 비교함에 담은 일정입니다. ');
            setType('warning');
        } else {
            if(compareLocation[0] !== -1 && compareLocation[1] !== -1) {
                setView(true);
                setMessage('비교함이 가득 찼습니다. ');
                setType('warning');
            } else {
                if(compareLocation[0] !== -1) {
                    const updatedCompareLocation = [...compareLocation];
                    updatedCompareLocation[1] = data;
                    setCompareLocation(updatedCompareLocation);
    
                    setView(true);
                    setMessage('비교함으로 이동하시겠습니까?');
                    setType('query');
                } else {
                    const updatedCompareLocation = [...compareLocation];
                    updatedCompareLocation[0] = data;
                    setCompareLocation(updatedCompareLocation);
                }
            }
        }
    };

    const handleCartLocation = place => {
        const placeIndex = cartLocation.indexOf(place);

        if (!view && placeIndex === -1) {
            const tripDetail = {
                uuid: place.uuid,
                memberId: memberId,
                city: place.name,
                country: place.country,
                startDate: place.start_date,
                endDate: place.end_date,
                traveler: place.traveler,
                exchangeRate: place.exchange,
                imageUrl: place.image_url,
                minimumTemperature: place.climate.temp_min,
                averageTemperature: place.climate.temp_avg,
                maximumTemperature: place.climate.temp_max,
                priceIndex: place.price,
                crimeRate: place.crime
            }
    
            api.apis
                .pickTripRequest(tripDetail)
                .then()
                .catch(error => console.log(error));

            setCartLocation([...cartLocation, place]);
            setView(true);
            setMessage('보관함에 추천 여행지를 담았습니다. ');
            setType('checking');
        } else if (!view && placeIndex !== -1) {
            setMessage('보관함에서 여행지를 삭제하시겠습니까?');
            setView(true);
            setType('query');
            setCurrentPlace(place);

            api.apis
                .removeTripRequest(place.uuid)
                .then()
                .catch(error => console.log(error));
        }
    };

    useEffect(() => {
        if (modalType === 'query' && currentPlace && message === '보관함에서 여행지를 삭제하시겠습니까?') {
            if (response === 'yes') {
                const updatedCartLocation = cartLocation.filter(cart => cart !== currentPlace);
                setCartLocation([...updatedCartLocation]);
                setType('');
                setMessage('');
                setResponse('');
                setCurrentPlace(null);
            } else if (response === 'no') {
                setView(false);
                setType('');
                setMessage('');
                setResponse('');
                setCurrentPlace(null);
            }
        }
        
        if (modalType === 'checking' && message === '보관함에 추천 여행지를 담았습니다. ') {
            if (response === 'yes') {
                setType('');
                setMessage('');
                setResponse('');
            }
        }
    }, [modalType, response, currentPlace]);

    useEffect(() => {
        if (response === 'yes' && message === '비교함으로 이동하시겠습니까?') {
            navigate(utils.URL.CART.COMPARE);
            setResponse('');
            setMessage('');
            setType('');
        } else if (response === 'yes' && message === '이미 비교함에 담은 일정입니다. ') {
            setView(false);
            setResponse('');
            setMessage('');
            setType('');
        } else if (response === 'no') {
            setView(false);
            setResponse('');
            setMessage('');
            setType('');
        }
    }, [response]);

    const handleDetails = place => {
        setDetailLocation(place);
        if (detailLocation) {
            setViewDetail(true);
        }
    };

    return (
        <S.Wrap onClick={() => handleDetails(place)}>
            <S.PreviewImage image={place.image_url}>
                <S.CountryName>{place.country}</S.CountryName>
                <S.CityContainer>
                    {place.name}
                    <S.HeartContainer
                        onClick={e => {
                            e.stopPropagation();
                            handleCartLocation(place);
                        }}>
                        {cartLocation.indexOf(place) !== -1 ? <GoHeartFill /> : <GoHeart />}
                    </S.HeartContainer>
                </S.CityContainer>
            </S.PreviewImage>
            <S.PreviewInformationContainer>
                <S.InformationContainer>
                    <S.InformationTitle>예상 날씨</S.InformationTitle>
                    {/* 지금 없음. */}
                    <S.InformationContent>{place.climate && place.climate.temp_avg}°C</S.InformationContent> 
                </S.InformationContainer>
                <S.InformationContainer>
                    <S.InformationTitle>예상 환율</S.InformationTitle>
                    <S.InformationContent>{place.exchange}원 </S.InformationContent>
                    {/* <S.InformationDescription>/{place.estimatedExchangeRate}</S.InformationDescription> */}
                    {/* 화폐 단위가 없음 */}
                </S.InformationContainer>
                <S.InformationContainer>
                    <S.InformationTitle>안전 지수</S.InformationTitle>
                    <S.InformationContent>{place.crime} </S.InformationContent>
                    <S.InformationDescription>/10</S.InformationDescription>
                </S.InformationContainer>
                {type === 'cart' && (
                    <S.CompareContainer
                        onClick={e => {
                            e.stopPropagation();
                            // handleCompareLocation(place.uuid);
                            handleCompareLocation(place);
                        }}>
                        {compareLocation.indexOf(place) === -1 ? <AiOutlineStar /> : <AiFillStar />}
                        <S.ExplanatoryContainer className={compareLocation.indexOf(place) === -1 ? 'compare' : null}>
                            비교함 담기
                        </S.ExplanatoryContainer>
                    </S.CompareContainer>
                )}
            </S.PreviewInformationContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        height: auto;
        width: 330px;
        margin: 0 28px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        cursor: pointer;
        
    `,
    PreviewImage: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 16px;
        width: 330px;
        height: 304px;
        background-image: url(${props => props.image});
        background-size: cover;
    `,
    CountryName: styled.div`
        color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.fontSize.content1};
    `,
    CityContainer: styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
        align-items: end;
        font-size: ${({ theme }) => theme.fontSize.title3};
        font-weight: bold;
        color: ${({ theme }) => theme.color.white};
    `,
    HeartContainer: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 20px;
        height: 100%;
        & svg {
            color: ${({ theme }) => theme.color.white};
            width: 20px;
            height: 20px;
        }
        &:hover {
            & svg {
                color: ${({ theme }) => theme.color.main1};
            }
        }
    `,
    PreviewInformationContainer: styled.div`
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-between;
        width: 330px;
        height: 188px;
        padding: 32px 16px;
        background-color: ${({ theme }) => theme.color.white};
    `,
    InformationContainer: styled.div`
        display: flex;
        width: 100%;
        height: 20px;
    `,
    InformationTitle: styled.div`
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.black};
        margin-right: 32px;
    `,
    InformationContent: styled.div`
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        font-weight: bold;
        color: ${({ theme }) => theme.color.main1};
    `,
    InformationDescription: styled.div`
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.main1};
    `,
    CompareContainer: styled.div`
        position: absolute;
        bottom: 16px;
        right: 16px;
        width: auto;
        height: auto;
        cursor: pointer;
        & svg {
            width: 20px;
            height: 20px;
            color: ${({ theme }) => theme.color.main1};
        }
        &:hover {
            & svg {
                color: ${({ theme }) => theme.color.main2};
            }
            & > .compare {
                width: auto;
                height: 33px;
                padding: 0 20px;
                background-color: rgba(94, 97, 86, 0.8);
                transition: all 0.2s ease-in-out;
            }
        }
    `,
    ExplanatoryContainer: styled.div`
        width: 0px;
        height: 0px;
        position: absolute;
        top: 16px;
        left: 10px;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.sub};
        color: ${({ theme }) => theme.color.white};
        white-space: nowrap;
        z-index: 3;
    `,
};

export default LocationPreview;
