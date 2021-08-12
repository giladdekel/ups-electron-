import {
  ADDRESS_DELETE_FAIL,
  ADDRESS_DELETE_REQUEST,
  ADDRESS_DELETE_RESET,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_RESET,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_SIGNIN_FAIL,
  ADDRESS_SIGNIN_REQUEST,
  ADDRESS_SIGNIN_SUCCESS,
  ADDRESS_SIGNOUT,


  ADDRESS_UPDATE_FAIL,
 
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_RESET,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_CREATE_RESET,

 
} from "../constants/addressConstants";


export const addressCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_CREATE_REQUEST:
      return { loading: true };
    case ADDRESS_CREATE_SUCCESS:
      return { loading: false, addressInfo: action.payload,  success: true };
    case ADDRESS_CREATE_FAIL:
      return { loading: false, error: action.payload , success: false };
      case ADDRESS_CREATE_RESET:
        return {};
    default:
      return state;
  }
};

export const addressSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_SIGNIN_REQUEST:
      return { loading: true };
    case ADDRESS_SIGNIN_SUCCESS:
      return { loading: false, addressInfo: action.payload };
    case ADDRESS_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case ADDRESS_SIGNOUT:
      return {};
    default:
      return state;
  }
};



export const addressDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADDRESS_DETAILS_REQUEST:
      return { loading: true };
    case ADDRESS_DETAILS_SUCCESS:
      return { loading: false, address: action.payload };
    case ADDRESS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ADDRESS_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const addressUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_UPDATE_REQUEST:
      return { loading: true };
    case ADDRESS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADDRESS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADDRESS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const addressListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADDRESS_LIST_REQUEST:
      return { loading: true };
    case ADDRESS_LIST_SUCCESS:
      return { loading: false, addresses: action.payload };
    case ADDRESS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const addressDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_DELETE_REQUEST:
      return { loading: true };
    case ADDRESS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ADDRESS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ADDRESS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

