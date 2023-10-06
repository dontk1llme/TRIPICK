import React from 'react';
import styled from 'styled-components';
import * as components from 'components';

const Loading = () => {
    
    return (
        <S.Wrap>
            <components.LoadingCom/>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        margin: 60px 156px;
    `,
};

export default Loading;
