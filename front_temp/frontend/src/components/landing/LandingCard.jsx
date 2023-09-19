import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import { TopTab } from 'components';

import {AiFillSafetyCertificate} from 'react-icons/ai';
import {BiMoneyWithdraw} from 'react-icons/bi';
import {TiWeatherPartlySunny} from 'react-icons/ti';
import {FaArrowAltCircleRight} from 'react-icons/fa';
import {LiaChevronDownSolid} from 'react-icons/lia';

import { Header, SectionsContainer, Section} from 'react-fullpage';

import * as hooks from 'hooks';

const LandingCard = ({ location }) => {
    const { landingLocation } = hooks.landingState();
    const location1 = landingLocation[0];
    const location2 = landingLocation[1];
    const location3 = landingLocation[2];

    const navigate = useNavigate();

    // scroll 처음부터 다시 해야 함
    // 섹션 여러 개 안 하고 자연스레 0 1 2 3 하는 방법은 없나. . . 일단 3개니까 상관없긴 한데
    let options = {
        activeClass:          'active', // the class that is appended to the sections links
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
        arrowNavigation:      true, // use arrow keys
        className:            'SectionContainer', // the class name for the section container
        delay:                1000, // the scroll animation speed
        navigation:           true, // use dots navigatio
        scrollBar:            false, // use the browser default scrollbar
        sectionClassName:     'Section', // the section class name
        sectionPaddingTop:    '0px', // the section top padding
        sectionPaddingBottom: '0', // the section bottom padding
        verticalAlign:        false, // align the content of each section vertical
        // autoScrolling: false
      };
        
      // SectionsContainer 태그로 전체를 감싸고 개별 페이지는 Section 태그 사용
      return (
        <SectionsContainer {...options}>
          <Section>Page 1
            <S.Image src={location1.imageUrl} alt={location1.city} />
            
          </Section>
          <Section>Page 2
            <S.Image src={location2.imageUrl} alt={location2.city} />
          </Section>
          <Section>Page 3
            <S.Image src={location3.imageUrl} alt={location3.city} />
          </Section>
        </SectionsContainer>)

    


    // return (
    //     <S.LocationContainer >
    //         {/* <Header><TopTab></TopTab></Header> */}
    //         <SectionsContainer {...options} style={{width: '970px'}}>
    //                 <Section>
    //                     <S.LeftContainer>
    //                         <div>
    //                             <S.Image src={location1.imageUrl} alt={location1.city} />
    //                         </div>
    //                     </S.LeftContainer>
    //                     <S.RightContainer>
    //                             <S.ColumnComponent>
    //                                 <S.SubTitle2  style={{color:'#8390FA', cursor: 'pointer',}}>더 알아보기 <FaArrowAltCircleRight /> </S.SubTitle2>
    //                                 <br></br>
    //                                 <p>
    //                                     <S.Title>{location1.city}</S.Title> 
    //                                     <S.SubTitle1> {location1.country}</S.SubTitle1>
    //                                 </p>
    //                             </S.ColumnComponent>
    //                             <S.ColumnComponent>
    //                                 <S.SubTitle1><BiMoneyWithdraw style={{color: '#8390FA'}}/> {location1.estimatedExchangeRate} {location1.currency} / 원 <br></br></S.SubTitle1>
    //                                 <S.SubTitle1><TiWeatherPartlySunny style={{color: '#8390FA' }}/> {location1.estimatedClimate}°C <br></br></S.SubTitle1>
    //                                 <S.SubTitle1><AiFillSafetyCertificate style={{color: '#8390FA' }}/> {location1.safety} / 10</S.SubTitle1>
    //                             </S.ColumnComponent>
    //                             <S.ColumnComponent>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <S.Button onClick={() => navigate(utils.URL.RECOMMEND.CALENDAR)}>
    //                                     {/* 나중엔 로그인 여부도 따져야 할 듯? */}
    //                                     날짜 선택하고 여행지 추천받기
    //                                 </S.Button>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <S.SubTitle2 style={{color: '#8390FA', paddingLeft: '170px'}}> 
    //                                     <span>scroll </span> <br></br>
    //                                     <span style= {{paddingLeft: '17px'}}><LiaChevronDownSolid ></LiaChevronDownSolid></span>
    //                                 </S.SubTitle2>
    //                             </S.ColumnComponent>
    //                     </S.RightContainer>
    //                 </Section>
    //                 <Section>
    //                     <S.LeftContainer>
    //                         <div>
    //                             <S.Image src={location2.imageUrl} alt={location2.city} />
    //                         </div>
    //                     </S.LeftContainer>
    //                     <S.RightContainer>
    //                             <S.ColumnComponent>
    //                                 <S.SubTitle2  style={{color:'#8390FA', cursor: 'pointer',}}>더 알아보기 <FaArrowAltCircleRight /> </S.SubTitle2>
    //                                 <br></br>
    //                                 <p>
    //                                     <S.Title>{location2.city}</S.Title> 
    //                                     <S.SubTitle1> {location2.country}</S.SubTitle1>
    //                                 </p>
    //                             </S.ColumnComponent>
    //                             <S.ColumnComponent>
    //                                 <S.SubTitle1><BiMoneyWithdraw style={{color: '#8390FA'}}/> {location2.estimatedExchangeRate} {location2.currency} / 원 <br></br></S.SubTitle1>
    //                                 <S.SubTitle1><TiWeatherPartlySunny style={{color: '#8390FA' }}/> {location2.estimatedClimate}°C <br></br></S.SubTitle1>
    //                                 <S.SubTitle1><AiFillSafetyCertificate style={{color: '#8390FA' }}/> {location2.safety} / 10</S.SubTitle1>
    //                             </S.ColumnComponent>
    //                             <S.ColumnComponent>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <S.Button onClick={() => navigate(utils.URL.RECOMMEND.CALENDAR)}>
    //                                     {/* 나중엔 로그인 여부도 따져야 할 듯? */}
    //                                     날짜 선택하고 여행지 추천받기
    //                                 </S.Button>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <S.SubTitle2 style={{color: '#8390FA', paddingLeft: '170px'}}> 
    //                                     <span>scroll </span> <br></br>
    //                                     <span style= {{paddingLeft: '17px'}}><LiaChevronDownSolid ></LiaChevronDownSolid></span>
    //                                 </S.SubTitle2>
    //                             </S.ColumnComponent>
    //                     </S.RightContainer>
    //                 </Section>
    //                 <Section>
    //                     <S.LeftContainer>
    //                         <div>
    //                             <S.Image src={location3.imageUrl} alt={location3.city} />
    //                         </div>
    //                     </S.LeftContainer>
    //                     <S.RightContainer>
    //                             <S.ColumnComponent>
    //                                 <S.SubTitle2  style={{color:'#8390FA', cursor: 'pointer',}}>더 알아보기 <FaArrowAltCircleRight /> </S.SubTitle2>
    //                                 <br></br>
    //                                 <p>
    //                                     <S.Title>{location3.city}</S.Title> 
    //                                     <S.SubTitle1> {location3.country}</S.SubTitle1>
    //                                 </p>
    //                             </S.ColumnComponent>
    //                             <S.ColumnComponent>
    //                                 <S.SubTitle1><BiMoneyWithdraw style={{color: '#8390FA'}}/> {location3.estimatedExchangeRate} {location3.currency} / 원 <br></br></S.SubTitle1>
    //                                 <S.SubTitle1><TiWeatherPartlySunny style={{color: '#8390FA' }}/> {location3.estimatedClimate}°C <br></br></S.SubTitle1>
    //                                 <S.SubTitle1><AiFillSafetyCertificate style={{color: '#8390FA' }}/> {location3.safety} / 10</S.SubTitle1>
    //                             </S.ColumnComponent>
    //                             <S.ColumnComponent>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <S.Button onClick={() => navigate(utils.URL.RECOMMEND.CALENDAR)}>
    //                                     {/* 나중엔 로그인 여부도 따져야 할 듯? */}
    //                                     날짜 선택하고 여행지 추천받기
    //                                 </S.Button>
    //                                 <br></br>
    //                                 <br></br>
    //                                 <S.SubTitle2 style={{color: '#8390FA', paddingLeft: '170px'}}> 
    //                                     <span>scroll </span> <br></br>
    //                                     <span style= {{paddingLeft: '17px'}}><LiaChevronDownSolid ></LiaChevronDownSolid></span>
    //                                 </S.SubTitle2>
    //                             </S.ColumnComponent>
    //                     </S.RightContainer>
    //                 </Section>
    //         </SectionsContainer>
    //     </S.LocationContainer>
    // );
};

const S = {
    LocationContainer: styled.div`
        display: flex;
        // width: 981.6px;
        // height: 757.60px;
        width: 100vw;
        height: 650px;
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
    Title: styled.span`
        font-size: ${({ theme }) => theme.fontSize.title2};
    `,
    SubTitle1: styled.span`
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        line-height: 1.5; /* 행간을 설정하세요. 예: 1.5는 폰트 크기의 1.5배 */
        margin: 5px;
    `,
    SubTitle2: styled.span`
    font-size: ${({ theme }) => theme.fontSize.subTitle2};
    &:hover {
        opacity: 0.8; 
      }
    `,

    Image: styled.img`
        // width: 900px;
        // height: 690px;
        width: 100%; /* 부모 요소인 LeftContainer에 꽉 차도록 설정 */
        height: 100%;
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

export default LandingCard;
