import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';

import * as components from 'components';
import * as hooks from 'hooks';

const Layout = () => {
    const location = useLocation();
    const { view } = hooks.modalState();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (view) {
            setScrollY(window.scrollY);
        }
    }, [view]);
    return (
        <S.Wrap overflowHidden={location.pathname === '/mypage'}>
            <S.TopTabContainer>
                <components.TopTab />
            </S.TopTabContainer>
            {view && (
                <S.Modal scrollY={scrollY}>
                    <components.Modal />
                </S.Modal>
            )}
            <S.Container>
                <Outlet />
            </S.Container>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        width: 100%;
        min-height: 100vh;
        height: 100%;
        background-color: ${({ theme }) => theme.color.background};
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: start;
        overflow-x: hidden;
        overflow-y: ${({ overflowHidden }) => (overflowHidden ? 'hidden' : 'auto')};
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Microsoft Edge */
        &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
        }
    `,
    Modal: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: ${({ scrollY }) => scrollY + 'px'};
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 1000;
    `,
    TopTabContainer: styled.div`
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000; /* 다른 요소 위에 표시하기 위한 z-index 설정 */
        position: fixed; // 얘 하나 추가함
    `,
    Container: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
    `,
};

export default Layout;
