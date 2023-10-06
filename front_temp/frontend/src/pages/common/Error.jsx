import React from 'react';
import styled from 'styled-components';
import * as components from 'components';

const Error = () => {
    
    return (
        <S.Wrap>
            <components.ErrorCom/>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
    `,
};

export default Error;
