import React, { Component, useState, useRef } from "react";
import LoginModal from "./LoginModal";
import styled from 'styled-components';
import * as hooks from 'hooks';

const LoginButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    
    const { memberId, setMemberId, nickname, setNickname, email, setEmail, 
      profileImage, setProfileImage, createdAt, setCreatedAt } = hooks.loginUserState();

    const showModal = () => {
        setModalOpen(true);
    };

    const logout = () => {
      //back에 MemberId, accesstoken 보내고 나서 
      setMemberId(-1);
      setNickname('');
      setEmail('');
      setProfileImage('');
      setCreatedAt('');
    }

    return (
      <>
         <div>
            {memberId === -1 ? (
              <S.Logo onClick={showModal}>로그인</S.Logo>
            ) : (
              <S.Logo onClick={logout}>로그아웃</S.Logo>
            )}
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
