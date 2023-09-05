import React from 'react';
import styled from 'styled-components';

const TopTab = () => {
    return <S.Wrap>상단탭</S.Wrap>;
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
};

export default TopTab;
