import PrayerTimeCard from "@/app/components/PrayerTimeCard";


export default async function CityPrayerPage({ params }) {
  const { city } = params;

  return (
    <main className="min-h-screen  px-4 py-10">
      <PrayerTimeCard city={city} />
    </main>
  );
}
