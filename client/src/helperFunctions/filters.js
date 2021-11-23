export const filterByContinent = (countries, continent) =>
  countries.filter((country) => country.continent === continent);

export const filterByActivity = (countries, activityId) => {
  return countries.filter((c) =>
    c.activities.map((a) => a.id).includes(Number.parseInt(activityId))
  );
};

export const orderByPopulation = (countries, order) =>
  countries.sort(function (a, b) {
    return order * (a.population - b.population);
  });

export const orderByName = (countries, order) => {
  let result = [...countries];
  result.sort(function (a, b) {
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
  return result;
};

export default {
  continent: filterByContinent,
  activityId: filterByActivity,
  population: orderByPopulation,
  name: orderByName,
};
