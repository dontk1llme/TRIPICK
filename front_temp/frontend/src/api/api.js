import axios from 'axios';
import * as utils from 'utils';
import * as hooks from 'hooks';

export const instance = axios.create({

    // baseURL: utils.API_BASE_URL,
    baseURL: 'https://tripick.site',
    // baseURL: '',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,  //response에 잇는 header 에서 뽑아서 여기에 넣기.
    },
});

export const apis = {
    getNowRecommendations: () => instance.get('/fastapi/recommendation/now'),
    getDateRecommendations: (startDate, endDate) =>
        instance.get(`fastapi/recommendation/set-date?startDate=${startDate}&endDate=${endDate}`),

    createRecord: data => instance.post('/api/record/create', data),
    getNationRecord: (memberId, nationName) => instance.get(`/api/record/${memberId}/nation/${nationName}`),
    getNations: memberId => instance.get(`/api/record/${memberId}`),
    saveImages: formData =>
        instance.post(`api/record/saveImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
    deleteAlbum: tripRecordId => instance.delete(`/api/record/delete-record/${tripRecordId}`),
    editAlbum: data => instance.patch(`/api/record/content`, data),
    deleteImage: tripRecordImageId => instance.delete(`/api/record/delete-record-image/${tripRecordImageId}`),

    getMemberProfile: memberId => instance.get(`api/member/${memberId}`),
    editMemberNickname: data => instance.patch(`api/member/nickname`, data),
    editMemberProfileImage: formData =>
        instance.patch(`api/member/update-profile-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),

    getBadges: memberId => instance.get(`/api/member/badge/${memberId}`),
    createLoginRequest: code => instance.get(`api/auth/login/kakao?code=${code}`),
    createGoogleLoginRequest: (code)=> instance.get(`api/auth/login/google?code=${code}`),

};
