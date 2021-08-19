import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Container from "@material-ui/core/Container";

import axios from "axios";

import convert from "xml-js";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  ipAddress,
  listAddresses,
} from "./../../actions/addressActions";
import {
  ADDRESS_DETAILS_RESET,
  ADDRESS_IP_RESET,
} from "./../../constants/addressConstants";
import Alert from "@material-ui/lab/Alert";

import InfoIcon from "@material-ui/icons/Info";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import AssignmentIcon from "@material-ui/icons/Assignment";

import Battery90Icon from "@material-ui/icons/Battery90";

import PowerIcon from "@material-ui/icons/Power";

// import IconButton from '@material-ui/core/IconButton';

import Button from "@material-ui/core/Button";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";


import "./AddressInfoScreen.scss"












const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function AddressInfoScreen(props) {
  let ip = props.match.params.id;


  let nameUps = props.match.params.name;
  // console.log('namewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww:', name)

  // console.log("ip:", ip);

  const classes = useStyles();
  const [value, setValue] = React.useState();

  ////////////////////////////////////alerts start ////////////////////////////

  const addressList = useSelector((state) => state.addressList);
  const { loading, error, addresses } = addressList;

  const addressIp = useSelector((state) => state.addressIp);
  const {
    loading: loadingAddressIp,
    error: errorAddressIp,
    address,
  } = addressIp;
  // console.log(
  //   "address==============================================================================:",
  //   address
  // );

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
    return () => {
      dispatch({
        type: ADDRESS_IP_RESET,
      });
    };
  }, []);

  useEffect(() => {
    dispatch(listAddresses());
    dispatch({
      type: ADDRESS_DETAILS_RESET,
    });

    if (!address) {
      dispatch(ipAddress(ip));
    }
  }, [dispatch, successDelete, address]);

  const [alerts, setAlerts] = useState();

  const [faults, setFaults] = useState();

  const [upsError, setUpsError] = useState([]);

  function convertAlert(num) {
    // console.log('num :', num);

    let binaryNum = Number(num).toString(2);

    let binaryArr = binaryNum.split("");

    let placesWith1 = [];
    let place = 0;

    // let res=[];
    let str = "";
    let alerts = [
      "Over Load",
      "FAN Alarm",
      "Battery Test",
      "Batt Temp High",
      "Batt Temp Low",
      "Batt Low Warning",
      "Temp Probe Unplug",
      "In Freq Out Of Range",
      "User Input Alarm",
      "Batt Breaker Open",
      "Weak Battery",
      "Invalid Software",
      "AC Breaker Open",
      "Keep Alive Failure",
      "DC Overload",
      "Power Outage",
    ];

    // console.log('binaryArr :', binaryArr);

    for (let i = binaryArr.length - 1; i >= 0; i--, place++) {
      if (binaryArr[i] === "1") {
        placesWith1.push(place);
      }
    }

    console.log(placesWith1);
    // [5, 15];

    for (let i = 0; i < placesWith1.length; i++) {
      //  res.push(alerts[placesWith1[i]]);
      str += " " + alerts[placesWith1[i]];
    }

    // res.forEach((alert) => {
    //   str+=" "+alert;
    // });

    return str;
  }

  function convertFault(num) {
    // console.log('num :', num);

    let binaryNum = Number(num).toString(2);

    let binaryArr = binaryNum.split("");

    let placesWith1 = [];
    let place = 0;

    // let res=[];
    let str = "";
    let alerts = [
      "Overload Fault",
      "Short Circuit",
      "Intl Temp Fault",
      "Output Over Voltage",
      "Output Volt Low",
      "Battery Over Voltage",
      "Batt Volt Low",
      "In Freq Out Of Range",
      "Battery Fail",
      "Backfeed",
      "Weak Battery",
      "Invalid Software",
      "AC Breaker Open",
      "Keep Alive Failure",
      "DC Overload",
      "Power Outage",
    ];

    // console.log('binaryArr :', binaryArr);

    for (let i = binaryArr.length - 1; i >= 0; i--, place++) {
      if (binaryArr[i] === "1") {
        placesWith1.push(place);
      }
    }

    // console.log(placesWith1);
    // [5, 15];

    for (let i = 0; i < placesWith1.length; i++) {
      //  res.push(alerts[placesWith1[i]]);
      str += " " + alerts[placesWith1[i]];
    }

    // res.forEach((alert) => {
    //   str+=" "+alert;
    // });

    return str;
  }

  let alertObj = {};

  async function getAlert() {
    let promises = [];
    try {
      if (addresses) {
        addresses.forEach((address) => {
          // console.log('address:', address)
          axios
            .get(`http://${address.ip}/xml/get_live_status.xml?alarms_faults`)
            .then(function (response) {
              // console.log("responseeeeeeeeeeeeeeeeeeeeee: ", response); // this will print xml data structure
              const data = convert.xml2js(response.data, {
                compact: true,
                spaces: 2,
              });
              let dataFault = data.data.alarms._text;

              console.log(`dataFault: ${address.ip}: `, dataFault);

              // {ups2: 512, ups1: -1}

              if (!dataFault) {
                // console.log("alertObj[address.ip] !== Number(dataFault)");
                alertObj[address.name] = -1;
              } else if (alertObj[address.name] !== Number(dataFault)) {
                // console.log("alertObj[address.ip] !== Number(dataFault)");
                alertObj[address.name] = Number(dataFault);
              }
            })
            .then(function () {
              // setAlerts(alertObj)
              console.log("alertObj:", alertObj);
            })
            .catch(function (error) {
              console.log("eroorrrr: ", error);
              alertObj[address.name] = -1;
              // res.status(500).json({ error });
            })
            .then(function () {
              // always executed
              setAlerts(alertObj);
            });
        });
      }
    } catch (err) {
      console.log("err:", err);
      alertObj[address.name] = -1;
    }
  }

  let alertObjFault = {};

  async function getFault() {
    try {
      if (addresses) {
        addresses.forEach((address) => {
          // console.log('address:', address)
          axios
            .get(`http://${address.ip}/xml/get_live_status.xml?alarms_faults`)
            .then(function (response) {
              // console.log("responseeeeeeeeeeeeeeeeeeeeee: ", response); // this will print xml data structure
              const data = convert.xml2js(response.data, {
                compact: true,
                spaces: 2,
              });
              let dataFault = data.data.faults._text;

              console.log(`dataFault: ${address.ip}: `, dataFault);

              // {ups2: 512, ups1: -1}

              if (!dataFault) {
                // console.log("alertObjFault[address.ip] !== Number(dataFault)");
                alertObjFault[address.name] = -1;
              } else if (alertObjFault[address.name] !== Number(dataFault)) {
                // console.log("alertObjFault[address.ip] !== Number(dataFault)");
                alertObjFault[address.name] = Number(dataFault);
              }
            })
            .then(function () {
              // setAlerts(alertObjFault)
              console.log("alertObjFault:", alertObjFault);
            })
            .catch(function (error) {
              console.log("eroorrrr: ", error);
              alertObjFault[address.name] = -1;
              // res.status(500).json({ error });
            })
            .then(function () {
              // always executed
              setFaults(alertObjFault);
            });
        });
      }
    } catch (err) {
      console.log("err:", err);
      alertObjFault[address.name] = -1;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getAlert();
      getFault();
      // console.log('useEffectuseEffectuseEffectuseEffectuseEffectalerts:', alerts)
      // console.log('useEffectuseEffectuseEffectuseEffectaddresses:', addresses)

      let notConnectedUps = [];

      {
        addresses &&
          addresses.map(
            (address) =>
              ((alertObj[address.name] === undefined &&
                alertObjFault[address.name] === undefined) ||
                (alertObj[address.name] === -1 &&
                  alertObjFault[address.name] === -1)) &&
              notConnectedUps.push(address.name)
          );
      }

      {
        addresses &&
          addresses.map((address) =>
            console.log("alertObj[address.name]", alertObj[address.name])
          );
      }

      console.log("notConnectedUps:", notConnectedUps);

      setUpsError(notConnectedUps);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /////////////////////////handle Click/////////////////////////////////////////////////

  function handleClickOn() {
    console.log("handleClickOn:");

    axios
      .post(
        `http://${ip}/X_CSE.xml`,
        "Novus?me=setUnitConfig&=&=&Unit_Name=&AC_Output_SD=1&DC_Output_SD=0&Bypass_Mode=0&Temperature_Mode=0&Power_Quality=0&PQ_AVR_THRESHOLD=1&Sense_Type=0&Auto_Cfg_Freq=1&Rated_Frequency=50&Rated_Input_Volt=230&Line_Q_Time=3&Refresh_Time=1",
        {
          auth: {
            username: "",
            password: "1111",
          },
        }
      )
      .then(function (response) {
        console.log("responseeeeeeeeeeeeeeeeeeeeee: ", response); // this will print xml data structure
        const data = convert.xml2js(response.data, {
          compact: true,
          spaces: 2,
        });
        console.log("data:", data);
      });
  }

  function handleClickOff() {
    console.log("handleClickOff:");

    axios
      .post(
        `http://${ip}/X_CSE.xml`,
        "Novus?me=setUnitConfig&=&=&Unit_Name=&DC_Output_SD=0&Bypass_Mode=0&Temperature_Mode=0&Power_Quality=0&PQ_AVR_THRESHOLD=1&Sense_Type=0&Auto_Cfg_Freq=1&Rated_Frequency=50&Rated_Input_Volt=230&Line_Q_Time=3&Refresh_Time=1",
        {
          auth: {
            username: "",
            password: "1111",
          },
        }
      )
      .then(function (response) {
        console.log("responseeeeeeeeeeeeeeeeeeeeee: ", response); // this will print xml data structure
        const data = convert.xml2js(response.data, {
          compact: true,
          spaces: 2,
        });
        console.log("data:", data);
      });
  }

  ////////////////////////alerts end//////////////////////////////////////

  return (
    <Container className="addressInfo" maxWidth="sm">
      {alerts &&
        Object.entries(alerts)
          .sort(([key1], [key2]) => Number(key1 > key2) - 0.5)
          .map(
            ([keyName], index) =>
              alerts[keyName] > 0 && (
                <Alert key={index} severity="warning">
                  {" "}
                  <b>{keyName}</b> - alerts:
                  {convertAlert(Number(alerts[keyName]))}
                </Alert>
              )
          )}

      {faults &&
        Object.entries(faults)
          .sort(([key1], [key2]) => Number(key1 > key2) - 0.5)
          .map(
            ([keyName], index) =>
              faults[keyName] > 0 && (
                <Alert key={index} severity="warning">
                  {" "}
                  <b>{keyName}</b> - faults:
                  {convertFault(Number(alerts[keyName]))}
                </Alert>
              )
          )}

      {upsError &&
        upsError.map((ups) => (
          <Alert key={ups} severity="error">
            <b>{ups}</b> is not connected
          </Alert>
        ))}

      {address && (
        <h1 className="rainbow-text">
          {nameUps} - {ip}{" "}
        </h1>
      )}

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          onClick={() => {
            props.history.push(`/UPSSpecification/${ip}/${nameUps}`);
          }}
          label="UPS Specification"
          icon={<InfoIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            props.history.push(`/inputOutput/${ip}/${nameUps}`);
          }}
          label="Input & Output"
          icon={<SettingsInputComponentIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            props.history.push(`/BatteryInverter/${ip}/${nameUps}`);
          }}
          label="Battery & Inverter"
          icon={<Battery90Icon />}
        />{" "}
        <BottomNavigationAction
          onClick={() => {
            props.history.push(`/RelayStatus/${ip}/${nameUps}`);
          }}
          label="Relay & Load Shed"
          icon={<AssignmentIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            props.history.push(`/UserInput/${ip}/${nameUps}`);
          }}
          label="User Input"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            props.history.push(`/PowerOutage/${ip}/${nameUps}`);
          }}
          label="Power Outage"
          icon={<PowerIcon />}
        />
      </BottomNavigation>

      {/* <button onClick={handleClickOn}> On </button> */}

      {/* <IconButton onClick={handleClickOn} color="secondary" aria-label="add an alarm">
        <PowerSettingsNewIcon />
      </IconButton> */}

      <Button
        onClick={handleClickOn}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<PowerSettingsNewIcon />}
      >
        RESET
      </Button>

      {/* <button onClick={handleClickOff}> Off </button> */}
    </Container>
  );
}

// import React, { useState, useEffect } from "react";

// export default function AddressInfoScreen(props) {
//   let ip = props.match.params.id;
//   console.log("ip:", ip);

//   return (
//     <div>
//       <button
//         onClick={() => {
//           props.history.push(`/inputOutput/${ip}`);
//         }}
//       >
//         adddddddddddddddddddddddddddddddddddddddddddd
//       </button>
//     </div>
//   );
// }
