import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as components from 'components';
import * as api from 'api';
import * as hooks from 'hooks';

const Landing = () => {
    const { landingLocation, setLandingLocation } = hooks.landingState();
    useEffect(() => {
        api.apis
            .getNowRecommendations()
            .then(response => {
                setLandingLocation(Object.values(response.data));
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <S.Wrap>
            <components.LandingCard />
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

export default Landing;
