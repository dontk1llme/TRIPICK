import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as utils from 'utils';
import * as components from 'components';

const TopTab = () => {
    const navigate = useNavigate();

    return (
        <S.Wrap>
            <S.Logo onClick={() => navigate(utils.URL.HOME.MAIN)}>
                <img src={require('asset/images/logo.png').default} alt="logo" />
            </S.Logo>
            
            <S.ShortCut>
                <S.Logo onClick={() => navigate(utils.URL.MBTI.TEST)}>mbti</S.Logo>
                <components.LoginButton></components.LoginButton>
               
                <S.Liked onClick={() => navigate(utils.URL.CART.LIST)}>
                    <svg width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M26.7174 1C23.1413 1 20.0522 3.09475 18.5 6.15025C16.9478 3.09475 13.8587 1 10.2826 1C5.15435 1 1 5.29975 1 10.5917C1 15.8837 4.18043 20.7347 8.28913 24.7195C12.3978 28.7042 18.5 32.5 18.5 32.5C18.5 32.5 24.4043 28.7672 28.7109 24.7195C33.3065 20.404 36 15.8995 36 10.5917C36 5.284 31.8457 1 26.7174 1Z"
                            fill="#8390FA"
                            fillOpacity="0.16"
                        />
                        <path
                            d="M26.7174 1C23.1413 1 20.0522 3.09475 18.5 6.15025C16.9478 3.09475 13.8587 1 10.2826 1C5.15435 1 1 5.29975 1 10.5917C1 15.8837 4.18043 20.7347 8.28913 24.7195C12.3978 28.7042 18.5 32.5 18.5 32.5C18.5 32.5 24.4043 28.7672 28.7109 24.7195C33.3065 20.404 36 15.8995 36 10.5917C36 5.284 31.8457 1 26.7174 1Z"
                            stroke="#8390FA"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </S.Liked>
                <S.Profile onClick={() => navigate(utils.URL.MYPAGE.PASSPORT)}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 16C20.42 16 24 12.42 24 8C24 3.58 20.42 0 16 0C11.58 0 8 3.58 8 8C8 12.42 11.58 16 16 16ZM16 20C10.66 20 0 22.68 0 28V32H32V28C32 22.68 21.34 20 16 20Z"
                            fill="#8390FA"
                        />
                    </svg>
                </S.Profile>
            </S.ShortCut>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        width: 100vw;
        padding: 0 60px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        //배경 색깔
        // background-color: rgba(0, 0, 0, 0.05);
        // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05); 
    `,
    Logo: styled.div`
        width: auto;
        height: auto;
        cursor: pointer;
        & > img {
            width: auto;
            max-height: 32px;
        }
    `,
    ShortCut: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        // width: 99px; //두 개만 있었을 때
        // width: 150px; // 세 개
        width: 200px;
        height: 100%;
    `,
    Liked: styled.div`
        width: 30px;
        height: 30px;
        cursor: pointer;
        & svg {
            width: 100%;
            height: 100%;
        }

        &:hover {
            & path {
                fill: ${({ theme }) => theme.color.main1};
            }
        }
    `,
    Profile: styled.div`
        width: 28px;
        height: 28px;
        cursor: pointer;
        & svg {
            width: 100%;
            height: 100%;
            & path {
                fill: ${({ theme }) => theme.color.main1};
            }
        }
        &:hover {
            & path {
                fill: ${({ theme }) => theme.color.main2};
            }
        }
    `,
};

export default TopTab;
