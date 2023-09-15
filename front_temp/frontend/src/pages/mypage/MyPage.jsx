import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as components from 'components';

import { TbEPassport } from 'react-icons/tb';

const MyPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const handlePage = page => {
        if (currentPage < page) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(currentPage - 1);
        }
    };
    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

    const pages = [1, 2, 3, 4];
    return (
        <S.Wrap>
            <link
                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300&family=Odor+Mean+Chey&family=Overpass+Mono&display=swap"
                rel="stylesheet"></link>
            <link
                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300&family=Odor+Mean+Chey&family=Oleo+Script&family=Overpass+Mono&display=swap"
                rel="stylesheet"></link>
            <S.PassportConatiner>
                <S.PageContainer
                    onClick={() => handlePage(1)}
                    className={currentPage < 1 ? 'flipped' : null}
                    page="1"
                    currentPage={currentPage}>
                    <S.BackPage className={currentPage !== 0}>
                        <S.FrontCover>
                            <S.PassportTitle>PASSPORT</S.PassportTitle>
                            <S.CoverIconContainer>
                                <img src={require('asset/images/fcon3.png').default} alt="logo" />
                            </S.CoverIconContainer>
                            <S.CoverPassportIconContainer>
                                <svg
                                    width="40"
                                    height="32"
                                    viewBox="0 0 40 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4 0C2.93913 0 1.92172 0.421427 1.17157 1.17157C0.421427 1.92172 0 2.93913 0 4V14H12.26C13.18 10.48 16.36 8 20 8C23.64 8 26.82 10.48 27.74 14H40V4C40 2.93913 39.5786 1.92172 38.8284 1.17157C38.0783 0.421427 37.0609 0 36 0H4ZM20 12C18.9391 12 17.9217 12.4214 17.1716 13.1716C16.4214 13.9217 16 14.9391 16 16C16 17.0609 16.4214 18.0783 17.1716 18.8284C17.9217 19.5786 18.9391 20 20 20C21.0609 20 22.0783 19.5786 22.8284 18.8284C23.5786 18.0783 24 17.0609 24 16C24 14.9391 23.5786 13.9217 22.8284 13.1716C22.0783 12.4214 21.0609 12 20 12ZM0 18V28C0 29.0609 0.421427 30.0783 1.17157 30.8284C1.92172 31.5786 2.93913 32 4 32H36C37.0609 32 38.0783 31.5786 38.8284 30.8284C39.5786 30.0783 40 29.0609 40 28V18H27.74C26.82 21.52 23.64 24 20 24C16.36 24 13.18 21.52 12.26 18H0Z"
                                        fill="url(#paint0_linear_576_1294)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_576_1294"
                                            x1="-3.0268e-08"
                                            y1="30"
                                            x2="40"
                                            y2="29.5"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#CECDD8" />
                                            <stop offset="0.552083" stop-color="white" />
                                            <stop offset="1" stop-color="#CECDD8" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </S.CoverPassportIconContainer>
                            <S.TeamTitle>Tripick</S.TeamTitle>
                        </S.FrontCover>
                    </S.BackPage>
                    <S.FrontPage className={currentPage !== 1}>
                        <S.PassportLeft>
                            <components.MyProfile />
                        </S.PassportLeft>
                    </S.FrontPage>
                </S.PageContainer>
                <S.PageContainer
                    onClick={() => handlePage(2)}
                    className={currentPage < 2 ? 'flipped' : null}
                    page="2"
                    currentPage={currentPage}>
                    <S.BackPage className={currentPage !== 1}>
                        <S.PassportRight className="info"></S.PassportRight>
                    </S.BackPage>
                    <S.FrontPage className={currentPage !== 2}>
                        <S.PassportLeft>
                            <components.MyStamps page="1" />
                        </S.PassportLeft>
                    </S.FrontPage>
                </S.PageContainer>
                <S.PageContainer
                    onClick={() => handlePage(3)}
                    className={currentPage < 3 ? 'flipped' : null}
                    page="3"
                    currentPage={currentPage}>
                    <S.BackPage className={currentPage !== 2}>
                        <S.PassportRight>
                            <components.MyStamps page="2" />
                        </S.PassportRight>
                    </S.BackPage>
                    <S.FrontPage className={currentPage !== 3}>
                        <S.BackCover></S.BackCover>
                    </S.FrontPage>
                </S.PageContainer>
            </S.PassportConatiner>
            <S.IndexContainer>
                {pages.map((page, index) => (
                    <S.IndexInnerContainer key={index}>
                        <S.Index page={page} onClick={() => setCurrentPage(page - 1)} curr={currentPage === page - 1}>
                            {page}
                        </S.Index>
                        <S.IndexLine lastPage={page === 4}></S.IndexLine>
                    </S.IndexInnerContainer>
                ))}
            </S.IndexContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        margin: 0 156px;
        /* overflow: hidden; */
    `,
    PassportConatiner: styled.div`
        position: relative;
        perspective: 1200px;
        width: 840px;
        height: 628px;
        border-radius: 32px;

        & .flipped {
            transform: rotateY(180deg);
            /* z-index: ${props => props.page}; */
        }
    `,
    PageContainer: styled.div`
        position: absolute;
        width: 420px;
        height: 628px;
        left: 0;
        transform-style: preserve-3d;
        transition: transform 0.8s;
        transform-origin: right;
        border-radius: 32px 0 0 32px;
        z-index: ${props =>
            Number(props.page) === 1 && Number(props.currentPage) === 1
                ? 99
                : Number(props.currentPage) === Number(props.page)
                ? 100
                : Number(props.page) === 3 && Number(props.currentPage) === 3 - 1
                ? 99
                : Number(props.currentPage) === Number(props.page) - 1
                ? 101
                : 2};
        transition: 1s;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 32px 0 0 32px;
            box-shadow: ${props =>
                props.page === '1' && props.currentPage >= props.page
                    ? props.theme.shadow.paperTotalPage
                    : props.page === '3' && props.currentPage < props.page
                    ? props.theme.shadow.paperTotalReversePage
                    : null};
            z-index: -100;
        }

        & .true {
            pointer-events: none;
        }
    `,
    FrontPage: styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 32px 0px 0px 32px;
        background-color: white;
    `,
    BackPage: styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        border-radius: 0px 32px 32px 0px;
        background-color: white;
        & .info {
            background: url(${require('asset/images/passport-background3.png').default});
            background-size: cover;
        }
    `,
    Test: styled.div`
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: yellow;
    `,
    Test2: styled.div`
        width: 50px;
        height: 50px;
        background-color: gray;
    `,
    FrontCover: styled.div`
        display: flex;
        flex-direction: column;
        padding: 104px 62px 96px;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.color.main3};
        border-radius: 5px 32px 32px 5px;
        box-shadow: ${({ theme }) => theme.shadow.paperRightPage};
    `,
    BackCover: styled.div`
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.color.main3};
        border-radius: 32px 5px 5px 32px;
        box-shadow: ${({ theme }) => theme.shadow.pageCoverBackPage};
    `,
    CoverIconContainer: styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        margin: 40px 0 64px;
        & > img {
            width: 160px;
            height: 180px;
            color: white;
        }
    `,
    PassportTitle: styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        font-family: 'Odor Mean Chey', serif;
        font-weight: bold;
        font-size: ${({ theme }) => theme.fontSize.title2};
        background: linear-gradient(90deg, rgba(228, 228, 228, 0.83) 0%, #fff 54.69%, #cbc9d5 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 12px 0 8px;
    `,
    TeamTitle: styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        margin: 8px 0;
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        color: white;
        font-family: 'Oleo Script', cursive;
    `,
    CoverPassportIconContainer: styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        margin-bottom: 24px;
        & svg {
            width: 40px;
            height: 32px;
            color: white;
        }
    `,
    PassportLeft: styled.div`
        width: 420px;
        height: 628px;
        border-radius: 32px 0 0 32px;
        padding: 64px 32px 24px 64px;
        background: url(${require('asset/images/passport-background1.png').default});
        background-size: cover;
        box-shadow: ${({ theme }) => theme.shadow.paperLeftPage};
    `,
    PassportRight: styled.div`
        width: 420px;
        height: 628px;
        border-radius: 0 32px 32px 0;
        padding: 64px 64px 24px 32px;
        background: url(${require('asset/images/passport-background2.png').default});
        background-size: cover;
        box-shadow: ${({ theme }) => theme.shadow.paperRightPage};
    `,
    IndexContainer: styled.div`
        margin-left: 56px;
        display: flex;
        flex-direction: column;
        width: 40px;
        height: auto;
    `,
    IndexInnerContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: auto;
    `,
    Index: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        ${({ page }) => (page !== 1 ? null : null)};
        background-color: ${({ curr, theme }) => (curr ? theme.color.main2 : theme.color.gray)};
        color: ${({ curr, theme }) => (curr ? theme.color.white : theme.color.black)};
        cursor: pointer;
    `,
    IndexLine: styled.div`
        width: 0.5px;
        height: 16px;
        background-color: ${({ theme }) => theme.color.black};
        ${({ lastPage }) => (lastPage ? `display: none` : null)}
    `,
};

export default MyPage;
