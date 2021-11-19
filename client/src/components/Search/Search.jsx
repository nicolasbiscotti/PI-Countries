import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPagination, setSearchName, showCountries } from "../../actions";
import "./Search.css";

export default function Search(props) {
  const [countryName, setCountryName] = useState("");
  const [search, toggleSearch] = useState(true);

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setCountryName((countryName) => (countryName = event.target.value));
  };
  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch(resetPagination());
    dispatch(setSearchName(countryName));
    dispatch(showCountries(0, countryName));
    toggleSearch((search) => (search = false));
  };
  const goHomeHandler = () => {
    setCountryName((countryName) => (countryName = ""));
    toggleSearch((search) => (search = true));
    dispatch(resetPagination());
    dispatch(showCountries());
  };
  return (
    <div id="search-wrap">
      {search ? (
        <>
          <input
            id="search_country_name"
            name="name"
            type="search"
            placeholder="search countries by name.."
            value={countryName}
            onChange={(e) => onChangeHandler(e)}
          />{" "}
          <button type="button" onClick={(e) => onSearchHandler(e)}>
            Search
          </button>
        </>
      ) : (
        <span onClick={goHomeHandler}>{countryName} X</span>
      )}
    </div>
  );
}
