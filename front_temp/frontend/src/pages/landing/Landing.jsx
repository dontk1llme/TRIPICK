import React from 'react';
import styled from 'styled-components';
import * as components from 'components';
import * as hooks from 'hooks';

const Landing = () => {

    return ( 
    <S.Wrap>
      <components.LandingCard/>
    </S.Wrap>);
};



const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
    `,
};

export default Landing;

