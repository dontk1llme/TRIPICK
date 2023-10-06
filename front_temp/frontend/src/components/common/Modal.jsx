import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { IoCheckmarkSharp, IoHelpSharp, IoAlertSharp } from 'react-icons/io5';

const Modal = () => {
    const { view, message, type, setResponse, setView } = hooks.modalState();
    const handleYes = () => {
        setResponse('yes');
        setView(false);
    };
    const handleNo = () => {
        setResponse('no');
        setView(false);
    };

    const handleEnterPress = e => {
        if (e.key === 'Enter') {
            handleYes();
        }
    };

    const handleClick = e => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (view) {
            document.querySelector('[data-modal-wrap]').focus();
        }
    }, [view]);

    return (
        <S.Wrap onKeyDown={handleEnterPress} tabIndex={0} data-modal-wrap onClick={handleClick}>
            <S.Border strokeColor={type}>
                <svg width="594" height="202" viewBox="0 0 594 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="593" height="201" rx="15.5" stroke-dasharray="10 10" />
                </svg>
            </S.Border>
            <S.IconContainer color={type}>
                {type === 'warning' ? <IoAlertSharp /> : type === 'checking' ? <IoCheckmarkSharp /> : <IoHelpSharp />}
            </S.IconContainer>
            <S.Message>{message}</S.Message>
            {type === 'query' ? (
                <S.ButtonContainer type={type}>
                    <S.Button onClick={handleNo}>취소</S.Button>
                    <S.Button onClick={handleYes}>확인</S.Button>
                </S.ButtonContainer>
            ) : (
                <S.ButtonContainer type={type}>
                    <S.Button type={type} onClick={handleYes}>
                        확인
                    </S.Button>
                </S.ButtonContainer>
            )}
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 626px;
        height: 234px;
        border-radius: 16px;
        border: none;
        outline: none;
        &:focus {
            outline: none;
        }
        background-color: ${({ theme }) => theme.color.background};
        box-shadow: ${({ theme }) => theme.shadow.card};
        padding: 40px;
    `,
    Border: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        & rect {
            stroke: ${({ strokeColor, theme }) =>
                strokeColor === 'warning'
                    ? theme.color.warning
                    : strokeColor === 'checking'
                    ? theme.color.main1
                    : theme.color.main4};
        }
    `,
    IconContainer: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border: 5px solid
            ${({ color, theme }) =>
                color === 'warning'
                    ? theme.color.warning
                    : color === 'checking'
                    ? theme.color.main1
                    : theme.color.main4};
        & svg {
            width: 30px;
            height: 30px;
            color: ${({ color, theme }) =>
                color === 'warning'
                    ? theme.color.warning
                    : color === 'checking'
                    ? theme.color.main1
                    : theme.color.main4};
        }
    `,
    Message: styled.div`
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        color: ${({ theme }) => theme.color.black};
    `,
    ButtonContainer: styled.div`
        width: ${({ type }) => (type === 'query' ? '198px' : '83px')};
        height: 31px;
        display: flex;
        justify-content: space-between;
    `,
    Button: styled.div`
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 83px;
        height: 100%;
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid
            ${({ type, theme }) =>
                type === 'warning' ? theme.color.warning : type === 'checking' ? theme.color.main1 : theme.color.main4};
        color: ${({ type, theme }) =>
            type === 'warning' ? theme.color.warning : type === 'checking' ? theme.color.main1 : theme.color.main4};
        font-size: ${({ theme }) => theme.fontSize.content1};

        &:hover {
            color: ${({ theme }) => theme.color.white};
            background-color: ${({ type, theme }) =>
                type === 'warning' ? theme.color.warning : type === 'checking' ? theme.color.main1 : theme.color.main4};
        }
    `,
};

export default Modal;
