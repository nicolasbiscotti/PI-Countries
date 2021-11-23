import filters from "./filters";

// filterBy -> {continent: 'un continente', population: 1 || -1, etc}
export default (countries, filterBy) => {
  let filtered = [...countries];
  filterBy = filterBy || {};

  Object.keys(filterBy).forEach((key) => {
    if (filterBy[key]) {
      filtered = filters[key](filtered, filterBy[key]);
    }
  });

  return filtered;
};

//   const filterCountriesBy = (countries, filterBy, filters) => {
//     let filtered = [...countries];
//     filterBy = filterBy || {};

//     if (filterBy.continent) {
//       filtered = filters.filterByContinent(filtered, filterBy.continent);
//     }

//     if (filterBy.activityId) {
//       filtered = filters.filterByActivity(filtered, filterBy.activityId);
//     }

//     if (filterBy.population) {
//       filtered = filters.orderByPopulation(filtered, filterBy.population);
//     }

//     if (filterBy.name) {
//       filtered = filters.orderByName(filtered, filterBy.name);
//     }

//     return filtered;
//   };
