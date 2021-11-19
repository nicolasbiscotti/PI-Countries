import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { countryByContinent, resetPagination, showCountries } from "../../actions";
import "./Filter.css";

export default function Filter() {
  const dispatch = useDispatch();

  const [filterOn, toggleFilterOn] = useState(false);
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/countries")
      .then((r) => r.data.rows)
      .then((c) =>
        setCountries((countries) => {
          countries = c;
          setContinents(() => getContinents(countries));
          return countries;
        })
      );
  }, []);

  const getContinents = (countries) =>
    countries.reduce((result, country) => {
      if (result.indexOf(country.continent) < 0) {
        result.push(country.continent);
        return result;
      } else {
        return result;
      }
    }, []);

  const filterByContinents = (countries, continent) => {
    let filtered = countries.filter(
      (country) => country.continent === continent
    );
    toggleFilterOn((filterOn) => continent);
    // ojo no tengo paginado por continente
    dispatch(resetPagination());
    dispatch(countryByContinent(filtered));
  };
  const goHomeHandler = () => {
    toggleFilterOn((filterOn) => false);
    dispatch(resetPagination());
    dispatch(showCountries());
  };

  return (
    <div id="filter-wrap">
      {!filterOn 
      ? <select
      onChange={(e) => filterByContinents(countries, e.target.value)}
      name="continent"
      id="selec_continent"
    >
      <option value="">--Filter by continent--</option>
      {continents.map((continent) => (
        <option key={continent} value={continent}>
          {continent}
        </option>
      ))}
    </select>
    : (
        <span onClick={goHomeHandler}>{filterOn} X</span>
    )
      
    }
      
    </div>
  );
}
