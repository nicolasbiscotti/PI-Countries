import axios from "axios";

const PAGINATION_STEP = 10;
const GET_COUNTRIES = "http://localhost:3001/countries";

// Actions
export const SHOW_COUNTRIES = "SHOW_COUNTRIES";
export const TOGGLE_LOADING = "TOGGLE_LOADING";

// Action Creators
export function toggleLoading() {
  return {
    type: TOGGLE_LOADING,
  };
}

export function showCountries(name, page = 0) {
  var url = `${GET_COUNTRIES}?page=${page}&step=${PAGINATION_STEP}`;
  url += name ? `&name=${name}` : "";
  console.log("Action showCountries:" + url);
  return function (dispatch) {
    dispatch(toggleLoading());
    axios
      .get(url)
      .then((r) => r.data)
      .then((countries) => {
        console.log("Action showCountries:" + countries[0]);
        dispatch({ type: SHOW_COUNTRIES, payload: countries });
      })
      .then(() => dispatch(toggleLoading()));
  };
}
