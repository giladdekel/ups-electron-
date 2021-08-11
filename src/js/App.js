// import logo from './logo.svg';
// import './App.css';
import React from "react";

import { HashRouter, Link, Route, Switch } from "react-router-dom";

// import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
// import NotFoundPage from "./screens/notfound/notfound.component";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

import InputOutput from "./screens/InputOutput/InputOutput";
import ResponsiveDrawer from "./components/ResponsiveDrawer/ResponsiveDrawer";


import BatteryInverter from "./screens/BatteryInverter/BatteryInverter";


import RelayStatus from "./screens/RelayStatus/RelayStatus";

// import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";

// import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
// import SigninScreen from "./screens/SigninScreen/SigninScreen";
// import UserListScreen from "./screens/UserListScreen/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen/UserEditScreen";

function App() {
  return (
    <HashRouter>
      <div className="App">
        {/* <ScrollToTop /> */}

        <div className="grid-container">
          <ResponsiveDrawer />
          <Switch>
            <Route path="/" component={HomeScreen} exact></Route>

            <Route path="/inputoutput/:id" component={InputOutput}></Route>


            <Route path="/BatteryInverter/:id" component={BatteryInverter}></Route>

            <Route path="/RelayStatus/:id" component={RelayStatus}></Route>

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
