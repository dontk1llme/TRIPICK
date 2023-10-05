import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';

import { GoHeartFill, GoHeart } from 'react-icons/go';
import { IoChevronBack } from 'react-icons/io5';

const LocationDetail = () => {
    const { detailLocation, setDetailLocation, viewDetail, setViewDetail } = hooks.detailState();
    const { view, setView, message, setMessage, response, setResponse, type: modalType, setType } = hooks.modalState();
    const { cartLocation, setCartLocation } = hooks.cartState();


    const handleView = () => {
        setDetailLocation({});
        setViewDetail(false);
    };

    const handleCartLocation = () => {
        const placeIndex = cartLocation.indexOf(detailLocation);
        console.log(placeIndex);
        if (!view && placeIndex === -1) {
            setCartLocation([...cartLocation, detailLocation]);
            setView(true);
            setMessage('보관함에 추천 여행지를 담았습니다. ');
            setType('checking');
        } else if (!view && placeIndex !== -1) {
            console.log('보관함에서 삭제');
            setMessage('보관함에서 여행지를 삭제하시겠습니까?');
            setView(true);
            setType('query');
        }
    };

    useEffect(() => {
        if (modalType === 'query' && message === '보관함에서 여행지를 삭제하시겠습니까?') {
            if (response === 'yes') {
                const updatedCartLocation = cartLocation.filter(cart => cart !== detailLocation);
                setCartLocation([...updatedCartLocation]);
                setType('');
                setMessage('');
                setResponse('');
            } else if (response === 'no') {
                setView(false);
                setType('');
                setMessage('');
                setResponse('');
            }
        }
        if (modalType === 'checking' && message === '보관함에 추천 여행지를 담았습니다. ') {
            if (response === 'yes') {
                setType('');
                setMessage('');
                setResponse('');
            }
        }
    }, [modalType, response]);

    return (
        <S.Wrap>
            <S.ImageContainer image={detailLocation.image_url}>
                <S.BackContainer onClick={handleView}>
                    <IoChevronBack />
                </S.BackContainer>
                <S.CountryName>{detailLocation.country}</S.CountryName>
                <S.CityName>{detailLocation.name}</S.CityName>
                <S.CartContainer onClick={handleCartLocation}>
                    {cartLocation.indexOf(detailLocation) !== -1 ? <GoHeartFill /> : <GoHeart />}
                </S.CartContainer>
            </S.ImageContainer>
            <S.InformationContainer>
                <S.InformationBox className="type1">
                    <S.InfromationTitle>예상 환율</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.exchange}원</S.InformationContent>
                    {/* <S.SubInformation className="currency">/{detailLocation.currency}</S.SubInformation> */}
                </S.InformationBox>
                <S.InformationBox className="type2">
                    <S.InfromationTitle>예상 날씨</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.climate && detailLocation.climate.temp_avg}°C</S.InformationContent>
                    {/* <S.SubInformation>강수량: {detailLocation.climate && detailLocation.climate.rainy_days}</S.SubInformation> */}
                    <S.SubInformation>최고 기온: {detailLocation.climate && detailLocation.climate.temp_max}°C</S.SubInformation>
                    <S.SubInformation>최저 기온: {detailLocation.climate && detailLocation.climate.temp_min}°C</S.SubInformation>
                </S.InformationBox>
                <S.InformationBox className="type1">
                    <S.InfromationTitle>안전지수</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.crime}/10</S.InformationContent>
                </S.InformationBox>
                <S.InformationBox className="type1">
                    <S.InfromationTitle>여행객 동향</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.traveler}명</S.InformationContent>
                </S.InformationBox>
            </S.InformationContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 60px 0px;
    `,

    ImageContainer: styled.div`
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: flex-end;
        padding: 32px 24px;
        width: 908px;
        height: 481px;
        background-image: url(${({ image }) => image});
        background-size: cover;
        background-position: center;
    `,
    BackContainer: styled.div`
        position: absolute;
        top: -10px;
        left: -56px;
        & svg {
            width: 30px;
            height: 48px;
            color: ${({ theme }) => theme.color.black};
            &:hover {
                color: ${({ theme }) => theme.color.main1};
            }
        }
    `,
    CountryName: styled.div`
        display: flex;
        justify-content: flex-start;
        width: 100%;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        color: ${({ theme }) => theme.color.white};
        margin-bottom: 8px;
    `,
    CityName: styled.div`
        display: flex;
        justify-content: flex-start;
        width: 100%;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.title2};
        font-weight: bold;
        color: ${({ theme }) => theme.color.white};
    `,
    CartContainer: styled.div`
        position: absolute;
        bottom: 32px;
        right: 24px;
        & svg {
            width: 30px;
            height: 30px;
            color: ${({ theme }) => theme.color.white};
            &:hover {
                color: ${({ theme }) => theme.color.main1};
            }
        }
    `,
    InformationContainer: styled.div`
        display: flex;
        width: 908px;
        height: 160px;
        margin-top: 16px;
        & .type1 {
            flex-grow: 140;
        }
        & .type2 {
            flex-grow: 213;
        }
        & :last-child {
            margin-right: 0px;
        }
    `,
    InformationBox: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 16px;
        height: 100%;
        background-color: ${({ theme }) => theme.color.white};
        color: ${({ theme }) => theme.color.black};
        border-radius: 8px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        margin-right: 16px;
        & .currency {
            align-self: flex-start;
        }
        & .first {
            margin-top: auto;
        }
    `,
    InfromationTitle: styled.div`
        font-size: ${({ theme }) => theme.fontSize.content1};
        font-weight: bold;
        color: ${({ theme }) => theme.color.black};
        margin-bottom: 4px;
    `,
    InformationContent: styled.div`
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        font-weight: bold;
        color: ${({ theme }) => theme.color.main1};
        margin-bottom: 4px;
    `,
    SubInformation: styled.div`
        font-size: ${({ theme }) => theme.fontSize.sub};
        color: ${({ theme }) => theme.color.black};
        align-self: flex-end;
        margin: 2px 0;
        & > a {
            font: inherit;
            text-decoration: underline;
        }
    `,
};

export default LocationDetail;
