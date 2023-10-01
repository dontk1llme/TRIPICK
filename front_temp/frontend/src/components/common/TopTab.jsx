import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as utils from 'utils';
import * as components from 'components';

const TopTab = () => {
    const navigate = useNavigate();

    return (
        <S.Wrap>
            <S.Logo onClick={() => navigate(utils.URL.HOME.LANDING)}>
                <img src={require('asset/images/logo.png').default} alt="logo" />
            </S.Logo>
            
            <S.ShortCut>
                {/* 로그인 안 한 경우 */}
                <components.LoginButton></components.LoginButton>
               
               {/* 로그인 한 경우 */}
               <S.Liked onClick={() => navigate(utils.URL.MYPAGE.DIARY)}>
                    <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M25.5 14C25.5 4.8 17.8333 2.5 14 2.5C4.8 2.5 2.5 10.1667 2.5 14C2.5 19.6 8 27.5 8 27.5L14 32.5L19.5 27.5C24.3 22.3 25.5 16.3333 25.5 14ZM9 14C8.66667 12.1667 9.2 8.5 14 8.5C15.6667 8.5 19 9.7 19 14.5C18.8333 15.8333 17.5 18.5 13.5 18.5C12 18.6667 9 18 9 14Z" 
                            fill="#8390FA" 
                            fill-opacity="0.16"/>
                        <path d="M14 7.50008C12.7414 7.50008 11.511 7.86664 10.4646 8.5534C9.41806 9.24017 8.60241 10.2163 8.12077 11.3583C7.63912 12.5004 7.5131 13.7571 7.75864 14.9695C8.00418 16.1819 8.61026 17.2955 9.50023 18.1696C10.3902 19.0437 11.5241 19.6389 12.7585 19.8801C13.9929 20.1213 15.2725 19.9975 16.4353 19.5244C17.5981 19.0514 18.5919 18.2503 19.2912 17.2225C19.9904 16.1947 20.3636 14.9863 20.3636 13.7501C20.3636 12.0925 19.6932 10.5028 18.4998 9.33068C17.3064 8.15856 15.6877 7.50008 14 7.50008ZM14 17.5002C13.2448 17.5002 12.5066 17.2802 11.8787 16.8682C11.2508 16.4561 10.7614 15.8704 10.4725 15.1852C10.1835 14.5 10.1079 13.746 10.2552 13.0185C10.4025 12.2911 10.7662 11.6229 11.3001 11.0985C11.8341 10.574 12.5145 10.2169 13.2551 10.0722C13.9958 9.92746 14.7635 10.0017 15.4612 10.2856C16.1588 10.5694 16.7552 11.05 17.1747 11.6667C17.5943 12.2834 17.8182 13.0084 17.8182 13.7501C17.8182 14.7447 17.4159 15.6985 16.6999 16.4018C15.9838 17.1051 15.0126 17.5002 14 17.5002ZM14 0C10.2883 0.00413556 6.72975 1.45413 4.10515 4.03189C1.48056 6.60964 0.00421071 10.1046 0 13.7501C0 18.6564 2.30841 23.8565 6.68182 28.7894C8.64694 31.0184 10.8587 33.0256 13.2761 34.7738C13.4901 34.921 13.7451 35 14.0064 35C14.2676 35 14.5226 34.921 14.7366 34.7738C17.1496 33.0248 19.357 31.0177 21.3182 28.7894C25.6852 23.8565 28 18.6564 28 13.7501C27.9958 10.1046 26.5194 6.60964 23.8948 4.03189C21.2702 1.45413 17.7117 0.00413556 14 0ZM14 32.1878C11.3702 30.1566 2.54545 22.6955 2.54545 13.7501C2.54545 10.7664 3.75227 7.90491 5.90041 5.79511C8.04856 3.6853 10.9621 2.50003 14 2.50003C17.0379 2.50003 19.9514 3.6853 22.0996 5.79511C24.2477 7.90491 25.4545 10.7664 25.4545 13.7501C25.4545 22.6924 16.6298 30.1566 14 32.1878Z" 
                        fill="#8390FA"/>
                    </svg>
               </S.Liked>
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
                fill-opacity: 1;
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
