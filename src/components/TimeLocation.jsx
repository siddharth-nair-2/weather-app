import React from "react";
import { formatToLocalTime } from "../services/weather-service";

const TimeLocation = ({ weather: { dt, timezone, name, country } }) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6 gap-4 flex-wrap">
        <p className="text-white text-xl font-extralight">
          {`${formatToLocalTime(dt, timezone, "cccc, dd LLL yyyy")}`}
        </p>
        <p className="text-white text-xl font-extralight sm:visible invisible">
          |
        </p>
        <p className="text-white text-xl font-extralight">
          {`${formatToLocalTime(dt, timezone, "hh:mm a")}`}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeLocation;
