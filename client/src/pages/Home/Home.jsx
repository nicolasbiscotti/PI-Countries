import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  filterCountries,
  resetPagination,
} from "../../actions";
import CountriesDisplay from "../../components/CountriesDisplay/CountriesDisplay";
import FilterDisplay from "../../components/FilterDisplay/FilterDisplay";
import NavBar from "../../components/NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const countriesList = useSelector((state) => state.countriesList);
  const filteredList = useSelector((state) => state.filteredCountries);
  const filtersApplied = useSelector((state) => state.filtersApplied);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(fetchCountries());
    setFilters(() => filtersApplied);
  }, []);

  useEffect(() => {
    setFilters(() => filtersApplied);
    setCountries(() => {
      if (checkFilters(filtersApplied)) {
        dispatch(resetPagination());
        dispatch(filterCountries(filtersApplied));
        return filteredList;
      } else {
        return countriesList;
      }
    });
  }, [countriesList]);

  useEffect(() => {
    setFilters(() => filtersApplied);
    setCountries(() => {
      if (filtersApplied) {
        return filteredList;
      } else {
        return countriesList;
      }
    });
  }, [filteredList]);

  const applyFilter = (filter) => {
    let filterBy = {
      ...filters,
      [filter.type]: filter.value,
    };
    dispatch(resetPagination());
    dispatch(filterCountries(filterBy));
  };

  const turnOffFilter = (filter) => {
    let filterBy = {
      ...filters,
      [filter.type]: false,
    };
    dispatch(resetPagination());
    dispatch(filterCountries(filterBy));
  };

  return (
    <React.Fragment>
      <NavBar />
      <FilterDisplay
        countries={countries}
        filters={filters}
        applyFilter={applyFilter}
        turnOffFilter={turnOffFilter}
      />
      <CountriesDisplay countries={countries} message={message} />
    </React.Fragment>
  );
}
const checkFilters = (filterBy) => {
  let result = false;
  Object.keys(filterBy).forEach((key) => (result = result || filterBy[key]));
  return result;
};
