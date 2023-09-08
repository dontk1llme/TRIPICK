import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as components from 'components';

import { FaPassport } from 'react-icons/fa6';
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
    return (
        <S.Wrap>
            <S.PassportConatiner>
                <S.PageContainer
                    onClick={() => handlePage(1)}
                    className={currentPage < 1 ? 'flipped' : null}
                    page="1"
                    currentPage={currentPage}>
                    <S.BackPage>
                        <S.FrontCover>
                            <S.CoverIconContainer>
                                <FaPassport />
                            </S.CoverIconContainer>
                            <S.PassportTitle>PASSPORT</S.PassportTitle>
                            <S.TeamTitle>Tripick</S.TeamTitle>
                            <S.CoverPassportIconContainer>
                                <TbEPassport />
                            </S.CoverPassportIconContainer>
                        </S.FrontCover>
                    </S.BackPage>
                    <S.FrontPage>
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
                    <S.BackPage>
                        <S.PassportRight></S.PassportRight>
                    </S.BackPage>
                    <S.FrontPage>
                        <S.PassportLeft></S.PassportLeft>
                    </S.FrontPage>
                </S.PageContainer>
                <S.PageContainer
                    onClick={() => handlePage(3)}
                    className={currentPage < 3 ? 'flipped' : null}
                    page="3"
                    currentPage={currentPage}>
                    <S.BackPage>
                        <S.PassportRight></S.PassportRight>
                    </S.BackPage>
                    <S.FrontPage>
                        <S.Test onClick={e => e.stopPropagation()}>
                            <S.Test2></S.Test2>
                        </S.Test>
                    </S.FrontPage>
                </S.PageContainer>
            </S.PassportConatiner>
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
            Number(props.currentPage) === Number(props.page)
                ? 100
                : Number(props.page) === 1 && Number(props.currentPage) === 1
                ? 99
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
                    ? props.theme.shadow.paperCoverLeftPage
                    : null};
            z-index: -100;
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
        padding: 104px 48px;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.color.main2};
        border-radius: 5px 32px 32px 5px;
        box-shadow: ${({ theme }) => theme.shadow.paperRightPage};
    `,
    CoverIconContainer: styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: auto;
        margin-bottom: 12px;
        & svg {
            width: 60px;
            height: 80px;
            color: white;
        }
    `,
    PassportTitle: styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.title3};
        color: white;
        margin: 12px 0 8px;
    `,
    TeamTitle: styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: auto;
        margin: 8px 0;
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        color: white;
    `,
    CoverPassportIconContainer: styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: auto;
        margin-top: 186px;
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
        background: url(${require('asset/images/passport-background1.png').default}),
            linear-gradient(0deg, #f8f9f9, #fffeeb);
        background-size: cover;
        box-shadow: ${({ theme }) => theme.shadow.paperLeftPage};
    `,
    PassportRight: styled.div`
        width: 420px;
        height: 628px;
        border-radius: 0 32px 32px 0;
        padding: 64px 64px 24px 32px;
        background: url(${require('asset/images/passport-background2.png').default}),
            linear-gradient(0deg, #f8f9f9, #fffeeb);
        background-size: cover;
        box-shadow: ${({ theme }) => theme.shadow.paperRightPage};
    `,
};

export default MyPage;
