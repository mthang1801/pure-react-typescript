import { combineReducers } from "redux";
import { IRootReducers } from "../interfaces/root.interfaces";
import globalReducer from "./global.reducer";

const rootReducers = combineReducers<IRootReducers>({
  globalReducer
});

export default rootReducers;
