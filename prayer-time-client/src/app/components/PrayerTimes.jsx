"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

function convertTo12HourFormat(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function PrayerTimes() {
  const [timings, setTimings] = useState(null);

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
  if (!timings) return null;

  return (
  <section className="relative   shadow-lg rounded-xl p-6 space-y-4 mt-8"  >
 
  {/* Content */}
  <div className="relative z-10">
    <h2 className="text-2xl text-white font-bold text-center mb-4 z-50">🕌 Prayer Times</h2>
     {/* Overlay */}
  <div className="absolute inset-0 bg-black/40 rounded-xl pointer-events-none z-20" />

    <ul
      className=" text-black text-2xl font-bold bg-cover bg-center bg-no-repeat divide-y divide-gray-300 dark:divide-gray-700 bg-white/80 dark:bg-gray-800/60 rounded-xl p-4"
     style={{ backgroundImage: "url('/image/locations-map.png')" }}
    >
      {Object.entries(timings).map(([name, time]) => (
        <li
          key={name}
          className="flex justify-between py-2 text-lg capitalize"
        >
          <span>{name.replace("_", " ")}</span>
          <span>{convertTo12HourFormat(time)}</span>
        </li>
      ))}
    </ul>
  </div>
</section>

  );
}
