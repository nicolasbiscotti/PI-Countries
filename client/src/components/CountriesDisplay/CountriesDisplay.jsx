// import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Country from "../Country/Country";
import PaginationBar from "../PaginationBar/PaginationBar";
import "./CountriesDisplay.css";


export default function CountriesDisplay() {
  const isLoading = useSelector((state) => state.isLoading);
  const countries = useSelector((state) => state.countriesList);
  const message = useSelector((state) => state.message);
  const page = useSelector((state) => state.pagination);

  
  return (
    <div id="countries-display-wrap">
      <div id="countries-display-center">
        {console.log(`MESSAGE: ${message}`)}
        {isLoading ? (
          <h2>Loading</h2>
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
      <PaginationBar />
    </div>
  );
}

// const STEP = 10;
  // const LENGTH = countries.length;

  // const initialPage = {
  //   start: 0,
  //   end: STEP - 1,
  // };
  // const [page, setPage] = useState(initialPage);

  // const forwardPage = () => {
  //   setPage((page) => {
  //     let start = page.end;
  //     let end = start + STEP;
  //     return { start, end };
  //   });
  // };
  // const goBackPage = () => {
  //   setPage((page) => {
  //     let end = page.start;
  //     let start = end - STEP > 0 ? end - STEP : 0;
  //     return { start, end };
  //   });
  // };
  // const hasNext = () => {
  //   return page.end > LENGTH ? false : true;
  // };
  // const hasPrev = () => {
  //   return page.start > 0 ? true : false;
  // };

