import {
  FORWARD_PAGE,
  GOBACK_PAGE,
  RESET_PAGINATION,
  GET_COUNTRIES,
  RECIVED_COUNTRIES,
  RECIVED_DETAIL,
  FILTERED,
} from "../actions";
import filterCountriesBy from "../helperFunctions/filterCountriesBy";

const STEP = 10;

const initialState = {
  countriesList: [],
  filteredCountries: [],
  filtersApplied: {
    continent: false,
    activityId: false,
    population: false,
    name: false,
  },
  message: "",
  countryDetail: {},
  isLoading: false,
  pagination: {
    start: 0,
    end: STEP - 1,
    hasNext: true,
    hasPrev: false,
  },
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        isLoading: true,
      };
    case RECIVED_COUNTRIES:
      return {
        ...state,
        isLoading: false,
        countriesList: action.payload.countries,
        message: action.payload.message,
      };
    case RECIVED_DETAIL:
      return {
        ...state,
        isLoading: false,
        countryDetail: action.payload,
      };
    case FILTERED:
      return {
        ...state,
        filteredCountries: filterCountriesBy(
          state.countriesList,
          action.payload
        ),
        filtersApplied: action.payload,
      };
    case RESET_PAGINATION:
      return {
        ...state,
        pagination: {
          start: 0,
          end: STEP - 1,
          hasNext: true,
          hasPrev: false,
        },
      };
    case FORWARD_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          start: state.pagination.end,
          end: state.pagination.end + STEP,
        },
      };
    case GOBACK_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          start:
            state.pagination.start - STEP >= 0
              ? state.pagination.start - STEP
              : 0,
          end: state.pagination.start,
        },
      };

    default:
      return { ...state };
  }
}
