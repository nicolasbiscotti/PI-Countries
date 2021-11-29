import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../../actions";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./Search.css";

export default function Search(props) {
  const dispatch = useDispatch();

  const [searchByName, setSearchByName] = useState("");

  const onChangeHandler = (event) => {
    setSearchByName(() => event.target.value);
  };
  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch(fetchCountries(searchByName));
  };
  const turnOffSearch = () => {
    setSearchByName(() => "");
    dispatch(fetchCountries());
  };
  return (
    <div id="search-wrap">
      <form
        id="#search-form"
        action="submit"
        onSubmit={(e) => onSearchHandler(e)}
      >
        <input
          id="search_country_name"
          name="name"
          type="search"
          placeholder="search countries by name.."
          value={searchByName}
          onChange={(e) => onChangeHandler(e)}
        />{" "}
        <button type="submit">
          {searchByName ? <AiOutlineClose onClick={turnOffSearch} /> : ""}
          <span>|</span> <FaSearch />{" "}
        </button>
      </form>
    </div>
  );
}
