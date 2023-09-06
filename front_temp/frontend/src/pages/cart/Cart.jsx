import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { IoMdCart } from 'react-icons/io';
import * as components from 'components';

const Cart = () => {
    const { cartLocation } = hooks.cartState();

    return (
        <S.Wrap>
            <S.TitleContainer>
                <S.Title>찜한 여행지</S.Title>
                <S.NavCompare>
                    <IoMdCart />
                    <S.CartCount>{cartLocation.length}</S.CartCount>
                </S.NavCompare>
            </S.TitleContainer>
            <S.PreviewContainer>
                {cartLocation.map(location => {
                    return <components.LocationPreview key={location.idx} place={location} />;
                })}
            </S.PreviewContainer>
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
        height: 40px;
        margin: 32px 0 36px 0;
        display: flex;
    `,
    Title: styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.title3};
        color: ${({ theme }) => theme.color.black};
        white-space: nowrap;
    `,
    NavCompare: styled.div`
        display: flex;
        align-items: center;

        position: relative;

        cursor: pointer;

        &:hover {
            & svg {
                color: ${({ theme }) => theme.color.main2};
            }
            & > div {
                color: ${({ theme }) => theme.color.main2};
                border-color: ${({ theme }) => theme.color.main2};
            }
        }
        & svg {
            height: 40px;
            width: 40px;
            color: ${({ theme }) => theme.color.main1};
        }
    `,
    CartCount: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        bottom: -1px;
        right: -1px;
        z-index: 1;

        background-color: ${({ theme }) => theme.color.background};
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ theme }) => theme.color.main1};
        width: 20px;
        height: 20px;
        border: 1px solid ${({ theme }) => theme.color.main1};
        border-radius: 100%;
    `,
    PreviewContainer: styled.div`
        display: flex;
    `,
};

export default Cart;
