import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { IoAdd } from 'react-icons/io5';

const DetailAlbum = () => {
    const { selectedAlbum, albumList } = hooks.albumState();
    const [selectedAlbumDetail, setSelectedAlbumDetail] = useState({
        albumId: null,
        albumName: null,
        imageUrl: [],
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log(selectedAlbum);
        const findAlbum = albumList.find(album => album.albumId === selectedAlbum);
        setSelectedAlbumDetail(findAlbum);
    }, [selectedAlbum]);

    useEffect(() => {
        console.log(selectedAlbumDetail);
    }, [selectedAlbumDetail]);

    const handleFileUpload = event => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        setSelectedFile(fileArray);
    };

    useEffect(() => {
        console.log(selectedFile);
    }, [selectedFile]);

    return (
        <S.Wrap>
            {selectedAlbum === '0' ? null : selectedAlbumDetail ? (
                <S.Container>
                    <S.AlbumTitle>
                        {selectedAlbumDetail.albumName} ({selectedAlbumDetail.imageUrl.length})
                        <label for="file">
                            <S.AddImageButton>
                                <IoAdd />
                            </S.AddImageButton>
                        </label>
                        <input type="file" id="file" multiple onChange={handleFileUpload}></input>
                    </S.AlbumTitle>
                    <S.AlbumImages>
                        <S.ImagesContainer>
                            {selectedAlbumDetail.imageUrl.map((image, index) => {
                                return (
                                    <S.ImageContainer key={index}>
                                        <img src={image} alt="이미지" />
                                    </S.ImageContainer>
                                );
                            })}
                        </S.ImagesContainer>
                    </S.AlbumImages>
                </S.Container>
            ) : (
                'Loading...'
            )}
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        width: 840px;
        height: 336px;
        margin: 0 12px 12px 0;
        background-color: white;
        border-radius: 32px;
        box-shadow: ${({ theme }) => theme.shadow.card};
    `,
    Container: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 40px 60px 32px;
    `,
    AlbumTitle: styled.div`
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 28px;
        margin-bottom: 28px;
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        color: ${({ theme }) => theme.color.black};
        & > input {
            display: none;
        }
    `,
    AddImageButton: styled.div`
        height: 28px;
        width: 28px;
        cursor: pointer;
        & svg {
            height: 100%;
            width: 100%;
            color: ${({ theme }) => theme.color.main1};
            &:hover {
                color: ${({ theme }) => theme.color.main2};
            }
        }
    `,
    AlbumImages: styled.div`
        width: 100%;
        height: 209px;
        overflow-x: auto;
        &::-webkit-scrollbar {
            height: 0px;
            width: 4px;
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
    ImagesContainer: styled.div`
        display: grid;
        width: 100%;
        height: auto;
        grid-template-columns: repeat(auto-fill, minmax(20%, auto));
    `,
    ImageContainer: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        aspect-ratio: 1/1;
        cursor: pointer;
        & > img {
            width: 100%;
            height: 100%;
        }
    `,
};

export default DetailAlbum;
