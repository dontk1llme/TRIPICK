import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { IoIosHeartEmpty } from 'react-icons/io';

const LocationPreview = ({ place }) => {
    return (
        <S.Wrap>
            <S.PreviewImage image={place.imageUrl}>
                <S.CountryName>{place.country}</S.CountryName>
                {/* <S.CityContainer>
                    {place.city}
                    <IoIosHeartEmpty />
                </S.CityContainer> */}
                {place.city}
            </S.PreviewImage>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        height: auto;
        width: 330px;
        margin: 0 28px;
    `,
    PreviewImage: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 16px;
        width: 330px;
        height: 304px;
        background-image: url(${props => props.image});
        background-size: 100%;
    `,
    CountryName: styled.div`
        color: white;
        font-size: ${({ theme }) => theme.fontSize.content1};
    `,
    CityContainer: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: end;
    `,
};

export default LocationPreview;
