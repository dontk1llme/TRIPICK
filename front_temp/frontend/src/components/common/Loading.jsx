import React, { Component, useState, useRef } from "react";
import loadingGif from '../../asset/images/loading.gif';

const Loading = () => {

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
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        margin: 60px 0;
    `,
    Loading: styled.img`
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

}


export default Loading;
