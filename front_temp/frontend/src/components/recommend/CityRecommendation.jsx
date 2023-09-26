import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import * as hooks from 'hooks';
import * as components from 'components';
import * as api from 'api';

const CityRecommendation = () => {
    const [selectedFilter, setSelectedFilter] = useState(1);
    const { totalRecommendation, currencyRecommendation, weatherRecommendation, safetyRecommendation, 
        setTotalRecommendation, setCurrencyRecommendation, setWeatherRecommendation, setSafetyRecommendation } =
        hooks.recommendationState();

    // 날짜 받기
    const { selectedDate } = hooks.dateState();
    const formatDate = date => {
        return moment(date).format('YYYY-MM-DD');
    };
    const startDate = formatDate(selectedDate[0])
    const endDate = formatDate(selectedDate[1])

    //추천 데이터 받기
    useEffect(() => {
        api.apis
            .getDateRecommendations(startDate, endDate)
            .then(response => {
                console.log(response.data);
                setTotalRecommendation(Object.values(response.data.recommendation_total));
                setCurrencyRecommendation(Object.values(response.data.recommendation_exchange));
                setWeatherRecommendation(Object.values(response.data.recommendation_climate));
                setSafetyRecommendation(Object.values(response.data.recommendation_crime));
                console.log(totalRecommendation)
            })
            .catch(error => console.log(error));
    }, []);


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
        max-width: 70%;
        margin-top: 24px;
        grid-template-columns: repeat(auto-fit, minmax(330px, calc(100% / 3 - 32px * 2 / 3)));
        grid-gap: 32px;
    `,
    // PreviewContainer: styled.div`
    //     margin-bottom: 40px;
    //     width: 90%;
    //     height: auto;
    //     display: grid;
    //     grid-template-columns: repeat(auto-fit, minmax(330px, calc(100% / 3 - 32px * 2 / 3)));
    //     grid-gap: 32px;
    // `,
};

export default CityRecommendation;
