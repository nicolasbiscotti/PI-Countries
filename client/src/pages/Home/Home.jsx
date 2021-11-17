import React from "react";
import CountriesDisplay from "../../components/CountriesDisplay/CountriesDisplay";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";

export default function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <Search />
      <CountriesDisplay />
    </React.Fragment>
  );
}
