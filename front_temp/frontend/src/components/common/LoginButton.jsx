import React, { Component, useState, useRef, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import LoginModal from "./LoginModal";
import styled from 'styled-components';
import * as utils from 'utils';
import * as hooks from 'hooks';

const LoginButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    
    const { memberId, setMemberId, nickname, setNickname, email, setEmail, 
      profileImage, setProfileImage, createdAt, setCreatedAt, setAccessToken } = hooks.loginUserState();

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
      setAccessToken('');
      localStorage.clear()
      navigate(utils.URL.HOME.LANDING);
    }

    useEffect(()=>{
      console.log(memberId, nickname, email, profileImage, createdAt);
  },[])

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
