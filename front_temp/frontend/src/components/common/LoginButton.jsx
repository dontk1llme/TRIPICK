import React, { Component, useState, useRef } from "react";
import LoginModal from "./LoginModal";
import styled from 'styled-components';

const LoginButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
      <>
        <div>
            <S.Logo onClick={showModal}>로그인</S.Logo>
            {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
        </div>
      </>
    );
  }
  const S = {
    Logo: styled.div`
        width: auto;
        height: auto;
        cursor: pointer;
        & > img {
            width: auto;
            max-height: 32px;
        }
    `,
};

export default LoginButton;
