import React from "react";
import { iconUrlFromCode } from "../services/weather-service";

const Forecast = ({ title, items }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />

      <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center sm:justify-around gap-6 text-white">
        {items?.map((item) => {
          return (
            <div
              className="flex flex-col items-center justify-center"
              key={item.title}
            >
              <p className="font-light text-sm">{item.title}</p>
              <img
                src={iconUrlFromCode(item.icon)}
                alt="logo"
                className="w-12 my-1"
              />
              <p className="font-medium">{item.temp.toFixed()}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
