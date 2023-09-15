import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';

import { GoHeartFill, GoHeart } from 'react-icons/go';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const LocationPreview = ({ place, type }) => {
    const { compareLocation, setCompareLocation } = hooks.cartState();
    const { detailLocation, setDetailLocation, setViewDetail } = hooks.detailState();

    const handleCompareLocation = id => {
        const placeIndex = compareLocation.indexOf(id);

        if (placeIndex === -1) {
            const indexOfMinusOne = compareLocation.indexOf(-1);
            if (indexOfMinusOne !== -1) {
                compareLocation[indexOfMinusOne] = id;
                if (indexOfMinusOne === 1) {
                    alert('이동하겠는지 여기서 물어보기');
                }
            } else {
                alert('비교함이 가득찼습니다. ');
            }
        } else {
            compareLocation[placeIndex] = -1;
        }
        setCompareLocation([...compareLocation]);
    };

    const handleDetails = () => {
        setDetailLocation(place);
        if (detailLocation) {
            setViewDetail(true);
        }
    };

    return (
        <S.Wrap onClick={() => handleDetails()}>
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
                {type === 'cart' && (
                    <S.CompareContainer
                        onClick={e => {
                            e.stopPropagation();
                            handleCompareLocation(place.id);
                        }}>
                        {compareLocation.indexOf(place.id) === -1 ? <AiOutlineStar /> : <AiFillStar />}
                        <S.ExplanatoryContainer className={compareLocation.indexOf(place.id) === -1 ? 'compare' : null}>
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
