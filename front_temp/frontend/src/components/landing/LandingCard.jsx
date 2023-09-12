import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';

const LandingCard = ({ location }) => {
    const { landingLocation } = hooks.landingState();
    const templocation = landingLocation[0];


    return (
        <S.LocationContainer>
            <S.LeftContainer>
            <div>
                    <S.Image src={templocation.imageUrl} alt={templocation.city} />
                </div>
            </S.LeftContainer>

            <S.RightContainer>
                <div>
                    <h2>{templocation.city}, {templocation.country}</h2>
                    <p>온도: {templocation.estimatedClimate}°C</p>
                    <p>환율: {templocation.estimatedExchangeRate} {templocation.currency}</p>
                    <p>안전도: {templocation.safety}</p>
                </div>
            </S.RightContainer>
        </S.LocationContainer>
    );
};

const S = {
    LocationContainer: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        `,
        
    LeftContainer: styled.div`
        position: relative;
        flex: 60%;
    `,
    RightContainer: styled.div`
        flex: 40%;
    `,

    Image: styled.img`
        width: 900px;
        height: 690px;
        position: absolute; /* absolute 포지션 설정 */
        top: 0;
        left: 0; //toptab으로 못 넘어감. . .
    `
};

export default LandingCard;
