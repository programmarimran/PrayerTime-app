import CurrentTime from "./components/CurrentTime";
import DailyHadith from "./components/DailyHadith";
import NextPrayerCountdown from "./components/NextPrayerCountdown";
import PrayerCalendar from "./components/PrayerCalender";
import PrayerTimes from "./components/PrayerTimes";

export default function HomePrayerTimes() {
  return (
    <div>
      {/* === Current Time Section === */}
      <section className=" mb-8">
        <CurrentTime />
      </section>

      {/* === (Optional) User Feedback / Donate / About Section === */}
      {/* <FeedbackForm /> or <AboutSection /> */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4   ">
        <div className=" col-span-8 ">
          {/* === Calendar Section === */}
          <PrayerCalendar />
        </div>
        <div className=" col-span-4 w-full grid grid-rows-12 gap-4 ">
          <div className=" row-span-6 h-full min-w-full">
            {/* === Next Prayer Countdown Section === */}
            <NextPrayerCountdown />
          </div>

          <div className=" row-span-6 h-full w-full">
            {/* === Daily Hadith Section === */}
            <DailyHadith />
          </div>
        </div>
      </div>
      {/* === Prayer Times Section === */}
      <PrayerTimes />
    </div>
  );
}
