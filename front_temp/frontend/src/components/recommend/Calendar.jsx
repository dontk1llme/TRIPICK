import React, { useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import styles from './Calendar.css';
import moment from 'moment';

import * as hooks from 'hooks';
import styled from 'styled-components';

const CalendarComponent = () => {
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);

    const { selectedDate, setSelectedDate } = hooks.dateState();

    useEffect(() => {
        setSelectedDate([today, today]);
        if (selectedDate.length > 0) {
            console.log(selectedDate);
        }
    }, []);

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate]);
    // const [selectedDate, setSelectedDate] = useState([today, today]); // 초기 선택 날짜 설정

    const formatDate = date => {
        return moment(date).format('YYYY년 MM월 DD일');
    };

    // 첫 시작 시 이상한 border css를 고치려고 해 보았지만...
    const tileContent = ({ date, view }) => {
        const isInRange = view === 'month' && date >= today && date <= sixMonthsLater;
        const tileClasses = []; // 기본 클래스 추가

        if (isInRange) {
            tileClasses.push('react-calendar__tile--custom-tile'); // 범위 내에 있는 경우 추가 클래스
        }

        return <div className={tileClasses.join(' ')} />;
    };

    return (
        <S.Wrap>
            <ReactCalendar
                onChange={setSelectedDate}
                value={selectedDate}
                selectRange={true}
                formatDay={(locale, date) => moment(date).format('DD')}
                tileContent={tileContent} // tileContent 함수를 전달
                minDate={today} // 오늘 이후만 선택 가능하도록 설정
                maxDate={sixMonthsLater} // 6개월 이내까지만 표시
            />
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 438px;
        width: 100%;
        & .react-calendar {
            width: 500px;
            max-width: 100%;
            height: 350px;
            border-radius: 8px;
            color: ${({ theme }) => theme.color.black};
            box-shadow: ${({ theme }) => theme.shadow.card};
            line-height: 1.125em;
            background-color: ${({ theme }) => theme.color.white};
            /* border: 1px solid #a0a096; */
            border: none;
            & div {
                text-align: center;
                text-decoration: none;
            }
            & button {
                margin: 0;
                border: 0;
                outline: none;
                & :enabled :hover {
                    cursor: pointer;
                }
            }
            & .react-calendar__navigation {
                display: flex;
                height: 44px;
                margin-bottom: 1em;
                & > button {
                    color: ${({ theme }) => theme.color.main1};
                    min-width: 44px;
                    background: none;
                    margin-top: 8px;
                    font-weight: bold;
                    &:disabled {
                        opacity: 0;
                        pointer-events: none;
                    }
                    &:enabled :hover {
                        background-color: ${({ theme }) => theme.color.background};
                    }
                }
                & .react-calendar__navigation__label__labelText--from {
                    font-size: ${({ theme }) => theme.fontSize.content1};
                }
                & .react-calendar__navigation__arrow {
                    font-size: 24px;
                    &:hover {
                        color: ${({ theme }) => theme.color.main2};
                    }
                }

                & > abbr {
                    text-transform: uppercase;
                    font-weight: bold;
                    font-size: ${({ theme }) => theme.fontSize.content1};
                    text-decoration: none;
                }
            }
        }
        & .react-calendar__month-view {
            height: 100%;
            & > div {
                & > div {
                    height: 250px;
                }
            }
        }
        & .react-calendar__month-view__days {
            height: 250px;
        }
        & abbr {
            text-decoration: none;
        }
    `,
};

export default CalendarComponent;
