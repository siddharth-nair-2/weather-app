import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoAPIOptions } from "../services/weather-service";

const Inputs = ({ setQuery, units, setUnits, onSearchChange }) => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    setCity(searchData.value);
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocationCLick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching user's location");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({ lat, lon });
      });
    }
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=60000&namePrefix=${inputValue}`,
      geoAPIOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.city}, ${city.countryCode}`,
              label: `${city.city}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;

    if (units !== selectedUnit) setUnits(selectedUnit);
  };
  return (
    <div className="flex flex-row justify-center my-6 gap-4 sm:gap-0">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <AsyncPaginate
          placeholder="Search..."
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          className="text-xl font-light p-1 sm:p1 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        {/* <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search..."
          className="text-xl font-light p-1 sm:p2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        /> */}
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationCLick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitChange}
        >
          °C
        </button>
        <p className="text-l text-white mx-2">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
