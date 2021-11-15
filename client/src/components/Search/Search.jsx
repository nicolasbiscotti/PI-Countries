import React from "react";
import "./Search.css";

export default function Search(props) {
  return (
    <div id="search-wrap">
      <input type="text" placeholder="search country by name.." />
      <input type="button" value="Search" />
    </div>
  );
}
