import Axios from "axios";
import {
  ADDRESS_DETAILS_FAIL,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_SIGNIN_FAIL,
  ADDRESS_SIGNIN_REQUEST,
  ADDRESS_SIGNIN_SUCCESS,
  ADDRESS_SIGNOUT,

  ADDRESS_UPDATE_PROFILE_FAIL,
  ADDRESS_UPDATE_PROFILE_REQUEST,
  ADDRESS_UPDATE_PROFILE_SUCCESS,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_DELETE_REQUEST,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_FAIL,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_FAIL,

} from "../constants/addressConstants";




export const create = (name,ip) => async (dispatch) => {
  dispatch({
    type: ADDRESS_CREATE_REQUEST,
    payload: { name, ip},
  });
  try {
    const { data } = await Axios.post("http://localhost:5000/api/addresses/create", {
      name,
      ip,
    });

    dispatch({ type: ADDRESS_CREATE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: ADDRESS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};







// export const signin = (ip, password) => async (dispatch) => {
//   dispatch({ type: ADDRESS_SIGNIN_REQUEST, payload: { ip, password } });
//   try {
//     const { data } = await Axios.post("http://localhost:5000/api/addresses/signin", { ip, password });
//     dispatch({ type: ADDRESS_SIGNIN_SUCCESS, payload: data });
//     // dispatch(ipAddress(ip));

//     localStorage.setItem("addressInfo", JSON.stringify(data));
//   } catch (error) {
//     // console.log("error :", error);
//     dispatch({
//       type: ADDRESS_SIGNIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };





// export const signout = () => (dispatch) => {
//   localStorage.removeItem("addressInfo");


//   dispatch({ type: ADDRESS_SIGNOUT });
//   document.location.href = "/signin";
// };



export const listAddresses = () => async (dispatch, getState) => {
  dispatch({ type: ADDRESS_LIST_REQUEST });
  try {
   
    const { data } = await Axios.get("http://localhost:5000/api/addresses");

    dispatch({ type: ADDRESS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADDRESS_LIST_FAIL, payload: message });
  }
};




export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch({ type: ADDRESS_DELETE_REQUEST, payload: addressId });

  try {
    const { data } = await Axios.delete(`http://localhost:5000/api/addresses/${addressId}`);
    dispatch({ type: ADDRESS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADDRESS_DELETE_FAIL, payload: message });
  }
};





export const detailsAddress = (addressId) => async (dispatch) => {
  dispatch({ type: ADDRESS_DETAILS_REQUEST, payload: addressId });
  
  try {
    const { data } = await Axios.get(`http://localhost:5000/api/addresses/${addressId}`);
    dispatch({ type: ADDRESS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADDRESS_DETAILS_FAIL, payload: message });
  }
};



export const updateAddress = (address) => async (dispatch) => {
  console.log('address:', address)
  dispatch({ type: ADDRESS_UPDATE_PROFILE_REQUEST, payload: address });

  try {
    const { data } = await Axios.patch(`http://localhost:5000/api/addresses/${address._id}`, address);
    dispatch({ type: ADDRESS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADDRESS_UPDATE_FAIL, payload: message });
  }
};





