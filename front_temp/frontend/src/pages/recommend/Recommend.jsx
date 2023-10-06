import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as components from 'components';
import * as hooks from 'hooks';
import moment from 'moment';
import { BsCalendarCheck } from 'react-icons/bs';

const Recommend = () => {
    const { selectedDate } = hooks.dateState();
    const { viewDetail, setViewDetail } = hooks.detailState();
    const [dateSelectMode, setDateSelectMode] = useState(true);
    const [loading, setLoading] = useState(false); // 추가: 로딩 상태

    const formatDate = date => {
        return moment(date).format('YYYY년 MM월 DD일');
    };

    useEffect(() => {
        setViewDetail(false);
    }, []);

    const handleRecommendClick = () => {
        setLoading(true); // 로딩 시작
        setDateSelectMode(false); // dateSelectMode를 false로 설정
        setTimeout(() => {
            setLoading(false); // 3초 후 로딩 종료
        }, 3000); // 3초 대기
    };

    return (
        <S.Outer>
            {!viewDetail ? (
                <S.Wrap>
                    <S.SelectedDateContainer>
                        <S.SelectedDate onClick={() => setDateSelectMode(true)}>
                            <BsCalendarCheck />
                            {formatDate(selectedDate[0])}
                            {selectedDate[1] != selectedDate[0] ? ' - ' + formatDate(selectedDate[1]) : ''}
                        </S.SelectedDate>
                    </S.SelectedDateContainer>
                    {dateSelectMode && <components.Calendar />}
                    {dateSelectMode && (
                        <S.RecommendButton onClick={handleRecommendClick}>
                            이 날짜로 여행지 추천받기
                        </S.RecommendButton>
                    )}
                    {/* 로딩 중일 때 */}
                    {loading && <components.LoadingCom />}
                    {/* 로딩이 끝나면 */}
                    {!loading && !dateSelectMode && <components.CityRecommendation />}
                </S.Wrap>
            ) : (
                <components.LocationDetail />
            )}
        </S.Outer>
    );
};

// 나머지 코드는 동일


const S = {
    Outer: styled.div`
        width: 100%;
        height: 100%;
        overflow: hidden;
    `,
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: calc(100vh - 60px);
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center; /* 세로 중앙 정렬 */
        margin: 60px 0px;
    `,
    SelectedDateContainer: styled.div`
        display: flex;
        width: 100%;
        height: auto;
        justify-content: center;
        align-items: center;
    `,
    SelectedDate: styled.div`
        width: auto;
        height: auto;
        white-space: nowrap;
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSize.title3};
        color: ${({ theme }) => theme.color.black};
        & svg {
            width: 30px;
            height: 30px;
            margin-right: 16px;
            color: ${({ theme }) => theme.color.main1};
            cursor: pointer;
            &:hover {
                color: ${({ theme }) => theme.color.main2};
            }
        }
    `,
    RecommendButton: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 410px;
        height: 64px;
        border-radius: 16px;
        background-color: ${({ theme }) => theme.color.main1};
        color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        cursor: pointer;
        &:hover {
            background-color: ${({ theme }) => theme.color.main2};
        }
    `,
};
export default Recommend;
