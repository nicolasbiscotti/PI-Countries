import filters from "./filters";

// filterBy -> {continent: 'un continente', population: 1 || -1, etc}
const filterCountriesBy = (countries, filterBy) => {
  let filtered = [...countries];
  filterBy = filterBy || {};

  Object.keys(filterBy).forEach((key) => {
    if (filterBy[key]) {
      filtered = filters[key](filtered, filterBy[key]);
    }
  });

  return filtered;
};

export default filterCountriesBy;
