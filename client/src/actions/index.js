import axios from "axios";

export const PAGINATION_STEP = 10;
export const GET_COUNTRIES_URL = "http://localhost:3001/countries";

// Actions
export const FILTERED = "FILTERED";
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
export function recivedCountries(countries, message) {
  return {
    type: RECIVED_COUNTRIES,
    payload: { countries, message },
  };
}

export function filteredCountries(filterBy) {
  return {
    type: FILTERED,
    payload: filterBy,
  };
}

export function fetchCountries(name) {
  let url = name ? `${GET_COUNTRIES_URL}?name=${name}` : GET_COUNTRIES_URL;
  return function (dispatch) {
    dispatch(getCountries());
    dispatch(resetPagination());
    axios
      .get(url)
      .then((r) => r.data)
      .then((data) => {
        let countries = data.rows || [];
        let message = data.msg || "";
        dispatch(recivedCountries(countries, message));
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
