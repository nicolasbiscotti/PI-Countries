import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware),
);
