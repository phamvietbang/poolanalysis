import { combineReducers } from "redux";
import layoutReducer from "./slices/layOutSlice";
import eventReducer from "./slices/eventsSlice";
import allUsersReducer from "./slices/allUsersSlice"
import lendingPoolSlice from "./slices/lendingPoolSlice";
import tokenSlice from "./slices/tokenSlice";
import userSlice from "./slices/userSlice";
import accountPoolReducer from "./account/account-pool-slice";
import accountPoolsReducer from "./account/account-pools-slice";
import accountReducer from "./account/account-slice";
import configReducer from "./other/config-slice"
const rootReducer = combineReducers({
  layout: layoutReducer,
  events: eventReducer,
  allusers: allUsersReducer,
  lendingpool: lendingPoolSlice,
  token: tokenSlice,
  user: userSlice,
  accountSlice: accountReducer,
  accountPoolsSlice: accountPoolsReducer,
  accountPoolSlice: accountPoolReducer,
  configSlice:configReducer,
});
export default rootReducer;