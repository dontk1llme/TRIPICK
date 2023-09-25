import React, { useState } from 'react';
import styled from 'styled-components';
import img1 from '../../asset/images/opening1.gif';
import logo from '../../asset/images/logo.png';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

const Opening = ({ scrollContainerRef })  => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.overflowY = isOpen ? 'hidden' : 'scroll';
    }
  };

  return (
    <S.Wrap onClick={handleClick}>
      <S.BoxLeft isOpen={isOpen}>
      </S.BoxLeft>
      <S.Image src={img1} />
      <S.Logo
        src={logo}
        isOpen={isOpen}
      />
      <S.BoxRight isOpen={isOpen}>
      </S.BoxRight>
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
  Logo: styled.img`
    position: absolute;
    width: ${(props) => (props.isOpen ? '500px' : '0')}; 
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    transition: all 2s ease-in-out;
    &:hover {
      cursor: pointer;
    }
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
};

export default Opening;
