// components/PrayerCalendar.jsx
"use client";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Hijri from "hijri-date/lib/safe";
import { getMonthDays } from "../utils/getMonthDays";


const PrayerCalendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const daysInMonth = getMonthDays(currentDate);

  const handleDateClick = (date) => {
    onDateSelect(date.format("YYYY-MM-DD"));
  };

  return (
    <div className="w-full mx-auto p-4 shadow-lg rounded-xl bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>
          ◀️
        </button>
        <h2 className="text-lg font-semibold text-center">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>
          ▶️
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-sm text-gray-500">{day}</div>
        ))}

        {daysInMonth.map((dateObj, idx) => {
          const isToday = dateObj.date.isSame(dayjs(), "day");
          const hijri = new Hijri(dateObj.date.toDate());
          const hijriDay = hijri.getDate();

          return (
            <div
              key={idx}
              onClick={() => handleDateClick(dateObj.date)}
              className={`p-2 cursor-pointer rounded-md text-sm 
              ${isToday ? "bg-blue-500 text-white" : "hover:bg-blue-100 dark:hover:bg-gray-700"}
              ${dateObj.isCurrentMonth ? "text-black dark:text-white" : "text-gray-400"}
              `}
            >
              {dateObj.date.date()}
              <div className="text-[10px] text-gray-400">{hijriDay}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerCalendar;
