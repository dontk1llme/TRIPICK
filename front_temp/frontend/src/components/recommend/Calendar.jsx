import React, { useRef, useState } from 'react';
import ReactCalendar from 'react-calendar';
import styles from './calendar.css';
import moment from "moment";
import { IoCalendarClearSharp } from 'react-icons/io5';

const CalendarComponent = () => {
  const today = new Date();
  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(today.getMonth() + 6);

  const [selectedDate, setSelectedDate] = useState([today, today]); // 초기 선택 날짜 설정

  const formatDate = (date) => {
    return moment(date).format("YYYY년 MM월 DD일");
  };

  // 첫 시작 시 이상한 border css를 고치려고 해 보았지만...
  const tileContent = ({ date, view }) => {
    const isInRange = view === 'month' && date >= today && date <= sixMonthsLater;
    const tileClasses = []; // 기본 클래스 추가

    if (isInRange) {
      tileClasses.push('react-calendar__tile--custom-tile'); // 범위 내에 있는 경우 추가 클래스
    }

    return (
      <div className={tileClasses.join(' ')} />
    );
  };

  useRef

  return (
    <div style={{ margin: '30px' }}>
      <div className='calendar'>
        <p className='text-center'>
          <IoCalendarClearSharp style={{ marginRight: '10px' }} />
          {formatDate(selectedDate[0])}
          
          {selectedDate[1]!=selectedDate[0] ? ' - ' + formatDate(selectedDate[1]) : ''}
        </p>
        <br />

        <div className='styles.calendarContainer'>
          <ReactCalendar
            onChange={setSelectedDate}
            value={selectedDate}
            selectRange={true}
            formatDay={(locale, date) => moment(date).format("DD")}
            tileContent={tileContent} // tileContent 함수를 전달
            minDate={today} // 오늘 이후만 선택 가능하도록 설정
            maxDate={sixMonthsLater} // 6개월 이내까지만 표시
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent;