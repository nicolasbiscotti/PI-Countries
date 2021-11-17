import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPagination, setSearchName, showCountries } from "../../actions";
import "./Search.css";

export default function Search(props) {
  const [name, setName] = useState("");
  const [search, toggleSearch] = useState(true);

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setName((name) => (name = event.target.value));
  };
  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch(resetPagination());
    dispatch(setSearchName(name));
    dispatch(showCountries(0, name));
    toggleSearch((search) => (search = false));
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
            value={name}
            onChange={(e) => onChangeHandler(e)}
          />{" "}
          <button type="button" onClick={(e) => onSearchHandler(e)}>
            Search
          </button>
        </>
      ) : (
        <span onClick={() => toggleSearch((search) => (search = true))}>
          {name} X
        </span>
      )}
    </div>
  );
}
