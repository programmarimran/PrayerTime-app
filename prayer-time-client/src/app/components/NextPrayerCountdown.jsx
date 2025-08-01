"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

function convertTo12HourFormat(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function getNextPrayerTime(prayerTimes) {
  const now = new Date();
  const today = now.toISOString().split("T")[0]; // yyyy-mm-dd

  // Convert prayer times to Date objects for today
  const prayerDateTimes = Object.entries(prayerTimes).map(([name, time]) => {
    const [hour, minute] = time.split(":").map(Number);
    const dateTime = new Date(today);
    dateTime.setHours(hour, minute, 0, 0);
    return { name, dateTime };
  });

  // Find the next prayer after current time
  const upcomingPrayers = prayerDateTimes.filter(({ dateTime }) => dateTime > now);

  if (upcomingPrayers.length > 0) {
    return upcomingPrayers[0];
  }

  // If no more prayers today, return the first prayer tomorrow
  const firstPrayerTomorrow = prayerDateTimes[0];
  firstPrayerTomorrow.dateTime.setDate(firstPrayerTomorrow.dateTime.getDate() + 1);
  return firstPrayerTomorrow;
}

export default function NextPrayerCountdown() {
const [timings, setTimings] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

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

  useEffect(() => {
    if (!timings) return;

    const updateCountdown = () => {
      const next = getNextPrayerTime(timings);
      setNextPrayer(next);

      const now = new Date();
      const diffMs = next.dateTime - now;

      if (diffMs <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(diffMs / 1000 / 60 / 60);
      const minutes = Math.floor((diffMs / 1000 / 60) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [timings]);

  if (!nextPrayer) return null;

  return (
    <section className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg rounded-xl p-6 space-y-4  text-center">
      <h2 className="text-2xl font-bold">Next Prayer: {nextPrayer.name}</h2>
      <p className="text-xl">
        Time: {convertTo12HourFormat(nextPrayer.dateTime.toTimeString().slice(0, 5))}
      </p>
      <p className="text-4xl font-mono mt-4">{timeLeft}</p>
    </section>
  );
}
