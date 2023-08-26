import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "../actions/categorySlice";

const rootReducer = combineReducers({
  api: apiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
