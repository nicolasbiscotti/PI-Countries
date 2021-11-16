import React from "react";
import CountriesDisplay from "../../components/CountriesDisplay/CountriesDisplay";
import Search from "../../components/Search/Search";

export default function Home() {
  return (
    <React.Fragment>
      <h1>Henry Countries</h1>
      <Search />
      <CountriesDisplay />
    </React.Fragment>
  );
}
