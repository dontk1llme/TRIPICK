import React, { useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import * as api from 'api';
import * as hooks from 'hooks';
import { useGoogleLogin } from '@react-oauth/google';
import { create } from 'lodash';

const LoginSuccess = () => {
    const navigate = useNavigate();

    const { memberId, setMemberId, nickname, setNickname, email, setEmail, mainStampId,
        profileImage, setProfileImage, createdAt, setCreatedAt, accessToken, setAccessToken, setMainStampId, } = hooks.loginUserState();

        const { stamp, setStamp} = hooks.stampState();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            api.apis
                .createLoginRequest(code)
                .then(response => {
                    console.log(response);

                    // response를 state에 저장
                    setMemberId(response.data.data.memberId);
                    setNickname(response.data.data.nickname);
                    setEmail(response.data.data.email);
                    setProfileImage(response.data.data.profileImage);
                    setCreatedAt(response.data.data.createdAt);
                    setMainStampId(response.data.data.mainBadge);
                    setStamp(response.data.data.memberBadgeList);

                    setAccessToken(response.headers[`access-token`]);
                    console.log("흐음", response.headers);
                    localStorage.setItem('token', response.headers[`access-token`]);

                    navigate(utils.URL.HOME.LANDING);
                })
                .catch(error => console.error(error));
        }
        
    }, []);

    useEffect(()=>{
        console.log(memberId, nickname, email, profileImage, createdAt, stamp, mainStampId);
    },[memberId, nickname, email, profileImage, createdAt, stamp, mainStampId])

    return <div></div>;
};

export default LoginSuccess;
