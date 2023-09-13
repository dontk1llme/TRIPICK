import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import { GiShoppingCart } from 'react-icons/gi';

const LocationPreview = ({ place }) => {
    const { compareLocation, setCompareLocation } = hooks.cartState();
    const handleCompareLocation = id => {
        const placeIndex = compareLocation.indexOf(id);

        if (placeIndex === -1) {
            const indexOfMinusOne = compareLocation.indexOf(-1);
            if (indexOfMinusOne !== -1) {
                compareLocation[indexOfMinusOne] = id;
            } else {
                alert('비교함이 가득찼습니다. ');
            }
        } else {
            compareLocation[placeIndex] = -1;
        }
        setCompareLocation([...compareLocation]);
    };

    return (
        <S.Wrap>
            <S.PreviewImage image={place.imageUrl}>
                <S.CountryName>{place.country}</S.CountryName>
                <S.CityContainer>
                    {place.city}
                    <S.HeartContainer>{place.cart ? <GoHeartFill /> : <GoHeart />}</S.HeartContainer>
                </S.CityContainer>
            </S.PreviewImage>
            <S.PreviewInformationContainer>
                <S.InformationContainer>
                    <S.InformationTitle>예상 날씨</S.InformationTitle>
                    <S.InformationContent>{place.estimatedClimate}도</S.InformationContent>
                </S.InformationContainer>
                <S.InformationContainer>
                    <S.InformationTitle>예상 환율</S.InformationTitle>
                    <S.InformationContent>{place.estimatedExchangeRate}원 </S.InformationContent>
                    <S.InformationDescription>/{place.currency}</S.InformationDescription>
                </S.InformationContainer>
                <S.InformationContainer>
                    <S.InformationTitle>안전 지수</S.InformationTitle>
                    <S.InformationContent>{place.safety} </S.InformationContent>
                    <S.InformationDescription>/10</S.InformationDescription>
                </S.InformationContainer>
                <S.CompareContainer
                    onClick={() => {
                        handleCompareLocation(place.id);
                    }}
                    compare={compareLocation.indexOf(place.id)}>
                    <GiShoppingCart />
                </S.CompareContainer>
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
            color: ${({ compare, theme }) => (compare === -1 ? theme.color.main1 : theme.color.highlight)};
        }
        &:hover {
            & svg {
                color: ${({ theme }) => theme.color.main2};
            }
        }
    `,
};

export default LocationPreview;
