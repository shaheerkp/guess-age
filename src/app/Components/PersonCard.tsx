import { useAppSelector } from "@/redux/store";
import React from "react";

const PersonCard = () => {
  const profile = useAppSelector((state) => state.user);
  return (
    <div className="w-50 bg-white shadow-md rounded-md overflow-hidden">
     {profile.name&& <div className="p-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {profile.name}
          </h2>
          <img
            className="inline-block size-[62px] rounded-full"
            src={profile.gender === "male" ? "men.png" : "women.jpg"}
            alt="Image Description"
          ></img>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          Age: {profile?.age?.toString()}
        </p>
        <p className="text-sm text-gray-600 mb-2">Gender: {profile.gender}</p>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            Countries:
          </h3>
          <ul>
            {profile.country.map((country, index) => {
              let regionNames = new Intl.DisplayNames(["en"], {
                type: "region",
              });
              return (
                <li key={index} className="text-sm text-gray-600">
                  {regionNames.of(country.country_id.toString())} -{" "}
                  {typeof country.probability==="number"?(country.probability*100).toFixed(1)+"%":"N/A"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default PersonCard;
