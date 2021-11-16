import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCountryDetail } from "../../actions";

import "./Country.css";

export default function Country({ countryId, flagURI, name, continent }) {
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    dispatch(fetchCountryDetail(e.target.id));
  };

  return (
    <div id="country-wrap">
      <img src={flagURI} alt="flag of the country" width="250px" />
      <h2>{name}</h2>
      <h3>{continent}</h3>
      <Link
        to={`${countryId}`}
        id={countryId}
        // onClick={(e) => onClickHandler(e)}
      >
        more...
      </Link>
    </div>
  );
}
