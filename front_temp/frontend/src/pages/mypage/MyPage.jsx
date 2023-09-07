import React from 'react';
import styled from 'styled-components';

const MyPage = () => {
    return <S.Wrap>mypage</S.Wrap>;
};

const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        margin: 0 156px;
    `,
};

export default MyPage;
