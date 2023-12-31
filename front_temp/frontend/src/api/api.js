import axios from 'axios';
import * as utils from 'utils';
import * as hooks from 'hooks';

export const instance = axios.create({

    // baseURL: utils.API_BASE_URL,
    baseURL: 'https://tripick.site/',
    // baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,  //response에 잇는 header 에서 뽑아서 여기에 넣기.
    },
});

export const apis = {

    
    getNowRecommendations: (memberId) => instance.get(`/fastapi/recommendation/now?memberId=${memberId}`),
    getDateRecommendations: (startDate, endDate, memberId) =>
        instance.get(`fastapi/recommendation/set-date?startDate=${startDate}&endDate=${endDate}&memberId=${memberId}`),

    createRecord: data => instance.post('api/record/create', data),
    getNationRecord: (memberId, nationName) => instance.get(`api/record/${memberId}/nation/${nationName}`),
    getNations: memberId => instance.get(`api/record/${memberId}`),
    saveImages: formData =>
        instance.post(`api/record/saveImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
    deleteAlbum: tripRecordId => instance.delete(`api/record/delete-record/${tripRecordId}`),
    editAlbum: data => instance.patch(`api/record/content`, data),
    deleteImage: tripRecordImageId => instance.delete(`api/record/delete-record-image/${tripRecordImageId}`),

    getMemberProfile: memberId => instance.get(`api/member/${memberId}`),
    editMemberNickname: data => instance.patch(`api/member/nickname`, data),
    editMemberProfileImage: formData =>
        instance.patch(`api/member/update-profile-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),

    getBadges: memberId => instance.get(`api/member/badge/${memberId}`),
    updateMainBadge: data => instance.patch(`api/member/update-main-badge`, data),
    createLoginRequest: code => instance.get(`api/auth/login/kakao?code=${code}`),
    createGoogleLoginRequest: (code)=> instance.get(`api/auth/login/google?code=${code}`),
    pickTripRequest: data => instance.post(`api/trip/pick`, data),
    removeTripRequest: uuid => instance.patch(`api/trip/remove/${uuid}`),
    getPickedTripRequest: memberId => instance.get(`api/trip/list/picked/${memberId}`),
    deleteLoginUser: data => instance.patch(`api/auth/logout`, data),
};
