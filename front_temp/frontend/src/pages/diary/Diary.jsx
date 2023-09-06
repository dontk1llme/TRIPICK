import React from 'react';
import styled from 'styled-components';
import * as components from 'components';

const Diary = () => {
    return (
        <S.Wrap>
            <S.AlbumContainer>
                <components.DetailAlbum />
                <components.AlbumList />
            </S.AlbumContainer>
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
