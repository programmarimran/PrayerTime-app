export const metadata = {
  title: "About - PrayerTime",
  description: "Know more about PrayerTime, its purpose, and the developer behind it.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-semibold mb-4 text-center text-primary">
        About PrayerTime
      </h1>
      <p className="text-center text-lg mb-10 text-gray-600 dark:text-gray-300">
        A simple and accurate prayer time assistant — wherever you are.
      </p>

      <div className="space-y-6 text-base leading-relaxed">
        <p>
          <strong>PrayerTime</strong> is a web-based application built to help Muslims
          worldwide stay connected to their daily prayers. It automatically detects your
          current location and shows the exact prayer times based on your city or GPS.
        </p>

        <p>
          The app fetches data from the reliable <strong>Aladhan API</strong> and uses
          clean, responsive UI to deliver a seamless user experience across all devices.
        </p>

        <p>
          Developed with <strong>Next.js</strong> and styled using <strong>Tailwind CSS</strong>,
          this project combines modern technology with Islamic values to serve the Ummah.
        </p>

        <p>
          PrayerTime is crafted by <strong>Md Imran</strong>, a passionate MERN Stack Developer,
          as a real-world project that blends functionality, simplicity, and faith.
        </p>

        <p className="pt-4 border-t mt-8 text-sm text-gray-500 dark:text-gray-400">
          Feel free to explore more or reach out through the Contact page.
          May this app be a source of benefit, إن شاء الله (In shaa Allah).
        </p>
      </div>
    </div>
  );
}
