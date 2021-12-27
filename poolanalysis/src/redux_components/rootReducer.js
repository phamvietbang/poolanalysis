import { combineReducers } from "redux";
import layoutReducer from "./slices/layOutSlice";
import eventReducer from "./slices/eventsSlice";
import allUsersReducer from "./slices/allUsersSlice"
import lendingPoolSlice from "./slices/lendingPoolSlice";
import tokenSlice from "./slices/tokenSlice";
import userSlice from "./slices/userSlice";
const rootReducer = combineReducers({
  layout: layoutReducer,
  events: eventReducer,
  allusers: allUsersReducer,
  lendingpool: lendingPoolSlice,
  token: tokenSlice,
  user: userSlice
});
export default rootReducer;