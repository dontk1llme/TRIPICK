import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import * as api from 'api';
import { IoAdd, IoFolder, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { apis } from 'api';

const AlbumList = () => {
    const { selectedAlbum, setSelectedAlbum, albumList, setAlbumList, currentCountry } = hooks.albumState();
    const { memberId } = hooks.loginUserState();
    const containerRef = useRef(null);
    const albumNameRef = useRef(null);
    const albumNameRefs = useRef([]);
    const addAlbumRef = useRef(null);
    const newAlbumRef = useRef(null);

    const [albumName, setAlbumName] = useState('');
    const [addAlbumMode, setAddAlbumMode] = useState(false);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [editingAlbumId, setEditingAlbumId] = useState(null);
    const [editingAlbumName, setEditingAlbumName] = useState('');

    const handleSelectedAlbum = albumId => {
        if (selectedAlbum !== albumId) {
            setSelectedAlbum(albumId);
        } else {
            setSelectedAlbum('0');
        }
    };

    useEffect(() => {
    }, [selectedAlbum]);

    const animateScroll = (element, targetScroll, duration) => {
        const startScroll = element.scrollLeft;
        const distance = targetScroll - startScroll;
        let startTime = null;

        const animation = currentTime => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                element.scrollLeft = startScroll + distance * progress;
                requestAnimationFrame(animation);
            } else {
                element.scrollLeft = targetScroll;
            }
        };

        requestAnimationFrame(animation);
    };

    const handleNewAlbum = () => {
        setAddAlbumMode(!addAlbumMode);
        if (addAlbumMode && containerRef.current) {
            const targetScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            animateScroll(containerRef.current, targetScroll, 200);
        }
    };

    const handleRightClick = (e, album) => {
        e.preventDefault();

        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            album,
        });
    };

    const handleDeleteAlbum = albumId => {
        api.apis
            .deleteAlbum(albumId)
            .then(response => {
                api.apis.getNationRecord(memberId, currentCountry).then(response => setAlbumList(response.data));
            })
            .catch(error => console.log(error));

        setContextMenu({ ...contextMenu, visible: false });
    };

    const ContextMenu = ({ position, album, onClose }) => {
        return (
            <S.ContextMenuWrapper style={{ top: position.y, left: position.x }} onClick={e => e.stopPropagation()}>
                <S.AlbumEdit onClick={() => handleDeleteAlbum(album.tripRecordId)}>삭제</S.AlbumEdit>
                <S.Line />
                <S.AlbumEdit onClick={() => handleEditAlbum(album.tripRecordId)}>수정</S.AlbumEdit>
            </S.ContextMenuWrapper>
        );
    };

    const handleSaveNewAlbum = async () => {
        const data = {
            memberId: memberId,
            nationName: currentCountry,
            content: albumName,
        };

        await api.apis
            .createRecord(data)
            .then(response => {
                console.log(response);
                console.log(response.data);
                api.apis
                    .getNationRecord(memberId, currentCountry)
                    .then(response => {
                        setAlbumList(response.data);
                        setAddAlbumMode(false);
                        setAlbumName('');
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    const handleAlbumNameChange = e => {
        if (e.key === 'Enter') {
            handleSaveNewAlbum();
        } else {
            setAlbumName(e.target.value);
        }
    };

    const handleEditKeyDown = (e, albumId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleEditAlbumName(albumId);
            setEditingAlbumId(null);
        }
    };

    const handleEditAlbumName = albumId => {
        const data = {
            tripRecordId: editingAlbumId,
            content: editingAlbumName,
        };
        api.apis
            .editAlbum(data)
            .then(response => {
                console.log(response);
                setEditingAlbumId(null);
                setEditingAlbumName('');
                api.apis
                    .getNationRecord(memberId, currentCountry)
                    .then(response => {
                        setAlbumList(response.data);
                        console.log(response.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    const handleEditAlbum = albumId => {
        setEditingAlbumId(albumId);
        setContextMenu(false);
        setTimeout(() => {
            albumNameRefs.current[albumId] && albumNameRefs.current[albumId].focus();
        }, 0);
    };

    useEffect(() => {
        if (addAlbumMode) {
            albumNameRef.current.focus();
        }
    }, [addAlbumMode]);

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

    useEffect(() => {
        const handleOutsideClick = e => {
            if (contextMenu.visible) {
                setContextMenu({ ...contextMenu, visible: false });
                setEditingAlbumId(null);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [contextMenu]);

    useEffect(() => {
        const handleOutsideClick = e => {
            if (
                editingAlbumId &&
                albumNameRefs.current[editingAlbumId] &&
                !albumNameRefs.current[editingAlbumId].contains(e.target)
            ) {
                setEditingAlbumId(null);
            }
            if (contextMenu.visible) {
                setContextMenu({ ...contextMenu, visible: false });
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [contextMenu, editingAlbumId]);

    useEffect(() => {
        const handleOutsideClick = e => {
            if (
                addAlbumMode &&
                addAlbumRef.current &&
                !addAlbumRef.current.contains(e.target) &&
                !newAlbumRef.current.contains(e.target)
            ) {
                setAddAlbumMode(false);
                setAlbumName('');
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [addAlbumMode]);

    useEffect(() => {
        if (editingAlbumId) {
            setEditingAlbumName(albumList.find(album => album.tripRecordId === editingAlbumId).content);
        }
    }, [editingAlbumId]);

    return (
        <S.Wrap>
            <S.NewAlbumContainer onClick={handleNewAlbum} ref={newAlbumRef}>
                <S.NewAlbum>
                    새 기록
                    <IoAdd />
                </S.NewAlbum>
            </S.NewAlbumContainer>
            <S.AlbumListContainer ref={containerRef}>
                <S.AlbumList>
                    {albumList.length > 0 ? (
                        albumList.map(album => {
                            return (
                                <S.AlbumPreview
                                    key={album.tripRecordId}
                                    selected={album.tripRecordId === selectedAlbum ? 'selected' : null}>
                                    <S.PreviewImg
                                        id="image"
                                        onContextMenu={e => handleRightClick(e, album)}
                                        onClick={() => handleSelectedAlbum(album.tripRecordId)}>
                                        {album.images.length > 0 ? (
                                            <img src={album.images[0].imageUrl} alt="album preview" />
                                        ) : (
                                            <IoFolder />
                                        )}
                                        {album.tripRecordId === selectedAlbum ? (
                                            <S.CheckSelectedAlbum>
                                                <IoCheckmarkCircleOutline />
                                            </S.CheckSelectedAlbum>
                                        ) : null}
                                    </S.PreviewImg>
                                    {contextMenu.visible && (
                                        <ContextMenu
                                            position={{ x: contextMenu.x, y: contextMenu.y }}
                                            album={contextMenu.album}
                                            onClose={() => setContextMenu({ ...contextMenu, visible: false })}
                                        />
                                    )}
                                    {editingAlbumId === album.tripRecordId ? (
                                        <S.EditingAlbumName
                                            ref={el => (albumNameRefs.current[album.tripRecordId] = el)}
                                            value={editingAlbumName}
                                            onKeyDown={e => handleEditKeyDown(e, album.tripRecordId)}
                                            onChange={e => setEditingAlbumName(e.target.value)}></S.EditingAlbumName>
                                    ) : (
                                        <S.AlbumName>{album.content}</S.AlbumName>
                                    )}
                                </S.AlbumPreview>
                            );
                        })
                    ) : (
                        <S.EmptyCountryAlbum>앨범이 없습니다. </S.EmptyCountryAlbum>
                    )}
                </S.AlbumList>
                {addAlbumMode && (
                    <S.AddAlbumContainer ref={addAlbumRef}>
                        <svg
                            width="184"
                            height="184"
                            viewBox="0 0 184 184"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleSaveNewAlbum}>
                            <rect
                                x="0.5"
                                y="0.5"
                                width="183"
                                height="183"
                                rx="15.5"
                                fill="white"
                                stroke="#8390FA"
                                stroke-dasharray="8 8"
                            />
                            <path
                                d="M108 95.2857H94.2857V109H89.7143V95.2857H76V90.7143H89.7143V77H94.2857V90.7143H108V95.2857Z"
                                fill="#8390FA"
                            />
                        </svg>
                        <S.NewAlbumName
                            type="text"
                            ref={albumNameRef}
                            onKeyDown={handleAlbumNameChange}
                            onChange={e => setAlbumName(e.target.value)}
                            placeholder="앨범 제목을 입력하세요. "></S.NewAlbumName>
                    </S.AddAlbumContainer>
                )}
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
        width: 184px;
        height: 213px;
        margin: 8px 16px 24px;

        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ selected, theme }) => (selected ? `${theme.color.main1}` : `${({ theme }) => theme.color.black}`)};
        & #image {
            border: ${({ selected, theme }) => (selected ? `2px solid ${theme.color.main1}` : 'none')};
        }

        &:hover {
            & #image {
                border: 2px solid ${({ theme }) => theme.color.main1};
            }
        }
    `,
    // AlbumName: styled.input`
    //     border: none;
    //     outline: none;
    //     font: inherit;
    //     font-size: ${({ theme }) => theme.fontSize.content1};
    //     width: 100%;
    //     height: auto;
    //     overflow: hidden;
    //     white-space: nowrap;
    //     text-overflow: ellipsis;
    //     font-size: ${({ theme }) => theme.fontSize.content2};
    // `,
    AlbumName: styled.div`
        font-size: ${({ theme }) => theme.fontSize.content1};
        width: 100%;
        height: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `,
    EditingAlbumName: styled.input`
        border: none;
        outline: none;
        font: inherit;
        font-size: ${({ theme }) => theme.fontSize.content1};
        width: 100%;
        height: auto;
        overflow: hidden;
        white-space: nowrap;
    `,
    PreviewImg: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
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
    CheckSelectedAlbum: styled.div`
        position: absolute;
        width: auto;
        height: auto;
        border-radius: 100%;
        background-color: ${({ theme }) => theme.color.main1};
        & svg {
            color: ${({ theme }) => theme.color.highlight};
        }
    `,
    AddAlbumContainer: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 184px;
        height: 213px;
        margin: 8px 16px 24px;
        & svg {
            cursor: pointer;
            &:hover {
                & rect {
                    stroke: ${({ theme }) => theme.color.main2};
                }
                & path {
                    fill: ${({ theme }) => theme.color.main2};
                }
            }
        }
    `,
    NewAlbumName: styled.input`
        border: none;
        outline: none;
        font: inherit;
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ theme }) => theme.color.main1};
        margin-top: 8px;
    `,
    ContextMenuWrapper: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        position: absolute;
        width: 72px;
        height: 58px;
        background-color: ${({ theme }) => theme.color.white};
        border-radius: 8px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        z-index: 10;
    `,
    AlbumEdit: styled.div`
        width: auto;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.sub};
        color: ${({ theme }) => theme.color.black};
        cursor: pointer;
        &:hover {
            color: ${({ theme }) => theme.color.main1};
        }
    `,
    Line: styled.div`
        content: '';
        background-color: ${({ theme }) => theme.color.black};
        width: 60px;
        height: 0.5px;
    `,
    EmptyCountryAlbum: styled.div`
        font-size: ${({ theme }) => theme.fontSize.content1};
    `,
};

export default AlbumList;
