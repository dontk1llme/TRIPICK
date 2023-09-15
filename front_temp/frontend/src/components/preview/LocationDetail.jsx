import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';

import { GoHeartFill, GoHeart } from 'react-icons/go';
import { IoChevronBack } from 'react-icons/io5';

const LocationDetail = () => {
    const { detailLocation, setDetailLocation, viewDetail, setViewDetail } = hooks.detailState();

    const handleView = () => {
        setDetailLocation({});
        setViewDetail(false);
    };

    return (
        <S.Wrap>
            <S.ImageContainer image={detailLocation.imageUrl}>
                <S.BackContainer onClick={handleView}>
                    <IoChevronBack />
                </S.BackContainer>
                <S.CountryName>{detailLocation.country}</S.CountryName>
                <S.CityName>{detailLocation.city}</S.CityName>
                <S.CartContainer>{detailLocation.cart ? <GoHeartFill /> : <GoHeart />}</S.CartContainer>
            </S.ImageContainer>
            <S.InformationContainer>
                <S.InformationBox className="type1">
                    <S.InfromationTitle>예상 환율</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.estimatedExchangeRate}원</S.InformationContent>
                    <S.SubInformation className="currency">/{detailLocation.currency}</S.SubInformation>
                </S.InformationBox>
                <S.InformationBox className="type2">
                    <S.InfromationTitle>예상 날씨</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.estimatedClimate}°C</S.InformationContent>
                    <S.SubInformation className="first">작년 평균 기온 몇도</S.SubInformation>
                    <S.SubInformation>일조시간 몇시간</S.SubInformation>
                    <S.SubInformation>뇌우일수 몇일</S.SubInformation>
                    <S.SubInformation>최대 일강수량 얼마</S.SubInformation>
                </S.InformationBox>
                <S.InformationBox className="type1">
                    <S.InfromationTitle>안전지수</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.safety}</S.InformationContent>
                </S.InformationBox>
                <S.InformationBox className="type1">
                    <S.InfromationTitle>여행객 동향</S.InfromationTitle>
                    <S.InformationContent>{detailLocation.estimated_traveler}</S.InformationContent>
                </S.InformationBox>
                <S.InformationBox className="type2">
                    <S.InfromationTitle>최저가 항공권</S.InfromationTitle>
                    <S.InformationContent>
                        {parseInt(detailLocation.ticketPrice, 10).toLocaleString()}원
                    </S.InformationContent>

                    <S.SubInformation className="first">
                        <a href="https://www.skyscanner.co.kr/" target="_blank" rel="noopener noreferrer">
                            스카이스캐너 바로가기
                        </a>
                    </S.SubInformation>
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
