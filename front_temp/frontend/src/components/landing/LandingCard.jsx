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
        position: relative;
        width: 100%;
        height: 100%;
    `,

    LeftContainer: styled.div`
        flex: 60%;
    `,
    RightContainer: styled.div`
        flex: 40%;
    `,

    Image: styled.img`
        width: 900px;
        height: 750px;
        top: 0;
        // object-fit: cover; /* 이미지를 가득 채우도록 설정 */
    `
};



export default LandingCard;
