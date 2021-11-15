import React from "react";

import "./Country.css";

export default function Country(props) {
  return (
    <div id="country-wrap">
      <img src={props.flagURI} alt="flag of the country" width="250px" />
      <h2>{props.name}</h2>
      <h3>{props.continent}</h3>
    </div>
  );
}
