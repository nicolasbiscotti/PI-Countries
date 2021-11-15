import { SHOW_COUNTRIES, TOGGLE_LOADING } from "../actions";

const initialState = {
  countriesList: [],
  countryDetails: {},
  isLoading: false,
  page: 0,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_COUNTRIES:
      return {
        ...state,
        countriesList: action.payload,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    default:
      return {...state};
  }
}
