import React from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import * as components from 'components';

const MyStamps = ({ page }) => {
    const { stamp } = hooks.stampState();
    const isObtained = id => {
        const findStamp = stamp.find(stamp => stamp.id === id);
        return findStamp.obtained;
    };
    return (
        <S.Wrap onClick={e => e.stopPropagation()}>
            <S.StampContainer className="first">
                {isObtained(4 * (page - 1) + 1) ? (
                    <components.CollectedStamp id={4 * (page - 1) + 1} />
                ) : (
                    <components.EmptyStamp />
                )}
            </S.StampContainer>
            <S.StampContainer className="second">
                {isObtained(4 * (page - 1) + 2) ? (
                    <components.CollectedStamp id={4 * (page - 1) + 2} />
                ) : (
                    <components.EmptyStamp />
                )}
            </S.StampContainer>
            <S.StampContainer className="third">
                {isObtained(4 * (page - 1) + 3) ? (
                    <components.CollectedStamp id={4 * (page - 1) + 3} />
                ) : (
                    <components.EmptyStamp />
                )}
            </S.StampContainer>
            <S.StampContainer className="fourth">
                {isObtained(4 * (page - 1) + 4) ? (
                    <components.CollectedStamp id={4 * (page - 1) + 4} />
                ) : (
                    <components.EmptyStamp />
                )}
            </S.StampContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        position: relative;
        /* margin: 80px 32px; */
        width: 100%;
        height: 100%;
        z-index: inherit;
        & .first {
            position: absolute;
            top: 0px;
            left: 50px;
        }
        & .second {
            position: absolute;
            top: 140px;
            left: 200px;
        }
        & .third {
            position: absolute;
            top: 200px;
            left: 0px;
        }
        & .fourth {
            position: absolute;
            top: 340px;
            left: 180px;
        }
    `,
    StampContainer: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 160px;
        border-radius: 100%;
        /* background-color: black; */
    `,
};

export default MyStamps;
