import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../../actions";
import "./Search.css";

export default function Search(props) {
  const dispatch = useDispatch();

  const [searchByName, setSearchByName] = useState("");
  const [search, toggleSearch] = useState(true);

  const onChangeHandler = (event) => {
    setSearchByName(() => event.target.value);
  };
  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch(fetchCountries(searchByName));
    toggleSearch(() => false);
  };
  const turnOffSearch = () => {
    setSearchByName(() => "");
    toggleSearch(() => true);
    dispatch(fetchCountries());
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
            value={searchByName}
            onChange={(e) => onChangeHandler(e)}
          />{" "}
          <button type="button" onClick={(e) => onSearchHandler(e)}>
            Search
          </button>
        </>
      ) : (
        <span onClick={turnOffSearch}>{searchByName} X</span>
      )}
    </div>
  );
}
