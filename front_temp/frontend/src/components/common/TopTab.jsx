import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as utils from 'utils';

const TopTab = () => {
    const navigate = useNavigate();

    return (
        <S.Wrap>
            <S.Logo onClick={() => navigate(utils.URL.HOME.MAIN)}>상단탭</S.Logo>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        width: 100vw;
        padding: 0 60px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    Logo: styled.div`
        width: auto;
        height: auto;
        cursor: pointer;
    `,
};

export default TopTab;
