"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Locations", path: "/locations" },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-xl flex gap-1 font-bold">
            <span className=" md:flex">🕌</span> PrayerTime
          </h1>
        </Link>
        <ul className="flex gap-3 md:gap-6">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={item.name === "About" ? "hidden md:block" : ""}
            >
              <Link
                href={item.path}
                className={`hover:text-yellow-300 transition ${
                  pathname === item.path ? "text-yellow-400 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
