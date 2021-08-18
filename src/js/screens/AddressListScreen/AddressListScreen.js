import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, listAddresses } from "./../../actions/addressActions";
import { ADDRESS_DETAILS_RESET } from "./../../constants/addressConstants";
import { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import "./AddressListScreen.scss";
import { CircularProgress, Fab } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";





import axios from "axios";

import convert from "xml-js";

// import Link from "@material-ui/core/Link";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core/Button";
let obj = {};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function AddressListScreen(props) {

  ////////////////////////////////////alerts start ////////////////////////////

  const addressList = useSelector((state) => state.addressList);
  const { loading, error, addresses } = addressList;
  // console.log("addresses:", addresses);

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
    dispatch({
      type: ADDRESS_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (address) => {
    console.log("address:", address);
    if (window.confirm("Are you sure?")) {
      dispatch(deleteAddress(address._id));
    }
  };

  const [objFaults, setObjFaults] = useState({});

  const [dataAlert, setDataAlert] = useState(false);

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

  ////////////////////////alerts end//////////////////////////////////////

  const classes = useStyles();
  // console.log("objFaults:", objFaults);
  return (
    <React.Fragment>
      <CssBaseline />
      {loadingDelete && <CircularProgress />}
      {errorDelete && <Alert severity="error">{errorDelete}</Alert>}
      {successDelete && (
        <Alert severity="success">Address Deleted Successfully</Alert>
      )}

      <Container maxWidth="md">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
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

            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                props.history.push(`/address/add`);
              }}
            >
              <AddIcon />
            </Fab>
            <TableContainer component={Paper}>
              {" "}
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Ip</StyledTableCell>
                    <StyledTableCell align="right">Date Add</StyledTableCell>
                    <StyledTableCell align="right">Edit</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses &&
                    addresses.map((address) => (
                      <StyledTableRow key={address.name}>
                        {" "}
                        <StyledTableCell component="th" scope="row">
                          {address.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {address.ip}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {address.createdAt.substring(0, 10)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton color="primary" aria-label="delete">
                            <EditIcon
                              className="pointer"
                              onClick={() => {
                                props.history.push(
                                  `/address/${address._id}/edit`
                                );
                              }}
                            />{" "}
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton color="secondary" aria-label="delete">
                            <DeleteIcon
                              className="pointer"
                              onClick={() => deleteHandler(address)}
                            />{" "}
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
