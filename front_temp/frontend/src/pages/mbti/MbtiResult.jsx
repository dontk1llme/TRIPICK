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
        width: 100%;
        height: 100%;
    `,
};

export default MbtiResult;
