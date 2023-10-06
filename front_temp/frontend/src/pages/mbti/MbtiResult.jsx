import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import { CiRedo } from 'react-icons/ci';
import { SlPicture } from 'react-icons/sl';

const MbtiResult = () => {
    const { result, images } = hooks.mbtiState();

    const [currentURL, setCurrentURL] = useState(window.location.href);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const downloadImage = () => {
        saveAs(imageUrl, `${result}.jpg`);
    };

    const copyLink = () => {
        const urlWithoutResult = currentURL.replace('/result', '');
        navigator.clipboard
            .writeText(urlWithoutResult)
            .then(() => {
                setView(true);
                setMessage('링크가 복사되었습니다.');
                setType('checking');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    };

    useEffect(() => {
        if (response === 'yes') {
            setView(false);
            setMessage('');
            setResponse('');
            setType('');
        }
    }, [response]);

    useEffect(() => {
        console.log(result);
        if (result !== '') {
            const foundImage = images.find(image => image.mbti === result);
            if (foundImage) {
                setImageUrl(foundImage.imageUrl);
            } else {
                console.log('0번째', images[0].mbti);
                console.warn(`No image found for result: ${result}`);
                setImageUrl(''); // or set to a default image if you have one
            }
        }
    }, [result]);

    const { setView, setMessage, response, setResponse, setType } = hooks.modalState();

    return (
        <S.Wrap>
            <S.Title>당신에게 추천하는 여행지는?</S.Title>
            <S.ImageContainer className="image">{imageUrl && <img src={imageUrl} alt="mbti image" />}</S.ImageContainer>
            <S.LinkContainer>
                <S.Link>{currentURL.replace('/result', '')}</S.Link>
                <S.LinkButton onClick={copyLink}>링크 복사</S.LinkButton>
            </S.LinkContainer>
            <S.ButtonsContainer>
                <S.ButtonContainer>
                    <S.Button className="redo" onClick={() => navigate(utils.URL.MBTI.MAIN)}>
                        <CiRedo />
                    </S.Button>
                    <S.ButtonName>테스트 다시하기</S.ButtonName>
                </S.ButtonContainer>
                <S.ButtonContainer>
                    <S.Button className="save" onClick={downloadImage}>
                        <SlPicture />
                    </S.Button>
                    <S.ButtonName>이미지 저장하기</S.ButtonName>
                </S.ButtonContainer>
            </S.ButtonsContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.title1};
        width: 100%;
        height: 100%;
        margin-top: 60px;
    `,
    Title: styled.div`
        display: flex;
        width: 100%;
        justify-content: center;
        white-space: nowrap;
        font-size: ${({ theme }) => theme.fontSize.title2};
        color: ${({ theme }) => theme.color.main1};
        font-weight: bold;
        margin: 16px 0 24px;
    `,
    ImageContainer: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 756px;
        height: auto;
        & img {
            width: 100%;
            height: auto;
        }
        margin-bottom: 24px;
    `,
    LinkContainer: styled.div`
        display: flex;
        width: 756px;
        height: 54px;
        margin: 24px 0;
    `,
    Link: styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 24px;
        flex-grow: 9;
        height: 100%;
        box-shadow: ${({ theme }) => theme.shadow.card};
        margin-right: 8px;
        border-radius: 8px 0px 0px 8px;
        color: ${({ theme }) => theme.color.gray};
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
    `,
    LinkButton: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        cursor: pointer;
        height: 100%;
        box-shadow: ${({ theme }) => theme.shadow.card};
        background-color: ${({ theme }) => theme.color.main2};
        border-radius: 0px 8px 8px 0px;
        color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
    `,
    ButtonsContainer: styled.div`
        width: 556px;
        height: 124px;
        display: flex;
        justify-content: space-between;
        margin: 24px 0 56px;
    `,
    ButtonContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 152px;
        height: 100%;
        & .redo {
            background-color: ${({ theme }) => theme.color.main2};
        }
        & .save {
            background-color: ${({ theme }) => theme.color.main1};
            & svg {
                width: 40px;
                height: 40px;
            }
            &:hover {
                background-color: ${({ theme }) => theme.color.main2};
            }
        }
    `,
    Button: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        border-radius: 100%;
        cursor: pointer;
        & svg {
            width: 50px;
            height: 50px;
            color: ${({ theme }) => theme.color.white};
        }
        &:hover {
            background-color: ${({ theme }) => theme.color.main3};
        }
    `,
    ButtonName: styled.div`
        display: flex;
        align-items: center;
        white-space: nowrap;
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
    `,
};

export default MbtiResult;
