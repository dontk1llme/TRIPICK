import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as utils from 'utils';
import errorpanda from '../../asset/images/errorpanda.png';

const ErrorCom = () => {
    const navigate = useNavigate();

    return (
      <>
      <S.Wrap>
        <S.Img src={errorpanda}></S.Img>
        <br></br>
        <br></br>
        <br></br>
        <S.Title>404 Error</S.Title>
        <br></br>
        <S.Title2>페이지를 찾을 수 없습니다.</S.Title2>
        <br></br>
        <br></br>
        <S.MainButton onClick={() => navigate(utils.URL.HOME.LANDING)}>
            메인으로 돌아가기
        </S.MainButton>
      </S.Wrap>
        
      </>
    );
}

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 80vh;
        margin: 60px 0px;
    `,
    Title: styled.div`
        font-size: ${({ theme }) => theme.fontSize.title2};
    `,
    Title2: styled.div`
        font-size: ${({ theme }) => theme.fontSize.title3};
    `,
    Logo: styled.div`
        cursor: pointer;
        &:hover {
            color: ${({ theme }) => theme.color.main2};
        }
    `,
    Img: styled.img`
        width: 200px;
    `,
    MainButton: styled.div`
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
}

export default ErrorCom;
