import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as utils from 'utils';

const TopTab = () => {
    const navigate = useNavigate();

    return (
        <S.Wrap>
            <S.Logo onClick={() => navigate(utils.URL.HOME.MAIN)}>
                <img src={require('asset/images/logo.png').default} alt="logo" />
            </S.Logo>
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
        & > img {
            width: auto;
            max-height: 32px;
        }
    `,
};

export default TopTab;
