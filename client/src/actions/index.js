import axios from "axios";

export const PAGINATION_STEP = 10;
export const GET_COUNTRIES_URL = "http://localhost:3001/countries";

// Actions
// export const SHOW_COUNTRIES = "SHOW_COUNTRIES";
// export const TOGGLE_LOADING = "TOGGLE_LOADING";
// export const FETCH_COUNTRY_DETAIL = "FETCH_COUNTRY_DETAIL";
// export const FETCH_COUNTRIES = "FETCH_COUNTRIES";
// export const FILTERED = "FILTERED";
export const RESET_PAGINATION = "RESET_PAGINATION";
export const FORWARD_PAGE = "FORWARD_PAGE";
export const GOBACK_PAGE = "GOBACK_PAGE";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const RECIVED_COUNTRIES = "RECIVED_COUNTRIES";
export const RECIVED_DETAIL = "RECIVED_DETAIL";

// Action Creators
export function getCountries() {
  return {
    type: GET_COUNTRIES,
  };
}
export function recivedCountries(countries) {
  return {
    type: RECIVED_COUNTRIES,
    payload: countries,
  };
}

export function fetchCountries(name, filterBy) {
  let url = name ? `${GET_COUNTRIES_URL}?name=${name}` : GET_COUNTRIES_URL;
  return function (dispatch) {
    dispatch(getCountries());
    dispatch(resetPagination());
    axios
      .get(url)
      .then((r) => r.data)
      .then((data) => {
        let countries = data.rows || [];
        let length = data.count;
        let message = data.msg || "";
        if (filterBy) {
          dispatch(
            recivedCountries(filterCountriesBy(countries, filterBy, filters))
          );
        } else {
          dispatch(recivedCountries(countries));
        }
      })
      .catch((e) => console.log(e));
  };
}

export function resetPagination() {
  return {
    type: RESET_PAGINATION,
  };
}

export function forwardPage() {
  return {
    type: FORWARD_PAGE,
  };
}
export function goBackPage() {
  return {
    type: GOBACK_PAGE,
  };
}

export function recivedDetail(country) {
  return {
    type: RECIVED_DETAIL,
    payload: country,
  };
}

export function fetchCountryDetail(countryId) {
  const url = `${GET_COUNTRIES_URL}/${countryId}`;
  return function (dispatch) {
    dispatch(getCountries());
    axios
      .get(url)
      .then((res) => res.data)
      .then((countryDetail) => dispatch(recivedDetail(countryDetail)))
      .catch((e) => console.log(e));
  };
}
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
const filters = {
  filterByContinent,
  filterByActivity,
  orderByPopulation,
  orderByName,
};

// export function showCountries(page = 0, name) {
//   let url = `${GET_COUNTRIES_URL}?page=${page}&step=${PAGINATION_STEP}`;
//   url += name ? `&name=${name}` : "";
//   console.log("Action showCountries:" + url);
//   return function (dispatch) {
//     dispatch(toggleLoading());
//     axios
//       .get(url)
//       .then((r) => r.data)
//       .then((data) => {
//         let countries = data.rows || [];
//         let message = data.msg || "";
//         dispatch({ type: SHOW_COUNTRIES, payload: { countries, message } });
//         dispatch(setNext(countries.hasNext));
//         dispatch(setPrev(countries.hasPrevious));
//       })
//       .then(() => dispatch(toggleLoading()));
//   };
// }
// export function countryByContinent(countries) {
//   return {
//     type: SHOW_COUNTRIES,
//     payload: countries,
//   };
// }
// export function filteredCountriesBy(filterBy) {
//   let url = GET_COUNTRIES_URL;
//   return function (dispatch) {
//     dispatch(toggleLoading());
//     dispatch(resetPagination());
//     axios
//       .get(url)
//       .then((r) => r.data)
//       .then((data) => {
//         let countries = data.rows || [];
//         let length = data.count;
//         let message = data.msg || "";
//         return {
//           type: FILTERED,
//           payload: { countries, length, message, filterBy },
//         };
//       })
//       .then((action) => dispatch(action))
//       .then(() => dispatch(toggleLoading()));
//   };
// }
