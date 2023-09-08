import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';

const MyProfile = () => {
    const { name, email, profileUrl } = hooks.loginUserState();
    return (
        <S.Wrap onClick={e => e.stopPropagation()}>
            <S.ProfileImageContainer>
                <img src={profileUrl} alt="profile" />
                <S.MainStamp>
                    <img src={require('asset/images/main-stamp.png').default} alt="main stamp" />
                </S.MainStamp>
            </S.ProfileImageContainer>
            <S.InformationContainer>
                <S.TextContainer>
                    <S.SubTitle>name</S.SubTitle>
                    <S.InformationContent>{name}</S.InformationContent>
                </S.TextContainer>
                <S.TextContainer>
                    <S.SubTitle>Email</S.SubTitle>
                    <S.InformationContent>{email}</S.InformationContent>
                </S.TextContainer>
                <S.TextContainer>
                    <S.SubTitle>Since</S.SubTitle>
                    <S.InformationContent>2023-09-04</S.InformationContent>
                </S.TextContainer>
            </S.InformationContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: start;
        width: 100%;
        height: 100%;
        /* background-color: white; */
    `,
    ProfileImageContainer: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 182px;
        height: 229px;
        border: 1px solid rgba(91, 85, 73, 0.5);
        margin-bottom: 16px;
        & > img {
            width: 166px;
            height: 213px;
        }
    `,
    MainStamp: styled.div`
        position: absolute;
        top: 233px;
        right: 80px;
        width: 160px;
        height: 160px;
        & > img {
            width: 100%;
            height: 100%;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
        }
    `,
    InformationContainer: styled.div`
        display: flex;
        height: 165px;
        width: auto;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        margin-top: 16px;
    `,
    TextContainer: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 41px;
    `,
    SubTitle: styled.div`
        font-size: ${({ theme }) => theme.fontSize.sub};
        color: ${({ theme }) => theme.color.black};
    `,
    InformationContent: styled.div`
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.black};
    `,
};

export default MyProfile;
