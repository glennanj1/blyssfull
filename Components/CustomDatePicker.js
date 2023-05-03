// components/CustomDatePicker.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { isPast, isMonday, isWednesday, setHours, setMinutes, addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    let nextAvailableDate = new Date();
    while (!filterPassedTime(nextAvailableDate)) {
      nextAvailableDate = addDays(nextAvailableDate, 1);
    }
    setStartDate(nextAvailableDate);
  }, []);

  const filterPassedTime = (time) => {
    const currentTime = new Date();
    const selectedTime = new Date(time);

    return !isPast(selectedTime) && (isMonday(time) || isWednesday(time));
  };

  const filterTime = (time) => {
    const hour = time.getHours();
    return (hour >= 9 && hour < 15) || (hour >= 18 && hour < 21);
  };

  const handleDateChange = (date) => {
    if (date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();

      if (hours !== 0 || minutes !== 0) {
        setStartDate(date);
        onChange(date);
      } else {
        setStartDate(null);
      }
    } else {
      setStartDate(null);
    }
  };

  return (
    <DatePicker
      required
      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 z-200"
      selected={startDate}
      onChange={handleDateChange}
      showTimeSelect
      filterDate={filterPassedTime}
      filterTime={filterTime}
      minTime={setHours(setMinutes(new Date(), 0), 9)}
      maxTime={setHours(setMinutes(new Date(), 0), 21)}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select a date and time"
    />
  );
};

export default CustomDatePicker;
