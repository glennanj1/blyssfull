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

const CustomDatePicker = ({ onChange, disabled, serviceSelected, desc }) => {
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (serviceSelected) {
      getAvailableDate();
    } else {
      setStartDate(); // Reset the date when service is not selected
    }
  }, [serviceSelected]);

  const findNextAvailableDate = async (startDate, desc) => {
    console.log("start date >>>>>> " + startDate);
    let nextAvailableDate = getNextAvailableTime(startDate);
    console.log("nextAvailableDate >>>>>>> " + nextAvailableDate);
    console.log("before the await");
    let isDateAvailable = await checkAvailability(nextAvailableDate, desc);
    console.log("is Date Available >> " + isDateAvailable);
    if (isDateAvailable) {
      let newDate = getNextAvailableTime(addHours(nextAvailableDate, 1));
      console.log("newDate >>" + newDate);
      return findNextAvailableDate(newDate); // Recursively call the function with the new date
    } else {
      return startDate; // Found a valid available date
    }
  };

  const getNextDayOfWeek = (date, dayOfWeek) => {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));
    return resultDate;
  };

  const getAvailableDate = async () => {
    const initialDate = new Date(); // current date
    let nextAvailableDate;

    // If the current day is not Monday or Wednesday, find the next Monday or Wednesday
    if (initialDate.getDay() !== 1 && initialDate.getDay() !== 3) {
      const nextMonday = getNextDayOfWeek(initialDate, 1);
      const nextWednesday = getNextDayOfWeek(initialDate, 3);

      // Set the next available date to the earliest upcoming day (either next Monday or Wednesday)
      nextAvailableDate =
        nextMonday < nextWednesday ? nextMonday : nextWednesday;
    } else {
      nextAvailableDate = initialDate;
    }

    // Set the time to 9:00
    nextAvailableDate = setHours(setMinutes(nextAvailableDate, 0), 9);

    try {
      const nextAvailableTimeSlot = await findNextAvailableDate(nextAvailableDate, desc);
      setStartDate(nextAvailableTimeSlot);
      onChange(nextAvailableTimeSlot);
    } catch (error) {
      console.error("Error finding next available date:", error);
    }
  };

  const getNextAvailableTime = (date) => {
    let nextTime = new Date(date);
    // Loop until a valid time slot is found
    while (!filterPassedDateTime(nextTime)) {
      nextTime = addHours(nextTime, 1);

      // If the time reaches 16:00, set it to 18:00
      if (nextTime.getHours() === 16) {
        nextTime = setHours(setMinutes(nextTime, 0), 18);
      }

      // If the time reaches 22:00, set it to the next day at 09:00
      if (nextTime.getHours() === 22) {
        nextTime = setHours(setMinutes(addDays(nextTime, 1), 0), 9);
      }
    }

    return nextTime;
  };

  const filterPassedTime = (time) => {
    const selectedTime = new Date(time);
    return (
      (!isPast(selectedTime) || isAfter(selectedTime, new Date())) &&
      (isMonday(time) || isWednesday(time))
    );
  };

  const filterPassedDateTime = (time) => {
    return filterPassedTime(time) && filterTime(time);
  };

  const filterTime = (time) => {
    const hour = time.getHours();
    return (hour >= 9 && hour < 15) || (hour >= 18 && hour < 21);
  };

  const handleDateChange = (date) => {
    if (date && !isPast(date)) {
      // Check to make sure the date isn't in the past
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
      disabled={disabled}
    />
  );
};

export default CustomDatePicker;

async function checkAvailability(reqDate, reqDesc) {
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
    // display new error instead maybe?
    console.log("Error checking time slot");
  }
}
