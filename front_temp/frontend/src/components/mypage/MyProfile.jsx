import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import * as api from 'api';
import { IoPencil } from 'react-icons/io5';

const MyProfile = () => {
    const {
        memberId,
        nickname,
        email,
        profileImage,
        createdAt,
        setCreatedAt,
        setNickname,
        setEmail,
        setProfileImage,
        setLoginUser,
    } = hooks.loginUserState();
    const { mainStampId, stamp } = hooks.stampState();
    const { view, response, setView, setMessage, setResponse, type, setType } = hooks.modalState();
    const [mainStampUrl, setMainStampUrl] = useState('');
    const [onEditMode, setOnEditMode] = useState(false);
    const [newImageFile, setNewImageFile] = useState(profileImage);
    const [previewImage, setPreviewImage] = useState(profileImage);

    const nameInputRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        api.apis
            .getBadges(memberId)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        api.apis
            .getMemberProfile(memberId)
            .then(response => {
                console.log('프로필', response.data);
                console.log('닉네임', response.data.data.nickname);
                setNickname(response.data.data.nickname);
                setEmail(response.data.data.email);
                setCreatedAt(response.data.data.createdAt);
                setProfileImage(response.data.data.profileImage);
                // 토큰 완료되면 아래 거 추가
                // window.location.reload();
            })
            .catch(error => console.log(error));
    }, [saveProfile, newImageFile, onEditMode, setProfileImage]);

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

    useEffect(() => {
        if (!view && onEditMode) {
            nameInputRef.current.focus();
        }
    }, [view]);

    const saveProfile = () => {
        if (nickname.length < 2 || nickname.length > 10) {
            setView(true);
            setMessage('닉네임은 두글자 이상 열글자 이하여야 합니다.');
            setType('warning');
            nameInputRef.current.focus();
        } else {
            // const profile = { nickname, email, profileImage, createdAt };
            // setLoginUser(profile);
            const data = {
                memberId: memberId,
                nickname: nickname,
            };
            api.apis
                .editMemberNickname(data)
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.log(error));

            const formData = new FormData();
            formData.append('files', newImageFile);
            formData.append('memberId', memberId);

            api.apis
                .editMemberProfileImage(formData)
                .then(response => console.log(response))
                .catch(error => console.log(error));

            setOnEditMode(false);
            setView(true);
            setMessage('변경된 프로필이 저장되었습니다. ');
            setType('checking');
        }
    };

    const handleNameKeyDown = e => {
        if (e.key === 'Enter') {
            saveProfile();
        }
    };

    useEffect(() => {
        if (response === 'yes') {
            setView(false);
            setMessage('');
            setResponse('');
            setType('');
        }
    }, [response]);

    const handleProfileImageUpload = async event => {
        const file = await event.target.files[0];
        if (file) {
            setNewImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setProfileImage(imageUrl);
        }
    };

    // 수정 중일 때 바깥 클릭한 상황
    const [pendingAction, setPendingAction] = useState(null);

    useEffect(() => {
        const handleOutsideClick = event => {
            if (wrapRef.current && !wrapRef.current.contains(event.target) && onEditMode && type !== 'warning') {
                console.log(nickname.length);
                event.preventDefault();
                event.stopPropagation();
                setView(true);
                setType('query');
                setMessage('변경 내용을 저장하시겠습니까?');
                setPendingAction(event);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [onEditMode, type]);

    useEffect(() => {
        if (!view) {
            if (response === 'yes' && pendingAction) {
                if (pendingAction.target && typeof pendingAction.target.onClick === 'function') {
                    pendingAction.target.onClick(pendingAction);
                }
                setPendingAction(null);
                setView(false);
                setMessage('');
                setResponse('');
                setType('');
                if (!view) {
                    saveProfile();
                }
            } else if (response === 'no') {
                nameInputRef.current.focus();
                setPendingAction(null);
                setView(false);
                setMessage('');
                setResponse('');
                setType('');
            }
        }
    }, [response, view]);

    return (
        <S.Wrap onClick={e => e.stopPropagation()} ref={wrapRef}>
            <S.ProfileImageContainer>
                <svg width="195" height="246" viewBox="0 0 195 246" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                        x="0.5"
                        y="0.5"
                        width="194"
                        height="244.87"
                        rx="15.5"
                        stroke="#5E6156"
                        stroke-dasharray="10 10"
                    />
                </svg>
                <S.ImageOutline>
                    <img src={profileImage} alt="profile" />
                </S.ImageOutline>

                {onEditMode ? (
                    <S.EditProfileImageContainer image={previewImage ? previewImage : null}>
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
                    <S.SubTitle>name: </S.SubTitle>
                    <S.InformationContent
                        type="text"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        readOnly={onEditMode ? null : 'readonly'}
                        edit={onEditMode ? 'edit' : null}
                        ref={nameInputRef}
                        onKeyDown={handleNameKeyDown}
                    />
                </S.TextContainer>
                <S.TextContainer>
                    <S.SubTitle>Email: </S.SubTitle>
                    <S.InformationContent
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        readOnly="readonly"
                    />
                </S.TextContainer>
                <S.TextContainer>
                    <S.SubTitle>Since: </S.SubTitle>
                    <S.InformationContent type="text" value={createdAt} readOnly="readonly" />
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
        width: 100%;
        height: 245.87px;
        margin-top: 16px;
        margin-bottom: 60px;
        & svg {
            position: absolute;
            width: 195px;
            height: 245.87px;
        }
    `,
    ImageOutline: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 175px;
        height: 225px;
        background-color: ${({ theme }) => theme.color.white};
        box-shadow: ${({ theme }) => theme.shadow.card};
        & img {
            width: 155px;
            height: 203.95px;
        }
    `,
    EditProfileImageContainer: styled.div`
        padding: 16px;
        position: absolute;
        width: 182px;
        height: 229px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url(${({ image }) => image});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        & > input {
            display: none;
        }
    `,
    EditProfileImage: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 155px;
        height: 203.95px;
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
        top: 260px;
        right: 70px;
        width: 100px;
        height: 100px;
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
        margin-left: 26px;
    `,
    TextContainer: styled.div`
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        & > input {
            font-size: ${({ theme }) => theme.fontSize.subTitle2};
            font-family: 'iceHimchan-Rg';
        }
    `,
    SubTitle: styled.div`
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.dark2};
        margin-right: 4px;
        font-family: 'constantia';
    `,
    InformationContent: styled.input`
        width: 100%;
        color: ${({ theme }) => theme.color.main2};
        text-align: center;
        background: none;
        border: none;
        border-bottom: ${({ edit, theme }) => (edit === 'edit' ? `1px solid ${theme.color.black}` : 'none')};
        outline: none;
        border-bottom: 1px dashed ${({ theme }) => theme.color.dark2};
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
        border: 1px solid rgba(94, 97, 86, 0.5);
        font-size: ${({ theme }) => theme.fontSize.sub};
        color: rgba(94, 97, 86, 0.5);
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
