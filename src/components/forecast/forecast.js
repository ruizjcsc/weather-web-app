import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayOfWeek = new Date().getDay();
  const forecastdays = days
    .slice(dayOfWeek, days.length)
    .concat(days.splice(0, dayOfWeek));

  console.log(forecastdays);

  return (
    // using an accordion to show all of the forecasts and be able
    // go into each day seperatley
    // accordion heading is what it looks like when collapsed
    // panel is when its expanded
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="dailyItem">
                  <img
                    alt="weather"
                    className="iconSmall"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastdays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="minMax">
                    {Math.round(item.main.temp_min)}°F /{" "}
                    {Math.round(item.main.temp_max)}°F
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="dailyDetailsGrid">
                <div className="dailyDetailsGridItem">
                  <label>Pressure</label>
                  <label>{item.main.pressure} inHg</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Winds</label>
                  <label>{item.wind.speed} mph</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level} ft</label>
                </div>
                <div className="dailyDetailsGridItem">
                  <label>Feels like</label>
                  <label>{Math.round(item.main.feels_like)}°F</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
