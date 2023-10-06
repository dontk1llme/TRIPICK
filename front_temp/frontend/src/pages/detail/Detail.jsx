import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { useNavigate } from 'react-router-dom';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import { IoChevronBack } from 'react-icons/io5';

const Detail = () => {
    const { detailLocation, setDetailLocation } = hooks.detailState();
    const navigate = useNavigate();

    const handleBack = () => {
        setDetailLocation({});
        navigate(-1);
    };

    return (
        <S.Wrap>
            <S.ImageContainer image={detailLocation.imageUrl}>
                <S.BackContainer onClick={handleBack}>
                    <IoChevronBack />
                </S.BackContainer>
                <S.CountryName>{detailLocation.country}</S.CountryName>
                <S.CityName>{detailLocation.city}</S.CityName>
                <S.CartContainer>{detailLocation.cart ? <GoHeartFill /> : <GoHeart />}</S.CartContainer>
            </S.ImageContainer>
            <S.InformationContainer>
                <S.InformationBox className="type1"></S.InformationBox>
                <S.InformationBox className="type2"></S.InformationBox>
                <S.InformationBox className="type1"></S.InformationBox>
                <S.InformationBox className="type1"></S.InformationBox>
                <S.InformationBox className="type2"></S.InformationBox>
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
        & .type1 {
            flex-grow: 140;
        }
        & .type2 {
            flex-grow: 213;
        }
        &:last-child {
            margin-right: 0px;
        }
    `,
    InformationBox: styled.div`
        display: flex;
        flex-direction: column;
        padding: 16px;
        height: 100%;
        background-color: ${({ theme }) => theme.color.white};
        color: ${({ theme }) => theme.color.black};
        border-radius: 8px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        margin-right: 16px;
    `,
};

export default Detail;
