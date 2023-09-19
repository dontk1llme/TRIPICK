import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { BiCheck } from 'react-icons/bi';

const CollectedStamp = ({ id }) => {
    const { stamp, mainStampId, setMainStampId } = hooks.stampState();
    const { view, setView, setMessage, response, setResponse, setType } = hooks.modalState();
    const thisStamp = stamp.find(stamp => stamp.id === id);

    useEffect(() => {
        console.log('main', mainStampId);
        console.log('id', id);
    }, [mainStampId]);

    const handleSetMain = id => {
        setType('checking');
        setMessage(`${stamp[id - 1].name}을 메인 스탬프로 설정했습니다.`);
        setView(true);
        setMainStampId(id);
    };

    const handleRemoveMain = () => {
        setType('checking');
        setMessage('메인 스탬프가 뿅~ 없어졌지렁');
        setView(true);
        setMainStampId(0);
    };

    return (
        <S.Wrap>
            <S.StampContainer image={thisStamp.imageUrl}>
                <S.StampDescription className="detail">
                    <S.StampTitle>{thisStamp.name}</S.StampTitle>
                    <S.StampDetail>{thisStamp.detail}</S.StampDetail>
                    {mainStampId === id ? (
                        <S.IsMainButton onClick={handleRemoveMain}>
                            <BiCheck />
                        </S.IsMainButton>
                    ) : (
                        <S.CheckMainButton onClick={() => handleSetMain(id)}>
                            <BiCheck />
                        </S.CheckMainButton>
                    )}
                </S.StampDescription>
            </S.StampContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
    `,
    StampContainer: styled.div`
        width: 100%;
        height: 100%;
        background-image: url(${props => props.image});
        background-size: 100%;
        &:hover {
            & .detail {
                width: 100%;
                height: 100%;
                background-color: rgba(91, 85, 73, 0.8);
            }
        }
    `,
    StampDescription: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 8px;
        width: 0px;
        height: 0px;
        overflow: hidden;
        border-radius: 100%;
    `,
    StampTitle: styled.div`
        width: 100%;
        text-align: center;
        margin-top: 48px;
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.white};
        word-break: keep-all;
    `,
    StampDetail: styled.div`
        width: 100%;
        word-break: keep-all;
        text-align: center;
        margin-top: 6px;
        font-size: ${({ theme }) => theme.fontSize.sub};
        line-height: 16px;
        color: ${({ theme }) => theme.color.white};
    `,
    CheckMainButton: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        margin-bottom: 6px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 2px solid ${({ theme }) => theme.color.main1};
        cursor: pointer;
        & svg {
            width: 100%;
            height: 100%;
            color: ${({ theme }) => theme.color.main1};
        }

        &:hover {
            border: 2px solid ${({ theme }) => theme.color.main2};
            & svg {
                color: ${({ theme }) => theme.color.main2};
            }
        }
    `,
    IsMainButton: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        margin-bottom: 6px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: ${({ theme }) => theme.color.main1};
        cursor: pointer;
        & svg {
            width: 100%;
            height: 100%;
            color: ${({ theme }) => theme.color.white};
        }

        &:hover {
            background-color: ${({ theme }) => theme.color.main2};
            & svg {
                color: ${({ theme }) => theme.color.white};
            }
        }
    `,
};

export default CollectedStamp;
