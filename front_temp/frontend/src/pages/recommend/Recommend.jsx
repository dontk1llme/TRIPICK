import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as components from 'components';

const Recommend = () => {
    return (
        <S.Wrap>
            <components.Calendar />
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center; /* 세로 중앙 정렬 */
    `,
};
export default Recommend;
