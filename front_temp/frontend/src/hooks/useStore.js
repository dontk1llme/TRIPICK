import { create } from 'zustand';

export const loginUserState = create(set => ({
    id: '',
    name: '',
    email: '',
    profileUrl: '',
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

export const cartState = create(set => ({
    cartLocation: [],
    setCartLocation: data => set(state => ({ cartLocation: data })),
}));
