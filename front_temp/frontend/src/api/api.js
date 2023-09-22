import axios from 'axios';
import * as utils from 'utils';
import * as hooks from 'hooks';

export const instance = axios.create({
    baseURL: utils.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
    },
});

// // 로그인
// instance.interceptors.request.use(
//     function (config) {
//         const accessToken = hooks.getCookie('Authorization');
//         config.headers['Authorization'] = accessToken;
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     },
// );

export const apis = {
    
    getMbtiResult: 
};
