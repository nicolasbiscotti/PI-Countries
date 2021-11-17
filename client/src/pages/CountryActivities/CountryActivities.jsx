import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCountryDetail } from "../../actions";
import CountryDetail from "../../components/CountryDetail/CountryDetail";
import NavBar from "../../components/NavBar/NavBar";
import "./CountryActivities.css";

export default function CountryActivities() {
  const dispatch = useDispatch();
  const { countryId } = useParams();
  const country = useSelector((state) => state.countryDetail);

  useEffect(() => dispatch(fetchCountryDetail(countryId)), []);

  return (
    <React.Fragment>
      <NavBar />
      <CountryDetail country={country} activities={country.activities} />
    </React.Fragment>
  );
}
