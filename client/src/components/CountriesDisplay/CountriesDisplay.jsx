// import React from "react";
import { useSelector } from "react-redux";
import Country from "../Country/Country";
import PaginationBar from "../PaginationBar/PaginationBar";
import "./CountriesDisplay.css";

export default function CountriesDisplay({ countries, message }) {
  const isLoading = useSelector((state) => state.isLoading);
  const page = useSelector((state) => state.pagination);

  return (
    <div id="countries-display-wrap">
      <div id="countries-display-center">
        {console.log(`Countries Display MESSAGE: ${message}`)}
        {isLoading ? (
          <h2>Loading</h2>
        ) : message ? (
          <h2>{message}</h2>
        ) : (
          countries
            .slice(page.start, page.end)
            .map((country) => (
              <Country
                key={country.countryId}
                countryId={country.id}
                name={country.name}
                continent={country.continent}
                flagURI={country.flagURI}
              />
            ))
        )}
      </div>
      <PaginationBar countries={countries} />
    </div>
  );
}