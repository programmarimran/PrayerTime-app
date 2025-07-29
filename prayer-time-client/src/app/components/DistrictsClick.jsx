import Link from "next/link";
import React from "react";

const DistrictsClick = ({ district }) => {
  return (
    <>
      <Link href={`/locations/${district}/`} >
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          {district}
        </li>
      </Link>
    </>
  );
};

export default DistrictsClick;
