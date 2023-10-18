import React, { useState } from 'react';
import { format, differenceInCalendarDays, addDays, isSunday } from 'date-fns';
import { defaultStartDate, defaultEndDate, validation } from './constants'

export const DatePicker = () => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleStartChange = (date) => {
    if (validation.isFutureSunday(date)) {
      setStartDate(date);
      if(!validation.isTwoYearsApart(date, endDate)){
        var nextEndDate = new Date(date);
        nextEndDate.setFullYear(nextEndDate.getFullYear() + 2);
        setEndDate(isSunday(nextEndDate) ? nextEndDate.setDate(nextEndDate.getDate() + 1) : nextEndDate);
      }
    } else {
      alert('Start date must be in the future and not a Sunday.');
    }
  }

  const handleEndChange = (date) => {
    if (validation.isTwoYearsApart(startDate, date) && !isSunday(date)) {
      setEndDate(date);
    } else {
      alert('End date must be at least two years apart from the start date and not a Sunday.');
    }
  }

  const countSundays = () => {
    if (startDate && endDate) {
      const daysBetween = differenceInCalendarDays(endDate, startDate);
      let sundayCount = 0;

      for (let i = 0; i <= daysBetween; i++) {
        const currentDate = addDays(startDate, i);
        if (isSunday(currentDate) && currentDate.getDate() < 28) {
          sundayCount++;
        }
      }

      return sundayCount;
    }

    return 0;
  };

  return (
    <div className='wrapper'>
      <h1>Range Date Picker</h1>
      <div className='component'>
        <label> Start Date
          <input
            value={format(startDate, 'yyyy-MM-dd')}
            type="date"
            onChange={(e) => handleStartChange(new Date(e.target.value))}
            className='component child'
          />
        </label>
        <label> End Date
          <input
            value={format(endDate, 'yyyy-MM-dd')}
            type="date"
            onChange={(e) => handleEndChange(new Date(e.target.value))}
            className='component child'
          />
        </label>
      </div>
      {startDate && endDate && (
        <div className='wrapper'>
          Number of Sundays between {format(startDate, 'yyyy-MM-dd')} and {format(endDate, 'yyyy-MM-dd')} (excluding Sundays on or after the 28th): 
          <div className='counter-wrapper'>
            <span className='counter text'>{countSundays()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
