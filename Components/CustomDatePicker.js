// Importing necessary libraries and components
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  isPast,
  isMonday,
  isWednesday,
  setHours,
  setMinutes,
  addDays,
  addHours,
  isAfter,
} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Function to check availability of a date from an API
async function checkAvailability(reqDate, reqDesc) {
  try {
    const response = await fetch("/api/checkDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reqDate, reqDesc }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.isWithinTimeSlots;
    } else {
      console.error("Error checking time slot");
    }
  } catch (error) {
    console.error("Error in checking availability:", error);
  }
}

// CustomDatePicker component
const CustomDatePicker = ({ onChange, disabled, serviceSelected, desc }) => {
  // startDate state for DatePicker
  const [startDate, setStartDate] = useState(null);

  // useEffect to update available date whenever serviceSelected changes
  useEffect(() => {
    serviceSelected ? getAvailableDate() : setStartDate(null);
  }, [serviceSelected]);

  // Recursive function to find the next available date
  const findNextAvailableDate = async (date, desc) => {
    let nextAvailableDate = getNextAvailableTime(date);
    let isDateAvailable = await checkAvailability(nextAvailableDate, desc);

    // If date is not available, add an hour and check again
    if (isDateAvailable) {
      let newDate = getNextAvailableTime(addHours(nextAvailableDate, 1));
      return findNextAvailableDate(newDate, desc);
    } else {
      return date;
    }
  };

  // Function to get the next date of a specific day of the week
  const getNextDayOfWeek = (date, dayOfWeek) => {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));
    return resultDate;
  };

  // Function to get the available date
  const getAvailableDate = async () => {
    const initialDate = new Date();
    let nextAvailableDate =
      initialDate.getDay() === 1 || initialDate.getDay() === 3
        ? initialDate
        : getNextDayOfWeek(initialDate, initialDate.getDay() === 1 ? 3 : 1);

    nextAvailableDate = setHours(setMinutes(nextAvailableDate, 0), 9);

    try {
      const nextAvailableTimeSlot = await findNextAvailableDate(nextAvailableDate, desc);
      setStartDate(nextAvailableTimeSlot);
      onChange(nextAvailableTimeSlot);
    } catch (error) {
      console.error("Error finding next available date:", error);
    }
  };

  // Function to get the next available time
  const getNextAvailableTime = (date) => {
    let nextTime = new Date(date);
    while (!filterPassedDateTime(nextTime)) {
      nextTime = addHours(nextTime, 1);
      if (nextTime.getHours() === 16) nextTime = setHours(setMinutes(nextTime, 0), 18);
      if (nextTime.getHours() === 22) nextTime = setHours(setMinutes(addDays(nextTime, 1), 0), 9);
    }
    return nextTime;
  };

  // Function to filter out past times and non-Monday/Wednesday
  const filterPassedTime = (time) => !isPast(time) && (isMonday(time) || isWednesday(time));

  // Function to filter times outside the allowed time slots
  const filterTime = (time) => {
    const hour = time.getHours();
    return (hour >= 9 && hour < 15) || (hour >= 18 && hour < 21);
  };

  // Function to filter both past dates and times outside the allowed time slots
  const filterPassedDateTime = (time) => filterPassedTime(time) && filterTime(time);

  // Function to handle date change event
  const handleDateChange = (date) => {
    if (date && !isPast(date)) {
      setStartDate(date);
      onChange(date);
    } else {
      setStartDate(null);
    }
  };

  // DatePicker component
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
      disabled={disabled}
    />
  );
};

export default CustomDatePicker;
