import React, { useState } from 'react';
import styled from 'styled-components';
import img1 from '../../asset/images/opening1.gif';

const Opening = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Wrap onClick={handleClick}>
      <S.BoxLeft isOpen={isOpen}>
        {/* 좌측 박스 내용 */}
      </S.BoxLeft>
      <S.Image src={img1} />
      <S.BoxRight isOpen={isOpen}>
        {/* 우측 박스 내용 */}
      </S.BoxRight>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    transition: all 1s ease-in-out; /* 애니메이션 효과를 부드럽게 적용 */
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
  `,
  BoxLeft: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.isOpen ? '0' : '50%')}; /* isOpen 상태에 따라 너비 변경 */
    height: 100%;
    background-color: #212121;
    opacity: ${(props) => (props.isOpen ? '0' : '0.8')}; /* isOpen 상태에 따라 투명도 변경 */
    z-index: 99999;
    transition: all 1s ease-in-out; /* 애니메이션 효과를 부드럽게 적용 */
  `,
  BoxRight: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: ${(props) => (props.isOpen ? '0' : '50%')}; /* isOpen 상태에 따라 너비 변경 */
    height: 100%;
    background-color: #212121;
    opacity: ${(props) => (props.isOpen ? '0' : '0.8')}; /* isOpen 상태에 따라 투명도 변경 */
    z-index: 99999;
    transition: all 1s ease-in-out; /* 애니메이션 효과를 부드럽게 적용 */
  `,
};

export default Opening;
