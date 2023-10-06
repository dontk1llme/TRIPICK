import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import { IoChevronBack, IoAdd, IoClose } from 'react-icons/io5';
import * as hooks from 'hooks';

const Compare = () => {
    const navigate = useNavigate();
    const [firstCity, setFirstCity] = useState('');
    const [secondCity, setSecondCity] = useState('');
    const { cartLocation, compareLocation, setCompareLocation } = hooks.cartState();

    useEffect(() => {
        if(compareLocation.length == 1) {
            setFirstCity(compareLocation[0]);
        }

        if(compareLocation.length == 2) {
            setFirstCity(compareLocation[0]);
            setSecondCity(compareLocation[1]);
        }
    }, []);

    const handleDeleteFirstComparison = () => {
        setFirstCity('');
    
        const updatedCompareLocation = [...compareLocation];
        updatedCompareLocation[0] = -1;
        setCompareLocation(updatedCompareLocation);
    };

    const handleDeleteSecondComparison = () => {
        setSecondCity('');

        const updatedCompareLocation = [...compareLocation];
        updatedCompareLocation[1] = -1;
        setCompareLocation(updatedCompareLocation);
    };
    return (
        <S.Wrap>
            <S.TitleContainer>
                <S.BackToCart onClick={() => navigate(utils.URL.CART.LIST)}>
                    <IoChevronBack />
                    찜한 여행지
                </S.BackToCart>
                <S.Title>여행지 비교</S.Title>
                <S.Space></S.Space>
            </S.TitleContainer>
            <S.CompareContainer>
                {compareLocation[0] === -1 ? (
                    <S.EmptyCityContainer direction="left" onClick={() => navigate(utils.URL.CART.LIST)}>
                        <IoAdd />
                        비교할 여행지를 추가하세요.
                    </S.EmptyCityContainer>
                ) : (
                    <S.CityContainer direction="left">
                        <S.HoverContainer className="hover">
                            <IoClose onClick={() => handleDeleteFirstComparison()} />
                        </S.HoverContainer>
                        <S.CityImage image={firstCity.image_url} direction="left">
                            <S.WeatherInformationContainer direction="left">
                                {/* <S.WeatherInformation>작년 평균 기온 몇도</S.WeatherInformation>
                                <S.WeatherInformation>일조시간 몇시간</S.WeatherInformation>
                                <S.WeatherInformation>뇌우일수 몇일</S.WeatherInformation>
                                <S.WeatherInformation>최대 일강수량 얼마</S.WeatherInformation> */}
                            </S.WeatherInformationContainer>
                            <S.DatePeriod>
                                {firstCity.start_date} ~ {firstCity.end_date}
                                {/* {firstCity.climate&&firstCity.climate.month} */}
                            </S.DatePeriod>
                            <S.CountryInformation>{firstCity.country}</S.CountryInformation>
                            <S.CityInformation>{firstCity.name}</S.CityInformation>
                        </S.CityImage>
                        <S.DataContainer>
                            <S.DataItemContainer>
                                {firstCity.exchange}원
                                {/* <S.SubDataContainer>/{firstCity.currency}</S.SubDataContainer> */}
                            </S.DataItemContainer>
                            <S.DataItemContainer>{firstCity.climate&&firstCity.climate.temp_avg}°C</S.DataItemContainer>
                            <S.DataItemContainer>{firstCity.crime}/10</S.DataItemContainer>
                            <S.DataItemContainer>{firstCity.traveler}명</S.DataItemContainer>
                            {/* <S.DataItemContainer className="ticket">
                                {' '}
                                {parseInt(firstCity.ticketPrice, 10).toLocaleString()}원
                            </S.DataItemContainer> */}
                        </S.DataContainer>
                    </S.CityContainer>
                )}
                <S.CompareItemContainer>
                    <S.CompareItem>예상 환율</S.CompareItem>
                    <S.CompareItem>예상 날씨</S.CompareItem>
                    <S.CompareItem>안전지수</S.CompareItem>
                    <S.CompareItem>여행객 동향</S.CompareItem>
                    {/* <S.CompareItem>최저가 항공권</S.CompareItem> */}
                </S.CompareItemContainer>
                {compareLocation[1] === -1 ? (
                    <S.EmptyCityContainer direction="right" onClick={() => navigate(utils.URL.CART.LIST)}>
                        <IoAdd />
                        비교할 여행지를 추가하세요.
                    </S.EmptyCityContainer>
                ) : (
                    <S.CityContainer direction="right">
                        <S.HoverContainer className="hover">
                            <IoClose onClick={() => handleDeleteSecondComparison()} />
                        </S.HoverContainer>
                        <S.DataContainer>
                            <S.DataItemContainer>
                                {secondCity.exchange}원
                                {/* <S.SubDataContainer>/{firstCity.currency}</S.SubDataContainer> */}
                            </S.DataItemContainer>
                            <S.DataItemContainer>{secondCity.climate&&secondCity.climate.temp_avg}°C</S.DataItemContainer>
                            <S.DataItemContainer>{secondCity.crime}/10</S.DataItemContainer>
                            <S.DataItemContainer>{secondCity.traveler}명</S.DataItemContainer>
                            {/* <S.DataItemContainer className="ticket">
                                {' '}
                                {parseInt(firstCity.ticketPrice, 10).toLocaleString()}원
                            </S.DataItemContainer> */}
                        </S.DataContainer>
                        <S.CityImage image={secondCity.image_url} direction="left">
                            <S.WeatherInformationContainer direction="left">
                                {/* <S.WeatherInformation>작년 평균 기온 몇도</S.WeatherInformation>
                                <S.WeatherInformation>일조시간 몇시간</S.WeatherInformation>
                                <S.WeatherInformation>뇌우일수 몇일</S.WeatherInformation>
                                <S.WeatherInformation>최대 일강수량 얼마</S.WeatherInformation> */}
                            </S.WeatherInformationContainer>
                            <S.DatePeriod>
                                {firstCity.start_date} ~ {firstCity.end_date}
                                {/* {secondCity.climate&&secondCity.climate.month} */}
                            </S.DatePeriod>
                            <S.CountryInformation>{secondCity.country}</S.CountryInformation>
                            <S.CityInformation>{secondCity.name}</S.CityInformation>
                        </S.CityImage>
                    </S.CityContainer>
                )}
            </S.CompareContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin: 60px 0px;
    `,
    BackToCart: styled.div`
        align-self: flex-end;
        width: 134px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &svg {
            width: 12px;
            height: 20px;
            color: ${({ theme }) => theme.color.black};
        }
        color: ${({ theme }) => theme.color.black};
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        white-space: nowrap;
        &:hover {
            & svg {
                color: ${({ theme }) => theme.color.main1};
            }
            color: ${({ theme }) => theme.color.main1};
        }
    `,
    Space: styled.div`
        width: 118px;
    `,
    TitleContainer: styled.div`
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 40px;
        margin: 32px 0;
        display: flex;
    `,
    Title: styled.div`
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.title3};
        color: ${({ theme }) => theme.color.black};
        white-space: nowrap;
    `,
    CompareContainer: styled.div`
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: calc(100vh - 171px);
        display: flex;
    `,
    EmptyCityContainer: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        width: 100%;
        height: 100%;
        box-shadow: ${({ theme }) => theme.shadow.card};
        border-radius: ${({ direction }) => (direction === 'left' ? '0 8px 8px 0' : '8px 0 0 8px')};
        background-color: ${({ theme }) => theme.color.white};
        transition: transform 0.3s ease;
        &:hover {
            color: ${({ theme }) => theme.color.main1};
            & svg {
                color: ${({ theme }) => theme.color.main1};
            }
            transform: translateY(-5px);
        }

        & svg {
            width: 56px;
            height: 56px;
            color: ${({ theme }) => theme.color.gray};
            margin-bottom: 32px;
        }
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.gray};
    `,
    CompareItemContainer: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: auto;
        height: 100%;
    `,
    CompareItem: styled.div`
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ theme }) => theme.color.black};
        white-space: nowrap;
        padding: 0 9px;
    `,
    CityContainer: styled.div`
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 100%;
        height: 100%;
        &:hover {
            & .hover {
                width: 100%;
                height: 100%;
                border-radius: ${({ direction }) => (direction === 'left' ? '0 8px 8px 0' : '8px 0 0 8px')};
                z-index: 1;
            }
        }
    `,
    HoverContainer: styled.div`
        position: absolute;
        left: 0;
        top: 0;
        width: 0px;
        height: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: #5b55497c;
        & svg {
            height: 48px;
            width: 48px;
            color: ${({ theme }) => theme.color.white};
            &:hover {
                color: ${({ theme }) => theme.color.main1};
            }
        }
    `,
    CityImage: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: ${({ direction }) => (direction === 'left' ? 'flex-end' : 'flex-start')};
        width: 100%;
        height: 100%;
        margin: ${({ direction }) => (direction === 'left' ? '0 8px 0 0' : '0 0 0 8px')};
        background-image: url(${props => props.image});
        background-size: cover;
        padding: 32px;
    `,
    DataContainer: styled.div`
        display: flex;
        flex-direction: column;
        width: 160px;
        height: 100%;
        justify-content: space-between;
        & .ticket {
            font-size: ${({ theme }) => theme.fontSize.subTitle2};
        }
    `,
    DataItemContainer: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 160px;
        height: 100%;
        margin-top: 8px;
        &:first-child {
            margin-top: 0;
        }
        border-radius: 8px;
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        font-weight: bold;
        color: ${({ theme }) => theme.color.main1};
        background-color: ${({ theme }) => theme.color.white};
        box-shadow: ${({ theme }) => theme.shadow.card};
        white-space: nowrap;
    `,
    SubDataContainer: styled.div`
        align-self: flex-end;
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ theme }) => theme.color.main1};
        white-space: nowrap;
        margin-top: 4px;
    `,
    WeatherInformationContainer: styled.div`
        display: flex;
        flex-direction: column;
        width: 121px;
        height: 72px;
        justify-content: space-between;
        align-items: ${({ direction }) => (direction === 'left' ? 'flex-end' : 'flex-start')};
        margin-bottom: 8px;
    `,
    WeatherInformation: styled.div`
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ theme }) => theme.color.white};
        white-space: nowrap;
    `,
    DatePeriod: styled.div`
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.white};
        margin-bottom: 16px;
    `,
    CountryInformation: styled.div`
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        color: ${({ theme }) => theme.color.white};
        font-weight: bold;
        margin-bottom: 16px;
    `,
    CityInformation: styled.div`
        font-size: ${({ theme }) => theme.fontSize.title2};
        color: ${({ theme }) => theme.color.white};
        font-weight: bold;
    `,
};

export default Compare;
