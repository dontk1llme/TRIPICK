import { create } from 'zustand';

export const loginUserState = create(set => ({
    id: '',
    name: '김싸피',
    email: 'traveler@gmail.com',
    profileUrl: require('asset/images/profile.png').default,
    setLoginUser: data =>
        set(state => ({
            id: data.id,
            name: data.name,
            email: data.email,
            profileUrl: data.profileUrl,
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
        },
        {
            country: '프랑스',
            city: '파리',
            estimatedClimate: '21',
            estimatedExchangeRate: '1430.15',
            currency: '유로',
            safety: '8.8',
            imageUrl: require('asset/images/troms.png').default,
        },
        {
            country: '미국',
            city: '콜로라도',
            estimatedClimate: '25',
            estimatedExchangeRate: '1317.61',
            currency: '달러',
            safety: '9.1',
            imageUrl: require('asset/images/troms.png').default,
        },
    ],
    setCartLocation: data => set(state => ({ cartLocation: data })),
}));
