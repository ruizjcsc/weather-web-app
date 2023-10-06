import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoUrl } from "../../apiCalls";

const Search = ({ onSearchChange }) => {
  // how to use useState hook and other hooks for async functions
  // what are async functions
  const [search, setSearch] = useState(null);

  // will use value to pass into fetch method
  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        // using this method of concatinations is better for data that is constantly changed
        // ill play around with the population and some of the other parameters later
        `${geoUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude}, ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  };

  // this passes the data (searchData)
  const handleOnChange = (searchData) => {
    // sets new value
    setSearch(searchData);
    // calls onSearchChange which is passes by App.js file
    onSearchChange(searchData);
  };

  return (
    // how does async work and how does async paginate create a search bar?
    <AsyncPaginate
      // for when nothing is in search bar
      placeholder="Search for city"
      // to prevent api calls everytime a new key is pressed
      // time in ms
      debounceTimeout={600}
      value={search}
      // change value and talk with App.js
      // call handle onChange
      onChange={handleOnChange}
      // loads options (im guessing as you type)
      loadOptions={loadOptions}
    />
  );
};

export default Search;
