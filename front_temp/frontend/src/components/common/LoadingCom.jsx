import React from "react";
import styled from 'styled-components';
import loadingGif from '../../asset/images/loading.gif';

const loadingCom = () => {

    return (
      <>
      <S.Wrap>
        <S.Loading
            src={loadingGif}
        />
      </S.Wrap>
        
      </>
    );
  }

  const S = {
    Wrap: styled.div`
        width: 100vw;
        height: 80vh;
    `,
    Loading: styled.img`
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  `,

}


export default loadingCom;
