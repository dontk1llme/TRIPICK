import React, { useState } from 'react';
import styled from 'styled-components';

const MyPage = () => {
    const [currentPage, setCurrentPage] = useState('0');
    const handlePage = page => {
        if (currentPage < page) {
            setCurrentPage(page);
        } else {
            setCurrentPage(page - 1);
        }
    };
    return (
        <S.Wrap>
            <S.PassportConatiner>
                <S.PageContainer onClick={() => handlePage(1)} className={currentPage < 1 ? 'flipped' : null}>
                    <S.FrontPage>
                        <S.Test onClick={e => e.stopPropagation()}></S.Test>
                    </S.FrontPage>
                    <S.BackPage></S.BackPage>
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
    `,
    PassportConatiner: styled.div`
        position: relative;
        perspective: 1200px;
        width: 840px;
        height: 628px;
        border-radius: 32px;
        box-shadow: ${({ theme }) => theme.shadow.paperTotalPage};
        & .flipped {
            transform: rotateY(180deg);
        }
    `,
    PageContainer: styled.div`
        position: absolute;
        width: 420px;
        height: 628px;
        transform-style: preserve-3d;
        transition: transform 0.8s;
        transform-origin: right;
    `,
    FrontPage: styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        background-color: red;
    `,
    BackPage: styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        background-color: blue;
    `,
    Test: styled.div`
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: white;
    `,
};

export default MyPage;
