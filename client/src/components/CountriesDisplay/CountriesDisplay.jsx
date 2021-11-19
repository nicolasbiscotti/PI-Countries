// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Country from "../Country/Country";
import PaginationBar from "../PaginationBar/PaginationBar";
import { showCountries } from "../../actions";
import "./CountriesDisplay.css";
import { useEffect } from "react";

// muestra y pagina los countries que le pasan como prop
export default function CountriesDisplay({ countries }) {
  // const dispatch = useDispatch();
  // const countries = useSelector((state) => state.countriesList);
  const isLoading = useSelector((state) => state.isLoading);

  // useEffect(() => {
  //   dispatch(showCountries());
  // }, []);

  return (
    <div id="countries-display-wrap">
      <div id="countries-display-center">
        {isLoading ? (
          <h2>Loading</h2>
        ) : (
          countries.map((country) => (
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
    </div>
  );
}
