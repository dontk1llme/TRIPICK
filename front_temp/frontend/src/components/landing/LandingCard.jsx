import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import { TopTab } from 'components';

import { AiFillSafetyCertificate } from 'react-icons/ai';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { LiaChevronDownSolid } from 'react-icons/lia';

import LocationCard from './LocationCard';

import * as hooks from 'hooks';
import Opening from './Opening';

const LandingCard = () => {
    const { landingLocation } = hooks.landingState();
    const navigate = useNavigate();

    const scrollContainerRef = useRef(null);
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);

    const handleScrollToNext = () => {
        if (scrollContainerRef.current) {
            const nextScrollPosition = scrollContainerRef.current.scrollTop + window.innerHeight;
            scrollContainerRef.current.scrollTo({
                top: nextScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleScrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const handleContainerClick = () => {
        setIsScrollEnabled(true); // 클릭 시 스크롤 활성화 상태로 변경
    };

    return (
        <S.WholeContainer ref={scrollContainerRef} style={{ overflowY: isScrollEnabled ? 'scroll' : 'hidden' }}>
            <S.OpeningContainer>
                <Opening scrollContainerRef={scrollContainerRef} />
            </S.OpeningContainer>
            {landingLocation.map((location, index) => (
                <LocationCard
                    key={index}
                    locationData={location}
                    navigateToCalendar={() => navigate(utils.URL.RECOMMEND.CALENDAR)}
                    handleScrollToNext={handleScrollToNext}
                    handleScrollToTop={handleScrollToTop}
                    last={index === landingLocation.length - 1}
                />
            ))}
        </S.WholeContainer>
    );
};

const S = {
    WholeContainer: styled.div`
        overflow-y: scroll; /* 세로 스크롤 가능한 컨테이너로 설정 */
        scroll-snap-type: y mandatory; /* 세로 방향 스크롤 스냅을 활성화하고 필수로 설정 */
        height: 100vh; /* 컨테이너의 높이 설정 (화면 높이에 맞게 조절) */
        width: 100vw;
        overflow-x: hidden;
    `,
    OpeningContainer: styled.div`
        scroll-snap-align: start; /* 스크롤 정렬 설정 */
    `,
};

export default LandingCard;
