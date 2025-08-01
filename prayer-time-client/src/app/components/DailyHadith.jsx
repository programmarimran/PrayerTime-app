"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

const hadiths = [
  {
    text: "Actions are judged by intentions.",
    source: "Sahih Bukhari 1",
  },
  {
    text: "The best among you are those who learn the Quran and teach it.",
    source: "Sahih Bukhari 5027",
  },
  {
    text: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    source: "Sahih Bukhari 6136",
  },
  {
    text: "Make things easy, not difficult. Give glad tidings, not threats.",
    source: "Sahih Bukhari 69",
  },
  {
    text: "Smiling in the face of your brother is charity.",
    source: "Jami` at-Tirmidhi 1956",
  },
];

const DailyHadith = () => {
  const [hadith, setHadith] = useState(hadiths[0]);

  useEffect(() => {
    const today = new Date().getDate();
    const index = today % hadiths.length;
    setHadith(hadiths[index]);
  }, []);

  return (
    <section className="bg-emerald-50 h-full border border-emerald-200 rounded-2xl p-6 shadow-sm ">
      <div className="flex items-center gap-3 mb-3 text-emerald-700 font-semibold text-lg">
        <BookOpen className="w-5 h-5" />
        <span>Daily Hadith</span>
      </div>
      <blockquote className="text-gray-800 italic text-lg mb-2">
        “{hadith.text}”
      </blockquote>
      <p className="text-sm text-gray-600 text-right">– {hadith.source}</p>
    </section>
  );
};

export default DailyHadith;
