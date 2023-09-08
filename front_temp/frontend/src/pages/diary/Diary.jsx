import React from 'react';
import styled from 'styled-components';
import * as components from 'components';
import * as hooks from 'hooks';

const Diary = () => {
    const { selectedAlbum } = hooks.albumState();

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
        margin: 0 156px;
    `,
    AlbumContainer: styled.div`
        display: flex;
        flex-direction: column;
    `,
};

export default Diary;
