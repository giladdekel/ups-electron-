import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  addressDeleteReducer,
  addressDetailsReducer,

  addressNameReducer,
  addressIpReducer,

  addressListReducer,
  addressCreateReducer,
  // addressSigninReducer,
  addressUpdateReducer,
} from "./reducers/addressReducers";

const initialState = {
  addressSignin: {
    addressInfo: localStorage.getItem("addressInfo")
      ? JSON.parse(localStorage.getItem("addressInfo"))
      : null,
  },
};
const reducer = combineReducers({
  addressCreate: addressCreateReducer,

  // addressSignin: addressSigninReducer,

  addressDetails: addressDetailsReducer,


  addressName: addressNameReducer,


  addressIp: addressIpReducer,


  addressUpdate: addressUpdateReducer,

  addressList: addressListReducer,
  addressDelete: addressDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
