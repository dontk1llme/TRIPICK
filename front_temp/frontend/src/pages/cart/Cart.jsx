import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

import * as hooks from 'hooks';
import { AiFillStar } from 'react-icons/ai';
import * as components from 'components';

const Cart = () => {
    const { cartLocation, compareLocation } = hooks.cartState();
    const { viewDetail } = hooks.detailState();
    const navigate = useNavigate();
    const [compareAmount, setCompareAmount] = useState(0);

    useEffect(() => {
        const count = compareLocation.filter(value => value !== -1).length;
        setCompareAmount(count);
    }, [compareLocation]);

    return (
        <S.Outer>
            {!viewDetail ? (
                <S.Wrap>
                    <S.TitleContainer>
                        <S.Title>찜한 여행지</S.Title>
                        <S.NavCompare>
                            <AiFillStar onClick={() => navigate(utils.URL.CART.COMPARE)} />
                            <S.CartCount>{compareAmount}</S.CartCount>
                        </S.NavCompare>
                    </S.TitleContainer>
                    <S.PreviewContainer>
                        {cartLocation.map(location => {
                            return <components.LocationPreview key={location.idx} place={location} type="cart" />;
                        })}
                    </S.PreviewContainer>
                </S.Wrap>
            ) : (
                <components.LocationDetail />
            )}
        </S.Outer>
    );
};

const S = {
    Outer: styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    `,
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 80%;
        justify-content: center;
        align-items: center;
    `,
    TitleContainer: styled.div`
        width: 100%;
        height: 40px;
        margin: 32px 0 48px 0;
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
        bottom: -3px;
        right: -4px;
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
        margin-bottom: 40px;
        width: 90%;
        height: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(330px, calc(100% / 3 - 32px * 2 / 3)));
        grid-gap: 32px;
    `,
};

export default Cart;
