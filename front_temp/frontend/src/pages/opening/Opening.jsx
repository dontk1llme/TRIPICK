import React from 'react';
import styled from 'styled-components';
import * as components from 'components';
import * as hooks from 'hooks';
import img1 from '../../asset/images/opening1.gif'

const Opening = () => {

    return ( 
    <S.Wrap>
      <S.Image src={img1}></S.Image>
    </S.Wrap>);
};



const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        margin: 60px 0px;
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
};

export default Opening;
