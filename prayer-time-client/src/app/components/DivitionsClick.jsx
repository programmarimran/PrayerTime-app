"use client";
import React, { useState } from "react";
import axiosInstance from "../utils/axios";
import DistrictsClick from "./DistrictsClick";

const DivisionClick = ({ divisions }) => {
  const [activeDivision, setActiveDivision] = useState(null);
  const [division, setDivision] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async (division) => {
    setDivision(division);
    if (activeDivision === division) {
      setActiveDivision(null);
      setDistricts([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setDistricts([]);
      const res = await axiosInstance.get(
        `/locations/divisions/${division}/districts`
      );
      setDistricts(res.data || []);
      setActiveDivision(division);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch districts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  flex gap-8 justify-between ">
      <div className="flex flex-col space-y-2">
        {divisions.map((division, idx) => (
          <ul key={idx} className=" flex flex-col pb-2">
            <li
              onClick={() => handleClick(division)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {division}
            </li>
          </ul>
        ))}
      </div>
      {/* Show only if this is the active division */}
      {activeDivision === division && (
        <>
          {loading && (
            <p className="text-sm text-gray-500">Loading districts...</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {districts.length > 0 && (
            <ul className="mt-2 ml-4 list-disc">
              {districts.map((district, idx) => (
                <DistrictsClick key={idx} district={district} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default DivisionClick;
