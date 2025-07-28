import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <ul>
        <Link href="/locations/dhaka">
          <li>Dhaka</li>
        </Link>
        <li>Khulna</li>
        <li>Mymensingh</li>
      </ul>
    </div>
  );
};

export default page;
