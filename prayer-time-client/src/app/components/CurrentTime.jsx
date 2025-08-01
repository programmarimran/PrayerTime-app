"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";

const CurrentTime = () => {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("Your Location");

  useEffect(() => {
    // Time Update Every Second
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-BD", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    }, 1000);

    // Geolocation (Optional)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || "Your Area";
            setLocation(city);
          } catch {
            setLocation("Unknown Area");
          }
        },
        () => {
          setLocation("Location blocked");
        }
      );
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-gray-600 text-lg">
        <MapPin className="w-5 h-5 text-indigo-500" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        <Clock className="w-5 h-5 text-indigo-500" />
        <span>{time}</span>
      </div>
    </section>
  );
};

export default CurrentTime;
