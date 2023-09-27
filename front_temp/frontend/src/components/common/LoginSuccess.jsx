import React, { useEffect } from 'react';

import * as api from 'api';

const LoginSuccess = () => {
    useEffect(() => {
        console.log('다시');
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            api.apis
                .createLoginRequest(code)
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.error(error));
        }
    }, []);
    return <div></div>;
};

export default LoginSuccess;
