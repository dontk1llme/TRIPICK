import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

import { AiFillSafetyCertificate } from 'react-icons/ai';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { LiaChevronDownSolid, LiaChevronUpSolid } from 'react-icons/lia';
import * as hooks from 'hooks';

const LocationCard = ({ locationData, navigateToCalendar, handleScrollToNext, handleScrollToTop, last }) => {
    const { image_url, name, country, exchange, climate, crime } = locationData;

    return (
        <S.LocationContainer>
            <S.LeftContainer>
                <div>
                    <S.Image src={image_url} alt={name} />
                </div>
            </S.LeftContainer>
            <S.RightContainer>
                <S.ColumnComponent>
                    <br></br>
                    <br></br>
                    <S.MoreInformation>
                        더 알아보기 <FaArrowAltCircleRight />
                    </S.MoreInformation>
                    <br></br>
                    <p>
                        <S.Title>{name}</S.Title>
                        <S.SubTitle1> {country}</S.SubTitle1>
                    </p>
                </S.ColumnComponent>
                <S.ColumnComponent>
                    <S.SubTitle1>
                        <BiMoneyWithdraw style={{ color: '#8390FA' }} /> {exchange}/ 원 <br></br>
                    </S.SubTitle1>
                    <S.SubTitle1>
                        <TiWeatherPartlySunny style={{ color: '#8390FA' }} /> {climate && locationData.climate.temp_avg}
                        °C <br></br>
                    </S.SubTitle1>
                    <S.SubTitle1>
                        <AiFillSafetyCertificate style={{ color: '#8390FA' }} /> {crime} / 10
                    </S.SubTitle1>
                </S.ColumnComponent>
                <S.ColumnComponent>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <S.Button onClick={navigateToCalendar}>날짜 선택하고 여행지 추천받기</S.Button>
                    <br></br>
                    <br></br>
                    {!last ? (
                        <S.SubTitle2 onClick={handleScrollToNext}>
                            <span>scroll </span>
                            <span>
                                <LiaChevronDownSolid></LiaChevronDownSolid>
                            </span>
                        </S.SubTitle2>
                    ) : (
                        <S.SubTitle2 onClick={handleScrollToTop}>
                            <span>top</span>
                            <span>
                                <LiaChevronUpSolid />
                            </span>
                        </S.SubTitle2>
                    )}
                    <br></br>
                    <br></br>
                </S.ColumnComponent>
            </S.RightContainer>
        </S.LocationContainer>
    );
};

const S = {
    WholeContainer: styled.div`
        overflow-y: scroll; /* 세로 스크롤 가능한 컨테이너로 설정 */
        scroll-snap-type: y mandatory; /* 세로 방향 스크롤 스냅을 활성화하고 필수로 설정 */
        height: 100vh; /* 컨테이너의 높이 설정 (화면 높이에 맞게 조절) */
        weight: 95vw;
        overflow-x: hidden;
    `,

    LocationContainer: styled.div`
        display: flex;
        // width: 981.6px;
        // height: 757.60px;
        width: 100vw;
        height: 100vh;
        scroll-snap-align: start;
    `,

    LeftContainer: styled.div`
        position: relative;
        flex: 60%;
        height: 100vh;
    `,
    RightContainer: styled.div`
        flex: 40%;
        display: flex;
        flex-direction: column;
    `,
    ColumnComponent: styled.div`
        padding-left: 80px;
        padding-right: 80px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center; /* 세로 중앙 정렬 */
        align-items: left; /* 가로 왼쪽 정렬 */
    `,
    MoreInformation: styled.div`
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.main1};
        &:hover {
            opacity: 0.8;
        }
    `,
    Title: styled.div`
        font-size: ${({ theme }) => theme.fontSize.title2};
        margin-bottom: 8px;
    `,
    SubTitle1: styled.span`
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        line-height: 1.5; /* 행간을 설정하세요. 예: 1.5는 폰트 크기의 1.5배 */
        margin: 5px;
    `,
    SubTitle2: styled.span`
        display: flex;
        flex-direction: column;
        color: ${({ theme }) => theme.color.main1};
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSize.subTitle2};

        &:hover {
            opacity: 0.8;
        }
    `,

    Image: styled.img`
        // width: 900px;
        // height: 690px;
        width: 100%; /* 부모 요소인 LeftContainer에 꽉 차도록 설정 */
        height: 100vh;
        position: absolute; /* absolute 포지션 설정 */
        top: 0;
        left: 0; //toptab으로 못 넘어감. . .
    `,
    Button: styled.button`
        background-color: ${({ theme }) => theme.color.main2};
        color: white;
        border: none;
        border-radius: 15px;
        padding: 10px 10px;
        width: 400px; /* 너비를 400px로 설정합니다 */
        height: 60px; /* 높이를 60px로 설정합니다 */
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 10px;
        &:hover {
            background-color: #6e7bc7;
        }
    `,
};

export default LocationCard;
