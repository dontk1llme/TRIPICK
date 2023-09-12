import { create } from 'zustand';

export const loginUserState = create(set => ({
    id: '',
    name: '김싸피',
    email: 'traveler@gmail.com',
    profileUrl: require('asset/images/profile.png').default,
    date: '2023-09-11',
    setId: data => set(state => ({ id: data })),
    setName: data => set(state => ({ name: data })),
    setEmail: data => set(state => ({ email: data })),
    setProfileUrl: data => set(state => ({ profileUrl: data })),
    setLoginUser: data =>
        set(state => ({
            id: data.id,
            name: data.name,
            email: data.email,
            profileUrl: data.profileUrl,
            date: data.date,
        })),
    setName: data => set(state => ({ name: data })),
    setProfileUrl: data => set(state => ({ profileUrl: data })),
}));

export const albumState = create(set => ({
    selectedAlbum: '0',
    selectedImage: { albumId: '0', imageUrl: '' },
    albumList: [
        {
            albumId: '1',
            albumName: '정말 즐겁습니다',
            imageUrl: [
                { imageId: '1', url: require('asset/images/pink-8053329_1280.jpg').default },
                { imageId: '2', url: require('asset/images/rainbow-8221835_1280.jpg').default },
                { imageId: '3', url: require('asset/images/green-sea-turtle-8199770_1280.jpg').default },
                { imageId: '4', url: require('asset/images/mountain-8207212_1280.jpg').default },
                { imageId: '5', url: require('asset/images/rose-8200460_1280.jpg').default },
                { imageId: '6', url: require('asset/images/squirrel-8219439_1280.jpg').default },
            ],
        },
        {
            albumId: '2',
            albumName: '너무 행복해요',
            imageUrl: [
                { imageId: '1', url: require('asset/images/rose-8200460_1280.jpg').default },
                { imageId: '2', url: require('asset/images/squirrel-8219439_1280.jpg').default },
            ],
        },
        {
            albumId: '3',
            albumName: '짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱긴이름',
            imageUrl: [],
        },
        {
            albumId: '4',
            albumName: '정말 즐겁습니다',
            imageUrl: [
                { imageId: '1', url: require('asset/images/pink-8053329_1280.jpg').default },
                { imageId: '2', url: require('asset/images/rainbow-8221835_1280.jpg').default },
                { imageId: '3', url: require('asset/images/green-sea-turtle-8199770_1280.jpg').default },
                { imageId: '4', url: require('asset/images/mountain-8207212_1280.jpg').default },
                { imageId: '5', url: require('asset/images/rose-8200460_1280.jpg').default },
                { imageId: '6', url: require('asset/images/squirrel-8219439_1280.jpg').default },
            ],
        },
        {
            albumId: '5',
            albumName: '정말 즐겁습니다',
            imageUrl: [
                { imageId: '1', url: require('asset/images/pink-8053329_1280.jpg').default },
                { imageId: '2', url: require('asset/images/rainbow-8221835_1280.jpg').default },
                { imageId: '3', url: require('asset/images/green-sea-turtle-8199770_1280.jpg').default },
                { imageId: '4', url: require('asset/images/mountain-8207212_1280.jpg').default },
                { imageId: '5', url: require('asset/images/rose-8200460_1280.jpg').default },
                { imageId: '6', url: require('asset/images/squirrel-8219439_1280.jpg').default },
            ],
        },
        {
            albumId: '6',
            albumName: '정말 즐겁습니다',
            imageUrl: [
                { imageId: '1', url: require('asset/images/pink-8053329_1280.jpg').default },
                { imageId: '2', url: require('asset/images/rainbow-8221835_1280.jpg').default },
                { imageId: '3', url: require('asset/images/green-sea-turtle-8199770_1280.jpg').default },
                { imageId: '4', url: require('asset/images/mountain-8207212_1280.jpg').default },
                { imageId: '5', url: require('asset/images/rose-8200460_1280.jpg').default },
                { imageId: '6', url: require('asset/images/squirrel-8219439_1280.jpg').default },
            ],
        },
    ],
    setSelectedAlbum: data => set(state => ({ selectedAlbum: data })),
    setAlbumList: data => set(state => ({ albumList: data })),
    setImageList: data => set(state => ({ imageList: data })),
}));

export const cartState = create(set => ({
    cartLocation: [
        {
            country: '노르웨이',
            city: '트롬쇠',
            estimatedClimate: '12',
            estimatedExchangeRate: '123.69',
            currency: '크로네',
            safety: '8.6',
            imageUrl: require('asset/images/troms.png').default,
            cart: true,
        },
        {
            country: '프랑스',
            city: '파리',
            estimatedClimate: '21',
            estimatedExchangeRate: '1430.15',
            currency: '유로',
            safety: '8.8',
            imageUrl: require('asset/images/paris.png').default,
            cart: true,
        },
        {
            country: '미국',
            city: '콜로라도',
            estimatedClimate: '25',
            estimatedExchangeRate: '1317.61',
            currency: '달러',
            safety: '9.1',
            imageUrl: require('asset/images/colorado.png').default,
            cart: true,
        },
    ],
    setCartLocation: data => set(state => ({ cartLocation: data })),
}));

export const stampState = create(set => ({
    mainStampId: 1,
    setMainStampId: data => set(state => ({ mainStampId: data })),
    stamp: [
        {
            id: 1,
            name: '푸바오 사랑해',
            detail: '중국을 많이 간 사람에게 주는 스탬프임',
            imageUrl: require('asset/images/main-stamp.png').default,
            obtained: false,
        },
        {
            id: 2,
            name: '고양이 대장',
            detail: '고양이의 나라 5개 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: true,
        },
        {
            id: 3,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp2.png').default,
            obtained: true,
        },
        {
            id: 4,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
        {
            id: 5,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: true,
        },
        {
            id: 6,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
        {
            id: 7,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
        {
            id: 8,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
        {
            id: 9,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
        {
            id: 10,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
        {
            id: 11,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
        {
            id: 12,
            name: '코알라 짱',
            detail: '코알라가 사는 나라에 3번 이상 방문',
            imageUrl: require('asset/images/stamp3.png').default,
            obtained: false,
        },
    ],
    setStamp: data =>
        set(state => {
            const updatedStamps = state.stamp.map(stamp =>
                stamp.id === data.id ? { ...stamp, obtained: data.obtained } : stamp,
            );
            return { stamp: updatedStamps };
        }),
}));
