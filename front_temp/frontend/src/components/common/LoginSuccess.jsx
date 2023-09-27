import React, { useEffect } from 'react';

import * as api from 'api';
import { useGoogleLogin } from '@react-oauth/google';

const LoginSuccess = () => {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            api.apis
                .createLoginRequest(code)
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.error(error));
        }
        if (codeResponse){
            api.apis.createGoogleLoginRequest(codeResponse).then(response => {
                console.log(response);
            })
            .catch(error => console.error(error));
        }
    }, []);
    return <div></div>;
};

export default LoginSuccess;
