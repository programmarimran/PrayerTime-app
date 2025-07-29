"use client";

import { useEffect, useState } from "react";
import axiosInstance from "./utils/axios";

function convertTo12HourFormat(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function HomePrayerTimes() {
  const [timings, setTimings] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get user's current geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axiosInstance.get(
              `/prayer-time/coords?lat=${latitude}&lon=${longitude}`
            );
            setTimings(response.data);
          } catch (err) {
            console.error(err);
            setError("Failed to load prayer times");
          }
        },
        (err) => {
          console.error(err);
          setError("Location permission denied");
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  if (error) return <p className="text-red-600 text-center">{error}</p>;

  if (!timings)
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Loading prayer times...
      </p>
    );

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg rounded-xl p-6 space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-center">
        🕌 Your Local Prayer Times
      </h2>
      <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {Object.entries(timings).map(([name, time]) => (
          <li key={name} className="flex justify-between py-2 text-lg">
            <span>{name}</span>
            <span>{convertTo12HourFormat(time)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
