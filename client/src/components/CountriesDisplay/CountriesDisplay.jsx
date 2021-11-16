// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Country from "../Country/Country";
import PaginationBar from "../PaginationBar/PaginationBar";
import { showCountries } from "../../actions";
import "./CountriesDisplay.css";
import { useEffect } from "react";

export default function CountriesDisplay() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesList);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(showCountries());
  }, []);

  return (
    <div id="countries-display-wrap">
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
      <PaginationBar />
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     countries: [...state.countriesList],
//   };
// };

// export default connect(mapStateToProps, { showCountries })(CountriesDisplay);
