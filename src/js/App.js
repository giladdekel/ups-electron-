// import logo from './logo.svg';
import React, { useEffect } from "react";

import "./App.scss";

import { HashRouter, Link, Route, Switch } from "react-router-dom";

// import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
// import NotFoundPage from "./screens/notfound/notfound.component";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

import InputOutput from "./screens/InputOutput/InputOutput";

import ResponsiveDrawer from "./components/ResponsiveDrawer/ResponsiveDrawer";
import Alerts from "./components/Alerts/Alerts";

import BatteryInverter from "./screens/BatteryInverter/BatteryInverter";

import RelayStatus from "./screens/RelayStatus/RelayStatus";

import UPSSpecification from "./screens/UPSSpecification/UPSSpecification";

import UserInput from "./screens/UserInput/UserInput";

import PowerOutage from "./screens/PowerOutage/PowerOutage";

import AddressListScreen from "./screens/AddressListScreen/AddressListScreen";

// import AddressAddScreen from "./screens/AddressAddScreen/AddressAddScreen";
// import SigninScreen from "./screens/SigninScreen/SigninScreen";
import AddressEditScreen from "./screens/AddressEditScreen/AddressEditScreen";

import AddressAddScreen from "./screens/AddressAddScreen/AddressAddScreen";

import AddressInfoScreen from "./screens/AddressInfoScreen/AddressInfoScreen";
import { listAddresses } from "./actions/addressActions";

// import NotFoundPage from "./screens/notfound/notfound.component";

// import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";

// import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
// import SigninScreen from "./screens/SigninScreen/SigninScreen";
// import UserListScreen from "./screens/UserListScreen/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen/UserEditScreen";

import { useDispatch, useSelector } from "react-redux";
import { ADDRESS_DETAILS_RESET } from "./constants/addressConstants";
import SearchBar from "./components/SearchBar/SearchBar";
import Container  from '@material-ui/core/Container';

function App() {
  const addressList = useSelector((state) => state.addressList);
  const { loading, error, addresses } = addressList;
  console.log(" const addressList = useSelector((state):", addresses);
  // console.log("addresses:", addresses);
  let makeAction = true;

  const addressDelete = useSelector((state) => state.addressDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = addressDelete;

  const dispatch = useDispatch();

  // useEffect(() => {
  //     getAlert()

  // }, [])

  useEffect(() => {
    dispatch(listAddresses());
    console.log("listAddresses");
    dispatch({
      type: ADDRESS_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  return (
    <HashRouter>
      <div className="App">
        {/* <ScrollToTop /> */}

        <div className="grid-container">
          <ResponsiveDrawer />

            <Container maxWidth="sm">
              {" "}
              <Route
                render={({ history }) => (
                  <SearchBar history={history}></SearchBar>
                )}
              ></Route>
            </Container>
          {/* <Alerts /> */}

          <Switch>
            <Route path="/" component={HomeScreen} exact></Route>

            <Route path="/address/list" component={AddressListScreen} exact ></Route>

            {/* <Route
              path="/address/create"
              component={AddressCreateScreen}
            ></Route> */}

            <Route
              path="/address/:id/edit"
              component={AddressEditScreen}
            ></Route>

            <Route path="/address/add" component={AddressAddScreen}></Route>

            <Route
              path="/address/info/:id/:name"
              component={AddressInfoScreen}
              exact
            ></Route>



            {/* <Route
              path="/address/info/:name"
              component={AddressInfoScreen}
              exact
            ></Route> */}



            <Route path="/inputoutput/:id/:name" component={InputOutput}></Route>

            <Route
              path="/BatteryInverter/:id/:name"
              component={BatteryInverter}
            ></Route>

            <Route path="/RelayStatus/:id/:name" component={RelayStatus}></Route>

            <Route
              path="/UPSSpecification/:id/:name"
              component={UPSSpecification}
            ></Route>

            <Route path="/UserInput/:id/:name" component={UserInput}></Route>

            <Route path="/PowerOutage/:id/:name" component={PowerOutage}></Route>

            {/* <Route path="/signin" component={SigninScreen}></Route>

            <Route path="/userlist" component={UserListScreen}></Route>

            <Route path="/user/:id/edit" component={UserEditScreen}></Route> */}

            {/* <Route path="/profile" component={ProfileScreen}></Route> */}

            {/* <Route component={NotFoundPage} /> */}
          </Switch>

          {/* <Footer /> */}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
