import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { IoPencil } from 'react-icons/io5';

const MyProfile = () => {
    const { name, email, profileUrl, date, setName, setEmail, setProfileUrl, setLoginUser } = hooks.loginUserState();
    const { mainStampId, stamp } = hooks.stampState();
    const [mainStampUrl, setMainStampUrl] = useState('');
    const [onEditMode, setOnEditMode] = useState(false);

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (onEditMode) {
            nameInputRef.current.focus();
        }
    }, [onEditMode]);

    useEffect(() => {
        if (mainStampId !== 0) {
            const mainStamp = stamp.find(s => s.id === mainStampId);
            if (mainStamp && mainStamp.obtained) {
                setMainStampUrl(mainStamp.imageUrl);
            }
        } else {
            setMainStampUrl('');
        }
        console.log(mainStampUrl);
    }, [mainStampId]);

    const saveProfile = () => {
        const profile = { name, email, profileUrl, date };
        setLoginUser(profile);
        setOnEditMode(false);
    };

    const handleProfileImageUpload = async event => {
        const file = await event.target.files[0];
        await setProfileUrl(file);
    };
    return (
        <S.Wrap onClick={e => e.stopPropagation()}>
            <S.ProfileImageContainer>
                <img src={profileUrl} alt="profile" />
                {onEditMode ? (
                    <S.EditProfileImageContainer>
                        <label for="file">
                            <S.EditProfileImage>
                                <IoPencil />
                            </S.EditProfileImage>
                        </label>
                        <input type="file" id="file" onChange={handleProfileImageUpload} />
                    </S.EditProfileImageContainer>
                ) : null}
                {mainStampUrl && (
                    <S.MainStamp>
                        <img src={mainStampUrl} alt="main stamp" />
                    </S.MainStamp>
                )}
            </S.ProfileImageContainer>
            <S.InformationContainer>
                <S.TextContainer>
                    <S.SubTitle>name</S.SubTitle>
                    <S.InformationContent
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        readOnly={onEditMode ? null : 'readonly'}
                        edit={onEditMode ? 'edit' : null}
                        ref={nameInputRef}
                    />
                </S.TextContainer>
                <S.TextContainer>
                    <S.SubTitle>Email</S.SubTitle>
                    <S.InformationContent
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        readOnly="readonly"
                    />
                </S.TextContainer>
                <S.TextContainer>
                    <S.SubTitle>Since</S.SubTitle>
                    <S.InformationContent type="text" value={date} readOnly="readonly" />
                </S.TextContainer>
            </S.InformationContainer>
            <S.EditContainer>
                {onEditMode ? (
                    <S.SaveButton onClick={saveProfile}>저장</S.SaveButton>
                ) : (
                    <S.EditButton onClick={() => setOnEditMode(true)}>수정</S.EditButton>
                )}{' '}
            </S.EditContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: start;
        /* margin: 64px 32px 24px 64px; */
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
    EditProfileImageContainer: styled.div`
        position: absolute;
        width: 182px;
        height: 229px;
        & > input {
            display: none;
        }
    `,
    EditProfileImage: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;

        width: 182px;
        height: 229px;
        background-color: rgba(91, 85, 73, 0.5);
        & svg {
            width: 32px;
            height: 32px;
            color: ${({ theme }) => theme.color.white};
        }
        &:hover {
            background-color: rgba(91, 85, 73, 0.7);
            & svg {
                color: ${({ theme }) => theme.color.main1};
            }
        }
    `,
    MainStamp: styled.div`
        position: absolute;
        top: 233px;
        right: 80px;
        width: 80px;
        height: 80px;
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
    InformationContent: styled.input`
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.black};
        background: none;
        border: none;
        border-bottom: ${({ edit, theme }) => (edit === 'edit' ? `1px solid ${theme.color.black}` : 'none')};
        outline: none;
    `,
    EditContainer: styled.div`
        display: flex;
        width: 100%;
        margin-top: auto;
        justify-content: flex-end;
    `,
    EditButton: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 76px;
        height: 29px;
        padding: 8px 24px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color.gray};
        font-size: ${({ theme }) => theme.fontSize.sub};
        color: ${({ theme }) => theme.color.gray};
        white-space: nowrap;
        cursor: pointer;
        &:hover {
            border: 1px solid ${({ theme }) => theme.color.main1};
            background-color: ${({ theme }) => theme.color.main1};
            color: ${({ theme }) => theme.color.white};
        }
    `,
    SaveButton: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 76px;
        height: 29px;
        padding: 8px 24px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color.main2};
        font-size: ${({ theme }) => theme.fontSize.sub};
        color: ${({ theme }) => theme.color.white};
        background-color: ${({ theme }) => theme.color.main2};
        white-space: nowrap;
        cursor: pointer;
        &:hover {
            border: 1px solid ${({ theme }) => theme.color.main3};
            background-color: ${({ theme }) => theme.color.main3};
        }
    `,
};

export default MyProfile;
