import React, { Component, useState, useRef, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import LoginModal from "./LoginModal";
import styled from 'styled-components';
import * as utils from 'utils';
import * as hooks from 'hooks';
import * as api from 'api';
import { apis } from "api";

const LoginButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    
    const { memberId, setMemberId, nickname, setNickname, email, setEmail, 
      profileImage, setProfileImage, createdAt, setCreatedAt, accessToken, setAccessToken } = hooks.loginUserState();

    const showModal = () => {
        setModalOpen(true);
    };

    const logout = async() => {

      const data = {
        memberId: memberId,
        accessToken: accessToken,
      };

      //back에 MemberId, accesstoken 보내고 나서 
      await api.apis
        .deleteLoginUser(data)
        .then(response => {
          setMemberId(-1);
          setNickname('');
          setEmail('');
          setProfileImage('');
          setCreatedAt('');
          setAccessToken('');
          localStorage.clear();
          navigate(utils.URL.HOME.LANDING);
        })
        .catch(error => console.log(error));
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
