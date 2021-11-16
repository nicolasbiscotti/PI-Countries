import React from "react";
import { useSelector } from "react-redux";
import ActivityDetail from "../ActivityDetail/ActivityDetail";

import "./CountryDetail.css";

export default function CountryDetail({ country, activities }) {
  // const country = useSelector((state) => state.countryDetail);
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div id="country-detail-wrap">
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <React.Fragment>
          <img src={country.flagURI} alt="flag of the country" />
          <h2>
            {country.name} - {country.countryId}
          </h2>
          <h3> {country.continent} </h3>
          <h3>Capital: {country.capital} </h3>
          <h3>Subregion: {country.subregion} </h3>
          <h3>Area: {country.areaKm2} </h3>
          <h3>Population: {country.population} </h3>
          <hr />
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityDetail
                name={activity.name}
                difficulty={activity.difficulty}
                durationTime={activity.durationTime}
                season={activity.season}
              />
            ))
          ) : (
            <h3>No activities availables yet...</h3>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
