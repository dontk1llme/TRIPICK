import React from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';

import * as components from 'components';

const Layout = () => {
    const location = useLocation();
    return (
        <S.Wrap overflowHidden={location.pathname === '/mypage'}>
            <S.TopTabContainer>
                <components.TopTab />
            </S.TopTabContainer>
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
    `,
    TopTabContainer: styled.div`
        // position: fixed; /* 화면 상단에 고정 */
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000; /* 다른 요소 위에 표시하기 위한 z-index 설정 */
    `,
    Container: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
    `,
};

export default Layout;
