import React from 'react';
import styled from 'styled-components';

import { IoChevronBack } from 'react-icons/io5';

const Compare = () => {
    return (
        <S.Wrap>
            <S.TitleContainer>
                <S.BackToCart>
                    <IoChevronBack />
                    찜한 여행지
                </S.BackToCart>
                <S.Title>여행지 비교</S.Title>
                <S.Space></S.Space>
            </S.TitleContainer>
            <S.CompareContainer>
                <S.CityContainer></S.CityContainer>
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
        justify-content: space-evenly;
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
        width: 100%;
        height: 100%;
        display: flex;
    `,
    CityContainer: styled.div`
        width: 668px;
        height: 100%;
        display: flex;
    `,
};

export default Compare;
