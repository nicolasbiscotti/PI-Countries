import {
  FETCH_COUNTRY_DETAIL,
  FORWARD_PAGE,
  GOBACK_PAGE,
  RESET_PAGINATION,
  SET_NAME,
  SET_NEXT,
  SET_PREV,
  SHOW_COUNTRIES,
  TOGGLE_LOADING,
} from "../actions";

const initialState = {
  countriesList: [],
  countryDetail: {},
  isLoading: false,
  pagination: { page: 0, name: "", hasNext: true, hasPrevious: false },
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
    case RESET_PAGINATION:
      return {
        ...state,
        pagination: { page: 0, name: "", hasNext: true, hasPrevious: false },
      };
    case SET_NAME:
      return {
        ...state,
        pagination: { ...state.pagination, name: action.payload },
      };
    case SET_NEXT:
      return {
        ...state,
        pagination: { ...state.pagination, hasNext: action.payload },
      };
    case SET_PREV:
      return {
        ...state,
        pagination: { ...state.pagination, hasPrevious: action.payload },
      };
    case FORWARD_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };
    case GOBACK_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };
    case FETCH_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    default:
      return { ...state };
  }
}
