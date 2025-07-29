
import getPrayTimes from "../utils/getPrayTimes";


function convertTo12HourFormat(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default async function PrayerTimeCard({ city }) {
  const prayerTimes = await getPrayTimes({ district: city });
  
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg rounded-xl p-6 space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-center">
        🕌 Prayer Times in {city}
      </h2>
      <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {Object.entries(prayerTimes).map(([name, time]) => (
          <li key={name} className="flex justify-between py-2 text-lg">
            <span>{name}</span>
            <span>{convertTo12HourFormat(time)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
