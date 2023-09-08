import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import styles from './calendar.css';
import moment from "moment";
import { IoCalendarClearSharp } from 'react-icons/io5';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    return moment(date).format("YYYY년 MM월 DD일");
  };

  // 첫 시작 시 이상한 border css를 고치려고 해 보았지만... 
  const tileContent = ({ date, view }) => {
    const isInRange = view === 'month' && date >= selectedDate[0] && date <= selectedDate[1];
    const tileClasses = []; // 기본 클래스 추가

    if (isInRange) {
      tileClasses.push('react-calendar__tile--custom-tile'); // 범위 내에 있는 경우 추가 클래스
    }

    return (
      <div className={tileClasses.join(' ')} />
    );
  };


  return (
    <div style={{ margin: '30px' }}>
      <div className='calendar'>
        {selectedDate.length > 0 ? (
          <p className='text-center'>
            <IoCalendarClearSharp style={{ marginRight: '10px' }} />
            {formatDate(selectedDate[0])}
            &nbsp; - &nbsp;
            {formatDate(selectedDate[1])}
          </p>
        ) : (
          <p className='text-center'>
            <span className='bold'> 여행 날짜를 선택하세요</span>
          </p>
        )}
        <br />

        <div className='styles.calendarContainer'>
          <ReactCalendar
            onChange={setSelectedDate}
            value={selectedDate}
            selectRange={true}
            formatDay={(locale, date) => moment(date).format("DD")}
            tileContent={tileContent} // tileContent 함수를 전달
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent;
