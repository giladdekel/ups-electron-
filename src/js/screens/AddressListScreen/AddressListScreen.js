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
  const addressList = useSelector((state) => state.addressList);
  const { loading, error, addresses } = addressList;
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
  // {
  //   197.32.23:3221321,
  //   192.142:321332332
  // }
  // obj[197.32.23]=3221321

  // obj[address.ip]=dataFault

  // setInterval(() => {
  //   if (addresses) {
  //     addresses.forEach((address) => {
  //       axios
  //         .get(`http://${address.ip}/xml/get_live_status.xml?alarms_faults`)
  //         .then(function (response) {
  //           // console.log("responseeeeeeeeeeeeeeeeeeeeee: ", response); // this will print xml data structure

  //           const data = convert.xml2js(response.data, {
  //             compact: true,
  //             spaces: 2,
  //           });
  //           let dataFault = data.data.alarms._text;

  //           console.log(`dataFault ${address.ip}: `, dataFault);

  //           // {
  //           //   197.32.23:3221321,
  //           //   192.142:321332332
  //           // }
  //           if (obj[address.ip] !== Number(dataFault)) {
  //             console.log("obj[address.ip] !== Number(dataFault)");
  //             obj[address.ip] = Number(dataFault);
  //             setObjFaults(obj);
  //           }

  //           // if (Number(dataFault) > 0) {
  //           //   console.log("(obj[address.ip] !== Number(dataFault))");
  //           //   obj[address.ip] = Number(dataFault);
  //           //   setObjFaults(obj);

  //           //   console.log("    setObjFaults(obj);:", obj);
  //           //   console.log("objFaults:", objFaults);

  //           //   //   // setFaults((prev) => {
  //           //   //   //   return [...prev, { ip: address.ip, fault: Number(dataFault) }];
  //           //   //   // });
  //           //   // let arr=[];

  //           //   //   arr.push(Number(dataFault))

  //           //   //   setFaults((prev)=>[...prev,{ ip: address.ip, FultsInUps:[arr] }]);
  //           // }
  //         })
  //         .catch(function (error) {
  //           console.log("eroorrrr: ", error);
  //         })
  //         .then(function () {
  //           // always executed
  //         });
  //     });
  //   }
  // }, 5000);

  // setInterval(() => {
  //   function resolveAfter2Seconds() {
  //     if (addresses) {
  //       // console.log("addresses:", addresses);
  //       addresses.forEach((address) => {
  //         axios
  //           .get(`http://${address.ip}/xml/get_live_status.xml?alarms_faults`)
  //           .then(function (response) {
  //             // console.log("responseeeeeeeeeeeeeeeeeeeeee: ", response); // this will print xml data structure
  //             const data = convert.xml2js(response.data, {
  //               compact: true,
  //               spaces: 2,
  //             });
  //             let dataFault = data.data.alarms._text;
  //             console.log("dataFault:", dataFault);

  //               setDataAlert(`${address.ip}: ${dataFault}`);

  //             if (obj[address.ip] !== Number(dataFault)) {
  //               console.log("obj[address.ip] !== Number(dataFault)");
  //               obj[address.ip] = Number(dataFault);
  //               // setObjFaults(obj);
  //             }
  //           })

  //           .catch(function (error) {
  //             console.log("eroorrrr: ", error);
  //             // res.status(500).json({ error });
  //           })
  //           .then(function () {
  //             // always executed
  //           });
  //       });
  //     }
  //   }

  //   async function asyncAlerts() {
  //     const result = await resolveAfter2Seconds();
  //     console.log(result);
  //     // expected output: "resolved"

  //     console.log("obj:", obj);

  //     setObjFaults(obj);
  //   }

  //   asyncAlerts();
  // }, 10000);
  async function getAlert() {
    let promises = [];
    let alertObj = {};
    try {
      if (addresses) {
        console.log("addresses:", addresses);
        addresses.forEach((address) => {
          promises.push(
            axios
              .get(`http://${address.ip}/xml/get_live_status.xml?alarms_faults`)
              .then(function (response) {
                // console.log("responseeeeeeeeeeeeeeeeeeeeee: ", response); // this will print xml data structure
                const data = convert.xml2js(response.data, {
                  compact: true,
                  spaces: 2,
                });
                let dataFault = data.data.alarms._text;
                console.log("dataFault:", dataFault);

                if (alertObj[address.ip] !== Number(dataFault)) {
                  console.log("alertObj[address.ip] !== Number(dataFault)");
                  alertObj[address.ip] = Number(dataFault);
                }
              })
              .catch(function (error) {
                console.log("eroorrrr: ", error);
                // res.status(500).json({ error });
              })
              .then(function () {
                // always executed
              })
          );
          console.log("promises:", promises);
        });
        Promise.all(promises).then(() => setAlerts(alertObj));
      }
    } catch (err) {
      console.log("err:", err);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getAlert();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // setInterval(() => {
  //   // getData();
  //   getAlert();
  // }, 10000);

  // console.log("hello world");

  const classes = useStyles();
  console.log("objFaults:", objFaults);
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
            {" "}
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                props.history.push(`/address/create`);
              }}
            >
              <AddIcon />
            </Fab>
            {/* {faults.length > 0 &&
              faults.map((u) => (
                <Alert severity="error">
                  ip {u.ip}
                 fault {u.faultsArr.map(f=>f.fault)}
                </Alert>
              ))} */}
            {/* // {
  //   197.32.23:3221321,
  //   192.142:321332332
  // } */}
            {/* 

              {

                objFaults.length>0 && objFaults.map(ob=> <Alert severity="error">
                ip {ob}
               fault {u.faultsArr.map(f=>f.fault)}
              </Alert> )
              }
    */}
            {/* {dataAlert && <h1>{dataAlert} </h1>} */}
            {alerts &&
              Object.keys(alerts).map((keyName, i) => (
                <li className="travelcompany-input" key={i}>
                  <span className="input-label">
                    ip: {keyName} fault: {alerts[keyName]}
                  </span>
                </li>
              )).sort((a,b)=>a-b)}
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
