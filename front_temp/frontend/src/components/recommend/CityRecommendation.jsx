import React, { useState } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import * as components from 'components';

const CityRecommendation = () => {
    const [selectedFilter, setSelectedFilter] = useState(1);
    const { totalRecommendation, currencyRecommendation, weatherRecommendation, safetyRecommendation } =
        hooks.recommendationState();
    return (
        <S.Wrap>
            <S.FilterContainer>
                <S.FilterButton
                    onClick={() => setSelectedFilter(1)}
                    className={selectedFilter === 1 ? 'selected' : null}>
                    통합 추천
                </S.FilterButton>
                <S.FilterButton
                    onClick={() => setSelectedFilter(2)}
                    className={selectedFilter === 2 ? 'selected' : null}>
                    낮은 환율
                </S.FilterButton>
                <S.FilterButton
                    onClick={() => setSelectedFilter(3)}
                    className={selectedFilter === 3 ? 'selected' : null}>
                    좋은 날씨
                </S.FilterButton>
                <S.FilterButton
                    onClick={() => setSelectedFilter(4)}
                    className={selectedFilter === 4 ? 'selected' : null}>
                    안전 제일
                </S.FilterButton>
            </S.FilterContainer>
            <S.RecommendationContainer>
                {selectedFilter === 1 &&
                    totalRecommendation.map(location => {
                        return <components.LocationPreview key={location.idx} place={location} type="recommend" />;
                    })}
                {selectedFilter === 2 &&
                    currencyRecommendation.map(location => {
                        return <components.LocationPreview key={location.idx} place={location} type="recommend" />;
                    })}
                {selectedFilter === 3 &&
                    weatherRecommendation.map(location => {
                        return <components.LocationPreview key={location.idx} place={location} type="recommend" />;
                    })}
                {selectedFilter === 4 &&
                    safetyRecommendation.map(location => {
                        return <components.LocationPreview key={location.idx} place={location} type="recommend" />;
                    })}
            </S.RecommendationContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        margin-top: 32px;
    `,
    FilterContainer: styled.div`
        display: flex;
        width: 552px;
        height: 48px;
        justify-content: space-between;
        & > .selected {
            color: ${({ theme }) => theme.color.white};
            background-color: ${({ theme }) => theme.color.main1};
            &:hover {
                color: ${({ theme }) => theme.color.white};
                background-color: ${({ theme }) => theme.color.main2};
                border: 1px solid ${({ theme }) => theme.color.main2};
            }
        }
    `,
    FilterButton: styled.div`
        display: flex;
        width: 120px;
        height: 100%;
        padding: 15px 24px;
        justify-content: center;
        align-items: center;
        border: 1px solid ${({ theme }) => theme.color.main1};
        color: ${({ theme }) => theme.color.main1};
        background-color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.fontSize.content1};
        border-radius: 16px;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
            border: 1px solid ${({ theme }) => theme.color.main2};
            color: ${({ theme }) => theme.color.main2};
        }
    `,
    RecommendationContainer: styled.div`
        display: grid;
        max-width: 80%;
        margin-top: 24px;
        grid-template-columns: repeat(3, minmax(330px, 1fr));
        grid-gap: 32px;
    `,
};

export default CityRecommendation;
