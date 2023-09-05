import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import * as components from 'components';

const Layout = () => {
    return (
        <S.Wrap>
            <components.TopTab />
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
    `,
    Container: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
    `,
};

export default Layout;
