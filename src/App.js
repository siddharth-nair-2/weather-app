import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TempAndDetails from "./components/TempAndDetails";
import TimeLocation from "./components/TimeLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weather-service";
import ThunderStorm from "../src/assets/thunderstorm.jpg";
import Drizzle from "../src/assets/drizzle.jpg";
import Rain from "../src/assets/rain.webp";
import Snow from "../src/assets/snow.webp";
import Clear from "../src/assets/clear.jpg";
import Clouds from "../src/assets/cloudy.jpg";
import Mist from "../src/assets/mist.jpg";
import Smoke from "../src/assets/smoke.jpg";
import Dust from "../src/assets/dust.jpg";
import Tornado from "../src/assets/tornado.jpg";

function App() {
  const [query, setQuery] = useState({ q: "Toronto" });
  const [units, setUnits] = useState("metric");
  const [runCount, setRunCount] = useState(0);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const msg = query.q ? query.q : "current location.";

      runCount > 0 && toast.info("Fetching weather for " + msg);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        runCount > 0 &&
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}`
          );
        setWeather(data);
      });
      setRunCount(1);
    };

    fetchWeather();
  }, [query, units, runCount]);

  const backgroundImg = () => {
    if (!weather) return Clear;
    const weatherType = weather.details;
    switch (weatherType) {
      case "Thunderstorm":
        return ThunderStorm;
      case "Clear":
        return Clear;
      case "Drizzle":
        return Drizzle;
      case "Rain":
        return Rain;
      case "Snow":
        return Snow;
      case "Clouds":
        return Clouds;
      case "Mist":
        return Mist;
      case "Smoke":
        return Smoke;
      case "Dust":
        return Dust;
      case "Tornado":
        return Tornado;
      case "Haze":
        return Mist;
      case "Fog":
        return Mist;
      case "Sand":
        return Dust;
      case "Ash":
        return Smoke;
      case "Squall":
        return ThunderStorm;
      default:
        return Clear;
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImg()})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
        }}
        className={`mt-0 mx-auto max-w-screen-lg sm:max-w-screen-2xl pt-1 pb-12 sm:mt-4 sm:py-5 px-4 sm:px-16 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 xl:rounded-[45px]`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <>
            <TimeLocation weather={weather} />
            <TempAndDetails weather={weather} />
            <Forecast title="HOURLY FORECAST" items={weather.hourly} />
            <Forecast title="DAILY FORECAST" items={weather.daily} />
          </>
        )}
      </div>

      <ToastContainer
        autoClose={1500}
        theme="colored"
        newestOnTop={true}
        className="invisible sm:visible"
      />
    </>
  );
}

export default App;
