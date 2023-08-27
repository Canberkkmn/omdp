import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "../actions/ApiSlice";
import detailApiReducer from "../actions/DetailApiSlice";

const rootReducer = combineReducers({
  api: apiReducer,
  detailApi: detailApiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
