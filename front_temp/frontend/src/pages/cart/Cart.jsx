import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { IoCart } from 'react-icons/io5';

const Cart = () => {
    const { cartLocation } = hooks.cartState();

    return (
        <S.Wrap>
            <S.TitleContainer>
                <S.Title>찜한 여행지</S.Title>
                <S.NavCompare>
                    <IoCart />
                    {cartLocation.length}
                </S.NavCompare>
            </S.TitleContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        margin: 0 156px;
        justify-content: center;
        align-items: center;
    `,
    TitleContainer: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
    `,
    Title: styled.div`
        width: 100%;
        display: flex;
        height: 110px;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.title3};
        color: ${({ theme }) => theme.color.black};
        white-space: nowrap;
    `,
    NavCompare: styled.div`
        display: flex;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ theme }) => theme.color.main1};
        & svg {
            height: 40px;
            width: 40px;
            color: ${({ theme }) => theme.color.main1};
        }
    `,
};

export default Cart;
