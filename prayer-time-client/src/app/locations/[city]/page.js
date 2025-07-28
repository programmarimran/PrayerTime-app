import React from "react";

const page = ({ params }) => {
  const { city } = params;
  console.log(`City: ${city}`);
  return <div>this is the page for {city}</div>;
};

export default page;
