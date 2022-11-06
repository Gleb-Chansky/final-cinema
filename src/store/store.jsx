import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { dataReducer } from "./reducer";
import thunk from "redux-thunk";

export const store = configureStore(
  { reducer: dataReducer },
  applyMiddleware(thunk)
);
