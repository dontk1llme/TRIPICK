import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

import SignKaKao from '../../asset/images/SignKaKao.png';
import SignGoogle from '../../asset/images/SignGoogle.png';
import { useGoogleLogin } from '@react-oauth/google';
import * as hooks from 'hooks';

import Coala from '../../asset/images/coala.png';

import * as api from 'api';

const LoginModal = ({ setModalOpen }) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    const { memberId, setMemberId, nickname, setNickname, email, setEmail, 
        profileImage, setProfileImage, createdAt, setCreatedAt, 
        accessToken, setAccessToken, mainStampId, setMainStampId } = hooks.loginUserState();

    const { stamp, setStamp } = hooks.stampState();

    ///////////// kakao ////////////////
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; //REST API KEY
    const redirect_uri = 'https://tripick.site/auth'; //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;


    const handleKakaoClick = async () => {
        window.location.href = kakaoURL;
    };

    ///////////// google ////////////////
    const handleGoogleClick = useGoogleLogin({
        onSuccess: codeResponse => {
            api.apis
                .createGoogleLoginRequest(codeResponse.code)
                .then(response => {
                    setMemberId(response.data.data.memberId);
                    setNickname(response.data.data.nickname);
                    setEmail(response.data.data.email);
                    setProfileImage(response.data.data.profileImage);
                    setCreatedAt(response.data.data.createdAt);
                
                    setMainStampId(response.data.data.mainBadge);
                    setStamp(response.data.data.memberBadgeList);

                    setAccessToken(response.headers[`access-token`]);
                    localStorage.setItem('token', response.headers[`access-token`]);
                })
                .catch(error => {
                    console.error('Error making API request:', error);
                });
        },
        flow: 'auth-code',
    });

    useEffect(()=>{
        if (memberId != -1){
            setModalOpen(false);
        }
    },[memberId, nickname, email, profileImage, createdAt, stamp, mainStampId])

    return (
        <S.modalWrapper>
            <S.modalOverlay onClick={closeModal} />
            <S.modalContent>
                <IoClose
                    style={{ position: 'absolute', right: '15px', top: '15px', cursor: 'pointer', fontSize: '24px' }}
                    onClick={closeModal}></IoClose>
                <img src={Coala} style={{ width: '50px', height: '50px' }} alt="Coala"></img>

                <S.textContainer>
                    <br />
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>로그인해서</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        <span style={{ color: '#8390FA', fontSize: '24px', fontWeight: 'bold' }}>트리픽</span>과 함께
                        떠나 봐요.
                    </p>
                </S.textContainer>

                <S.buttonContainer>
                    <S.googleButton onClick={handleGoogleClick}>
                        <img src={SignGoogle} alt="Sign with Google" style={{ width: '280px', height: '46px' }} />
                    </S.googleButton>
                    <S.kakaoButton onClick={handleKakaoClick}>
                        {' '}
                        <img src={SignKaKao} alt="Sign with Kakao" style={{ width: '280px', height: '46px' }} />
                    </S.kakaoButton>
                </S.buttonContainer>
            </S.modalContent>
        </S.modalWrapper>
    );
};

const S = {
    modalWrapper: styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    `,
    modalOverlay: styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5); /* 어두운 오버레이 스타일 */
    `,
    modalContent: styled.div`
        width: 400px;
        height: 560px;
        background-color: #fafafa;
        border-radius: 30px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        padding: 30px;
        position: relative;
    `,
    buttonContainer: styled.div`
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    `,
    kakaoButton: styled.button`
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    `,
    googleButton: styled.button`
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    `,
    textContainer: styled.div`
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
    `,
};

export default LoginModal;
