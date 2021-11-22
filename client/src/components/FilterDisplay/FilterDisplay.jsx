import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, recivedCountries } from "../../actions";
import Filter from "../Filter/Filter";
import "./FilterDisplay.css";

export default function FilterDisplay() {
  // {filter, options, applyFilter, filterOn}
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesList);

  const [filters, setFilters] = useState(() => ({
    continent: false,
    activityId: false,
    population: false,
    name: false,
  }));
  const [continents, setContinents] = useState(() => []);
  const [activities, setActivities] = useState(() => []);

  const [byFilter, setByfilter] = useState(() => []);

  useEffect(() => {
    setContinents(() => getContinents(countries));
    setActivities(() => getActivities(countries));
  }, [countries]);

  const applyFilter = (filter) => {
    setFilters((filters) => {
      let filterBy = {
        ...filters,
        [filter.type]: filter.value,
      };
      setByfilter((byFilter) => {
        let c = filterCountriesBy(countries, filterBy, theFilters);
        dispatch(fetchCountries(null, filterBy));
        return c;
      });
      return filterBy;
    });
  };
  const turnOffFilter = (filter) => {
    setFilters((filters) => {
      let filterBy = {
        ...filters,
        [filter.type]: false,
      };
      dispatch(fetchCountries(null, filterBy));
      return filterBy;
    });
  };

  return (
    <div id="filter-display-wrap">
      Filters Display
      <Filter
        title="--Filter by continent--"
        filter={{ type: "continent" }}
        options={continents}
        applyFilter={applyFilter}
        filterOn={filters.continent}
        turnOffFilter={turnOffFilter}
      />
      <Filter
        title="--filter by activities--"
        filter={{ type: "activityId" }}
        options={activities}
        applyFilter={applyFilter}
        filterOn={filters.activityId}
        turnOffFilter={turnOffFilter}
      />
      <Filter
        title="--order by country name--"
        filter={{ type: "name" }}
        options={[1, -1]}
        applyFilter={applyFilter}
        filterOn={filters.name}
        turnOffFilter={turnOffFilter}
      />
    </div>
  );
}
const filterByContinent = (countries, continent) =>
  countries.filter((country) => country.continent === continent);

const filterByActivity = (countries, activityId) => {
  return countries.filter((c) =>
    c.activities.map((a) => a.id).includes(Number.parseInt(activityId))
  );
};

const orderByPopulation = (countries, order) =>
  countries.sort(function (a, b) {
    return order * (a.population - b.population);
  });

const orderByName = (countries, order) =>
  countries.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1 * order;
    }
    if (nameA > nameB) {
      return 1 * order;
    }
    return 0;
  });
const theFilters = {
  filterByContinent,
  filterByActivity,
  orderByPopulation,
  orderByName,
};
// filterBy -> {continent: 'un continente', population: 1 || -1, etc}
const filterCountriesBy = (countries, filterBy, filters) => {
  let filtered = [...countries];
  filterBy = filterBy || {};

  if (filterBy.continent) {
    filtered = filters.filterByContinent(filtered, filterBy.continent);
  }

  if (filterBy.activityId) {
    filtered = filters.filterByActivity(filtered, filterBy.activityId);
  }

  if (filterBy.population) {
    filtered = filters.orderByPopulation(filtered, filterBy.population);
  }

  if (filterBy.name) {
    filtered = filters.orderByName(filtered, filterBy.name);
  }

  return filtered;
};

// options espera un array de obj = {id:, value:,}
const getContinents = (countries) =>
  countries.reduce((result, country) => {
    if (result.indexOf(country.continent) < 0) {
      result.push(country.continent);
    }
    return result;
  }, []);

const getActivities = (countries) =>
  countries.reduce((result, country) => {
    for (const activity of country.activities) {
      //   if (result.map((a) => a.id).indexOf(activity.id) < 0) {
      // result.push({ id: activity.id, value: activity.name });
      if (result.indexOf(activity.id) < 0) {
        result.push(activity.id);
      }
    }
    return result;
  }, []);
