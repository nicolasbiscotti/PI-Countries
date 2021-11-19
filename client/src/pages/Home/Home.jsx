import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPagination, showCountries } from "../../actions";
import CountriesDisplay from "../../components/CountriesDisplay/CountriesDisplay";
import Filter from "../../components/Filter/Filter";
import NavBar from "../../components/NavBar/NavBar";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import Search from "../../components/Search/Search";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesList);

  useEffect(() => {
      dispatch(resetPagination());
      dispatch(showCountries()); 
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Search />
      <Filter />
      <CountriesDisplay countries={countries} />
      <PaginationBar />
    </React.Fragment>
  );
}
