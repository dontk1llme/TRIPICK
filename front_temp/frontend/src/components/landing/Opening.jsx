import React, { useState } from 'react';
import styled from 'styled-components';
import img1 from '../../asset/images/opening1.gif';
import logo from '../../asset/images/logo.png';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

import ReactPlayer from 'react-player';
import { LiaChevronDownSolid } from 'react-icons/lia';


const Opening = ({ scrollContainerRef,handleScrollToNext })  => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.overflowY = isOpen ? 'hidden' : 'scroll';
    }
  };

  // const youtubeVideoUrl = 'https://www.youtube.com/watch?v=bGs4zSqJvYI'

  return (
    <S.Wrap onClick={handleClick}>
      <div style={{ position: 'absolute', top: '-150px', left: '0', width: '100%', height: '100%' }}>
        <ReactPlayer url='/video/aurora.mp4'
          playing={true} // 자동 재생
          muted={true}  // 소리 끄기
          width="100%"  // 전체 너비를 채움
          height="125.5%" // 전체 높이를 채움
          // style={{ width: 'calc(100% + 20px)', height: 'calc(100% + 20px)', margin: '-10px' }}
          style={{   overflow:'hidden'}}
          controls={false} // 컨트롤 바 숨김
        ></ReactPlayer>

      </div>

      
      <S.Logo
        src={logo}
        isOpen={isOpen}
      />
      <S.MBTI isOpen={isOpen} onClick={() => navigate(utils.URL.MBTI.TEST)}> 여행으로 알아보는 MBTI TEST </S.MBTI>
      <span>test</span>
      <S.SubTitle2 onClick={handleScrollToNext}>
        <span>scroll </span>
        <span>
            <LiaChevronDownSolid></LiaChevronDownSolid>
        </span>
      </S.SubTitle2>


      <S.BoxRight isOpen={isOpen}>
      </S.BoxRight>
      <S.BoxLeft isOpen={isOpen}>
      </S.BoxLeft>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
  `,
  Video: styled.video`
    width: 100vw;
    height: 100;
  `,
  Logo: styled.img`
    position: absolute;
    width: ${(props) => (props.isOpen ? '500px' : '0')};
    z-index: 1;
    top: 50%;
    left: ${(props) => (props.isOpen ? '25%' : '50%')}; 
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    transition: all 2.5s ease-in-out;
  `,
  MBTI: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 410px;
    height: 64px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.color.main1};
    color: ${({ theme }) => theme.color.white};
    font-size:  ${(props) => (props.isOpen ? '28px' : '0')};;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.color.main2};
    }

    position: absolute;
    width: ${(props) => (props.isOpen ? '500px' : '0')}; 
    z-index: 1;
    top: 50%;
    left: ${(props) => (props.isOpen ? '75%' : '50%')};
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    transition: all 2.5s ease-in-out;
  `,
  BoxLeft: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.isOpen ? '0' : '50%')};
    height: 100%;
    background-color: #212121;
    opacity: ${(props) => (props.isOpen ? '0' : '0.8')};
    z-index: 99999;
    transition: all 3s ease-in-out;
  `,
  BoxRight: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: ${(props) => (props.isOpen ? '0' : '50%')};
    height: 100%;
    background-color: #212121;
    opacity: ${(props) => (props.isOpen ? '0' : '0.8')};
    z-index: 99999;
    transition: all 3s ease-in-out;
  `,
  SubTitle2: styled.span`
        top: 0px;
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
};

export default Opening;
