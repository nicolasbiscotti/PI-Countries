import axios from "axios";

export const PAGINATION_STEP = 10;
export const GET_COUNTRIES = "http://localhost:3001/countries";

// Actions
export const SHOW_COUNTRIES = "SHOW_COUNTRIES";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const RESET_PAGINATION = "RESET_PAGINATION";
export const SET_NAME = "SET_NAME";
export const FORWARD_PAGE = "FORWARD_PAGE";
export const GOBACK_PAGE = "GOBACK_PAGE";
export const SET_NEXT = "SET_NEXT";
export const SET_PREV = "SET_PREV";
export const FETCH_COUNTRY_DETAIL = "FETCH_COUNTRY_DETAIL";

// Action Creators
export function toggleLoading() {
  return {
    type: TOGGLE_LOADING,
  };
}

export function showCountries(page = 0, name) {
  let url = `${GET_COUNTRIES}?page=${page}&step=${PAGINATION_STEP}`;
  url += name ? `&name=${name}` : "";
  console.log("Action showCountries:" + url);
  return function (dispatch) {
    dispatch(toggleLoading());
    axios
      .get(url)
      .then((r) => r.data)
      .then((countries) => {
        dispatch({ type: SHOW_COUNTRIES, payload: countries.rows });
        dispatch(setNext(countries.hasNext));
        dispatch(setPrev(countries.hasPrevious));
      })
      .then(() => dispatch(toggleLoading()));
  };
}

export function fetchCountries() {
  let url = GET_COUNTRIES;
  return function (dispatch) {
    axios
      .get(url)
      .then((r) => r.data.rows)
      .then((countries) => {
        return {
          type: SHOW_COUNTRIES,
          payload: countries,
        };
      })
      .then((action) => dispatch(action));
  };
}

export function resetPagination() {
  return {
    type: RESET_PAGINATION,
  };
}
export function setSearchName(name) {
  return {
    type: SET_NAME,
    payload: name,
  };
}

export function forwardPage(currentPage) {
  return {
    type: FORWARD_PAGE,
    payload: currentPage + 1,
  };
}
export function gobackPage(currentPage) {
  return {
    type: GOBACK_PAGE,
    payload: currentPage - 1,
  };
}

export function setNext(hasNext) {
  return {
    type: SET_NEXT,
    payload: hasNext,
  };
}
export function setPrev(hasPrev) {
  return {
    type: SET_PREV,
    payload: hasPrev,
  };
}

export function fetchCountryDetail(countryId) {
  const url = `${GET_COUNTRIES}/${countryId}`;
  return function (dispatch) {
    dispatch(toggleLoading());
    axios
      .get(url)
      .then((res) => res.data)
      .then((countryDetail) => {
        return { type: FETCH_COUNTRY_DETAIL, payload: countryDetail };
      })
      .then((action) => dispatch(action))
      .then(() => dispatch(toggleLoading()));
  };
}

export function countryByContinent(countries) {
  return {
    type: SHOW_COUNTRIES,
    payload: countries,
  };
}
