import React, { useState } from 'react';
import ReactCalendar from 'react-calendar'; // 다른 이름으로 import
import styles from './calendar.css';
import moment from "moment";

const CalendarComponent = () => { // 함수 컴포넌트로 변경
    const [date, setDate] = useState(new Date());

  return (
    <div style={{ margin: '30px' }}>
    
      <div className='app'>
      <h1 className='text-center'>React Calendar with Range</h1>
      <div className='styles.calendarContainer'>
        <ReactCalendar
          onChange={setDate}
          value={date}
          selectRange={true}
          formatDay={(locale, date) => moment(date).format("DD")}
        />
      </div>
      {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
    </div>


      
    </div>
  );
}

export default CalendarComponent;
