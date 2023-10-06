import "./App.css";
import Search from "./components/search/searchbar";
import CurrentWeather from "./components/currentWeather/currentWeather";
import Forecast from "./components/forecast/forecast";
import { weatherApiKey, weatherUrl } from "./apiCalls";
import { useState } from "react";

function App() {
  // research how to effectively use useState hook below
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // this method is just printing to console
  const handleOnSearchChange = (searchData) => {
    // had to take the commas out first becasue they were popping up in api call and it threw an error
    //const noComma = searchData.value.replace(",", "");
    // below is a different solution to the comma problem ( had to put replace first or it didnt work)
    const [lat, lon] = searchData.value.replace(",", "").split(" ");

    const currentWeatherFetch = fetch(
      `${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
    );
    const forecastFetch = fetch(
      `${weatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        // using same label made in searchBar.js from other api
        // look up what the 3 dots means?
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
