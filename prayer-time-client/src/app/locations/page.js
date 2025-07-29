import Image from "next/image";
import axiosInstance from "../utils/axios";
import DivitionsClick from "../components/DivitionsClick";

const getDivisions = async () => {
  try {
    const res = await axiosInstance.get("/locations/divisions"); // Your backend route
    return res.data;
  } catch (error) {
    console.error("Error fetching divisions:", error);
    return [];
  }
};

const LocationsPage = async () => {
  const divisions = await getDivisions();

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-12 text-center">
        Bangladesh Divisions
      </h1>
      <div className=" flex flex-col gap-8 md:flex-row items-start w-full ">
        <div className="flex-1">
          <Image
            src="/image/locations-map.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
        <div className="flex-1">
          <ul className="list-disc pl-5 space-y-2">
            <DivitionsClick divisions={divisions} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
