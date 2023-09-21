import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

const MbtiResult = () => {
    const { result } = hooks.mbtiState();
    return <S.Wrap>{result}</S.Wrap>;
};

const S = {
    Wrap: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.title1};
        width: 100vw;
        height: 100vh;
    `,
};

export default MbtiResult;
