import React, { useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import * as api from 'api';
import * as hooks from 'hooks';
import { useGoogleLogin } from '@react-oauth/google';
import { create } from 'lodash';

const LoginSuccess = () => {
    const navigate = useNavigate();
    // const [ memberId, setMemberId] = useState('');
    // const [ nickname, setNickname] = useState('');
    // const [ email, setEmail] = useState('');
    // const [ profileImage, setProfileImage] = useState('');
    // const [ createdAt, setCreatedAt] = useState('');

    const { memberId, setMemberId, nickname, setNickname, email, setEmail, 
        profileImage, setProfileImage, createdAt, setCreatedAt } = hooks.loginUserState();

    const { setLoginUser } = hooks.loginUserState();



    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            api.apis
                .createLoginRequest(code)
                .then(response => {
                    console.log(response);
                    //초기값 출력
                    console.log(memberId, nickname, email, profileImage, createdAt);
                    console.log(response.data.data.memberId);
                    console.log(response.data.data.nickname);

                    // response를 state에 저장
                    // set 안 되는 중. .. .
                    // setMemberId(response.data.data.memberId);
                    // setNickname(response.data.data.nickname);
                    // setEmail(response.data.data.email);
                    // setProfileImage(response.data.data.profileImage);
                    // setCreatedAt(response.data.data.createdAt);
                    setLoginUser(response.data.data);
                    console.log('어앵');
                    console.log(memberId, nickname, email, profileImage, createdAt);

                    // navigate(utils.URL.HOME.LANDING);
                })
                .catch(error => console.error(error));
        }
        
    }, []);

    return <div></div>;
};

export default LoginSuccess;
