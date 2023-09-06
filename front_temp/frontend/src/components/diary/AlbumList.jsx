import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { IoAdd, IoFolder } from 'react-icons/io5';

const AlbumList = () => {
    const { selectedAlbum, setSelectedAlbum, albumList } = hooks.albumState();
    const containerRef = useRef(null);

    const handleSelectedAlbum = albumId => {
        if (selectedAlbum !== albumId) {
            setSelectedAlbum(albumId);
        } else {
            setSelectedAlbum('0');
        }
    };

    useEffect(() => {
        const handleWheel = e => {
            if (containerRef.current) {
                containerRef.current.scrollLeft += e.deltaY;
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <S.Wrap>
            <S.NewAlbumContainer>
                <S.NewAlbum>
                    새 기록
                    <IoAdd />
                </S.NewAlbum>
            </S.NewAlbumContainer>
            <S.AlbumListContainer ref={containerRef}>
                <S.AlbumList>
                    {albumList.map(album => {
                        return (
                            <S.AlbumPreview
                                key={album.albumId}
                                onClick={() => handleSelectedAlbum(album.albumId)}
                                selected={album.albumId === selectedAlbum ? 'selected' : null}>
                                <S.PreviewImg id="image">
                                    {album.imageUrl.length > 0 ? (
                                        <img src={album.imageUrl[0]} alt="album preview" />
                                    ) : (
                                        <IoFolder />
                                    )}
                                </S.PreviewImg>
                                <S.AlbumName>{album.albumName}</S.AlbumName>
                            </S.AlbumPreview>
                        );
                    })}
                </S.AlbumList>
            </S.AlbumListContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        width: 840px;
        height: 288px;
        margin: 12px 12px 0 0;
        padding: 0 48px;
        border-radius: 32px;
        background-color: white;
        box-shadow: ${({ theme }) => theme.shadow.card};
    `,
    AlbumListContainer: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            height: 5px;
            width: 0px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.color.gray};
            border-radius: 45px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: ${({ theme }) => theme.color.gray};
        }
    `,
    AlbumList: styled.div`
        display: flex;
        width: auto;
        height: 100%;
    `,
    NewAlbumContainer: styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: auto;
        margin: 16px 0 8px;
    `,
    NewAlbum: styled.div`
        display: flex;
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.content1};
        color: ${({ theme }) => theme.color.main1};
        cursor: pointer;

        &:hover {
            color: ${({ theme }) => theme.color.main2};
            & svg {
                color: ${({ theme }) => theme.color.main2};
            }
        }

        & svg {
            width: 18px;
            height: 18px;
            color: ${({ theme }) => theme.color.main1};
            margin-left: 4px;
        }
    `,
    AlbumPreview: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
        width: 184px;
        height: 213px;
        margin: 8px 16px 24px;

        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ selected, theme }) => (selected ? `${theme.color.main1}` : `${({ theme }) => theme.color.black}`)};
        & #image {
            border: ${({ selected, theme }) => (selected ? `2px solid ${theme.color.main1}` : 'none')};
        }
    `,
    AlbumName: styled.div`
        width: 100%;
        height: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `,
    PreviewImg: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin-bottom: 8px;
        width: 184px;
        height: 184px;
        border-radius: 16px;
        background-color: ${({ theme }) => theme.color.gray};
        &:hover {
            background-color: ${({ theme }) => theme.color.main1};
        }
        & > img {
            width: 100%;
            height: 100%;
        }
        & svg {
            width: 48px;
            height: 48px;
            color: white;
        }
    `,
};

export default AlbumList;
