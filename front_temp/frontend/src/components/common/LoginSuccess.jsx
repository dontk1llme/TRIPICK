import React, { useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import * as api from 'api';
import * as hooks from 'hooks';
import { useGoogleLogin } from '@react-oauth/google';
import { create } from 'lodash';

const LoginSuccess = () => {
    const navigate = useNavigate();

    const { memberId, setMemberId, nickname, setNickname, email, setEmail, 
        profileImage, setProfileImage, createdAt, setCreatedAt, accessToken, setAccessToken } = hooks.loginUserState();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            api.apis
                .createLoginRequest(code)
                .then(response => {
                    console.log(response);
                    //초기값 출력 -> 됨
                    console.log(memberId, nickname, email, profileImage, createdAt, accessToken);
                    console.log(response.data.data);
                    console.log(response.data);

                    // response를 state에 저장
                    setMemberId(response.data.data.memberId);
                    setNickname(response.data.data.nickname);
                    setEmail(response.data.data.email);
                    setProfileImage(response.data.data.profileImage);
                    setCreatedAt(response.data.data.createdAt);

                    setAccessToken(response.headers.accessToken);

                    navigate(utils.URL.HOME.LANDING);
                })
                .catch(error => console.error(error));
        }
        
    }, []);

    useEffect(()=>{
        console.log(memberId, nickname, email, profileImage, createdAt);
    },[memberId, nickname, email, profileImage, createdAt])

    return <div></div>;
};

export default LoginSuccess;
