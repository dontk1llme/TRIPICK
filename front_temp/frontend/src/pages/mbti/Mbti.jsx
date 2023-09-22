import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import * as hooks from 'hooks';

const Mbti = () => {
    const navigate = useNavigate();
    const { setAnswers, setResult } = hooks.mbtiState();
    useEffect(() => {
        setAnswers([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        // setResult('');
    }, []);
    return (
        <S.Wrap>
            <S.SubTitle>내 성격에 맞는 여행지는 어디일까?</S.SubTitle>
            <S.Title>여행지 성격 테스트</S.Title>
            <S.ImageContainer>
                <img src={require('asset/images/mbti-main.png').default} alt="panda" />
            </S.ImageContainer>
            <S.Button onClick={() => navigate(utils.URL.MBTI.TEST)}>테스트 시작하기</S.Button>
        </S.Wrap>
    );
};

const move = keyframes`
50% {
    top: 10px;
}
    100%{
        top: 0px;
    }
`;

const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100vh;
        padding: 84px 330px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `,
    SubTitle: styled.div`
        font-size: ${({ theme }) => theme.fontSize.title3};
        color: ${({ theme }) => theme.color.black};
        white-space: nowrap;
        margin-bottom: 16px;
    `,
    Title: styled.div`
        font-size: ${({ theme }) => theme.fontSize.title1};
        color: ${({ theme }) => theme.color.black};
        white-space: nowrap;
    `,

    ImageContainer: styled.div`
        width: 351px;
        height: 351px;
        position: relative;
        & > img {
            position: absolute;
            height: auto;
            top: 0px;
            left: 0px;
            max-width: 420px;
            animation: ${move} 1s 1s infinite;
        }
    `,
    Button: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
        width: 410px;
        height: 64px;
        cursor: pointer;
        border-radius: 16px;
        background-color: ${({ theme }) => theme.color.main2};
        color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        box-shadow: ${({ theme }) => theme.shadow.card};
        &:hover {
            background-color: ${({ theme }) => theme.color.main3};
        }
    `,
};

export default Mbti;
