import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from '../../components/recommend/Calendar';


const Recommend = () => {

    return (
        <S.Wrap>
            <Calendar/>
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
