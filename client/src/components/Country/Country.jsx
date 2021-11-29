import React from "react";
import { Link } from "react-router-dom";

import "./Country.css";

export default function Country({ countryId, flagURI, name, continent }) {
  return (
    <div id="country-wrap">
      <Link to={`${countryId}`} id={countryId}>
        <img src={flagURI} alt="flag of the country" />
        <h2>{name}</h2>
        <h3>{continent}</h3>
      </Link>
    </div>
  );
}
