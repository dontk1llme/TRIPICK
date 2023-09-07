import React, { useState } from 'react';
import ReactCalendar from 'react-calendar'; // 다른 이름으로 import
import styles from './calendar.css';
import moment from "moment";
import {  IoCalendarClearSharp } from 'react-icons/io5';

const CalendarComponent = () => { // 함수 컴포넌트로 변경
    const [date, setDate] = useState(new Date());

    const formatDate = (date) => {
      console.log( moment(date).format("YYYY년 MM월 DD일"))
      return moment(date).format("YYYY년 MM월 DD일");
    };

    return (
      <div style={{ margin: '30px' }}>
      
        <div className='calendar'>
          {date.length > 0 ? (
            <p className='text-center'>
              {/* <span className='bold'>시작:</span>{' '} */}
              <IoCalendarClearSharp style={{marginRight: '10px'}} />
              {formatDate(date[0])} 
              &nbsp; - &nbsp;
              {/* <span className='bold'>끝:</span>  */}
              {formatDate(date[1])}
            </p>
          ) : (
            <p className='text-center'>
              <span className='bold'> 여행 날짜를 선택하세요</span>{' '}
            </p>
          )}
          <br></br>


          <div className='styles.calendarContainer'>
            <ReactCalendar
              onChange={setDate}
              value={date}
              selectRange={true}
              formatDay={(locale, date) => moment(date).format("DD")}
            />
          </div>
        </div>
      </div>
    );
  }
  

export default CalendarComponent;
