import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as components from 'components';
import * as hooks from 'hooks';
import * as api from 'api';
import { useCountriesData } from '/src/components/diary/CountryContext';

const krdata = require('world_countries_lists/data/countries/ko/countries.json');

const Diary = () => {
    const { selectedAlbum, setSelectedCountry } = hooks.albumState();
    const { memberId } = hooks.loginUserState();

    useEffect(() => {
        api.apis
            .getNations(memberId)
            .then(response => {
                setSelectedCountry(response.data);
            })
            .catch(error => console.log(error));
    },[]);

    return (
        <S.Wrap>
            <S.AlbumContainer>
                {selectedAlbum === '0' ? <components.WorldMap /> : <components.DetailAlbum />}
                {/* <components.DetailAlbum /> */}
                <components.AlbumList />
            </S.AlbumContainer>

            <components.CountryList />
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
    AlbumContainer: styled.div`
        display: flex;
        flex-direction: column;
    `,
};

export default Diary;
