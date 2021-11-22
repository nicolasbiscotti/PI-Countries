import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../actions";
import CountriesDisplay from "../../components/CountriesDisplay/CountriesDisplay";
import Filter from "../../components/Filter/Filter";
import FilterDisplay from "../../components/FilterDisplay/FilterDisplay";
import NavBar from "../../components/NavBar/NavBar";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import Search from "../../components/Search/Search";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Search />
      <FilterDisplay />
      <CountriesDisplay />
    </React.Fragment>
  );
}
