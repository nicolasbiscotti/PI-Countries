import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import "./FilterDisplay.css";

export default function FilterDisplay({
  countries,
  applyFilter,
  turnOffFilter,
  filters,
}) {
  const [continents, setContinents] = useState(() => []);
  const [activities, setActivities] = useState(() => []);

  useEffect(() => {
    setContinents(() => getContinents(countries));
    setActivities(() => getActivities(countries));
  }, [countries]);

  return (
    <div id="filter-display-wrap">
      <div id="filter-display-center">
        <Filter
          title="--Filter by continent--"
          filter={{ type: "continent" }}
          options={continents.map((c) => ({ id: c, name: c }))}
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
          options={getOrdersOptions()}
          applyFilter={applyFilter}
          filterOn={filters.name}
          turnOffFilter={turnOffFilter}
        />
        <Filter
          title="--order by population--"
          filter={{ type: "population" }}
          options={getOrdersOptions()}
          applyFilter={applyFilter}
          filterOn={filters.population}
          turnOffFilter={turnOffFilter}
        />
      </div>
    </div>
  );
}

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
      if (result.map((a) => a.id).indexOf(activity.id) < 0) {
        result.push({ id: activity.id, name: activity.name });
      }
    }
    return result;
  }, []);

const getOrdersOptions = () => {
  return [
    { id: 1, name: "up" },
    { id: -1, name: "down" },
  ];
};
