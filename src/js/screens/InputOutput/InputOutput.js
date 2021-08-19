import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import { notifier } from 'node-notifier';
import socketIOClient from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from "@material-ui/core";

import axios from "axios";
import convert from "xml-js";

// import { useDispatch, useSelector } from "react-redux";
// import { deleteAddress, listAddresses } from "./../../actions/addressActions";
// import { ADDRESS_DETAILS_RESET } from "./../../constants/addressConstants";

import InfoIcon from "@material-ui/icons/Info";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import AssignmentIcon from "@material-ui/icons/Assignment";

import Battery90Icon from "@material-ui/icons/Battery90";

import PowerIcon from "@material-ui/icons/Power";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// const ENDPOINT = "http://192.168.1.218:5000";

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

export default function InputOutput(props) {
  // const [ip, setIp] = useState(props.match.params.id);
  const [value, setValue] = React.useState(1);

  const [voltage, setVoltage] = useState(false);
  const [frequency, setFrequency] = useState(false);
  const [mode, setMode] = useState(false);

  const [opVal, setOpVal] = useState(false);
  const [opVal2, setOpVal2] = useState(false);
  const [opFreq, setOpFreq] = useState(false);
  const [opCurr, setOpCurr] = useState(false);
  const [opCurr2, setOpCurr2] = useState(false);
  const [apparentPower, setApparentPower] = useState(false);
  const [apparentPower2, setApparentPower2] = useState(false);
  const [powerFactor, setPowerFactor] = useState(false);
  const [opFactState, setOpFactState] = useState(false);
  const [opKWhState, setOpKWhState] = useState(false);

  const [lineStatusState, setLineStatusState] = useState(false);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);
  // function createData(name, data) {
  //   return { name, data };
  // }

  // const rows = [
  //   createData("Frozen yoghurt", 159),

  // ];

  // const ip = props.match.params.id;
  // console.log("ip:", ip);

  // const ip = "192.168.0.90";
  let ip = props.match.params.id;

  const upsName = props.match.params.name;

  // console.log("ip:", ip);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(`hhhhhhttp://${ip}/xml/get_live_status.xml?io_status`, ip);

      try {
        axios
          .get(`http://${ip}/xml/get_live_status.xml?io_status`)
          .then(function (response) {
            //   console.log("response: ", response); // this will print xml data structure

            const data = convert.xml2js(response.data, {
              compact: true,
              spaces: 2,
            });
            // console.log("data:", data);

            /// table input

            setError(false);

            setVoltage(data.data.translate[1].text.qualval._attributes.value);

            setFrequency(data.data.translate[2].text.qualval._attributes.value);

            setMode(data.data.translate[3].text._text);

            setLineStatusState(data.data.translate[4].text._text);
            // console.log('lineStatusState:', lineStatusState)

            setOpVal(data.data.translate[5].text.qualval._attributes.value);
            setOpVal2(data.data.translate[6].text.qualval._attributes.value);
            setOpFreq(data.data.translate[7].text.qualval._attributes.value);
            setOpCurr(data.data.translate[8].text.qualval._attributes.value);
            setOpCurr2(data.data.translate[9].text.qualval._attributes.value);
            setApparentPower(
              data.data.translate[10].text.qualval._attributes.value
            );
            setApparentPower2(
              data.data.translate[11].text.qualval._attributes.value
            );
            setPowerFactor(
              data.data.translate[12].text.qualval._attributes.value
            );
            setOpFactState(data.data.translate[13].text._text);
            setOpKWhState(
              data.data.translate[14].text.qualval._attributes.value
            );

            setLoading(false);
          })
          .catch(function (error) {
            console.log("eroorrrr: ", error);

            setError(true);
          })
          .then(function () {
            // always executed
          });
      } catch (err) {
        setError(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  ////////////////////////////////////alerts start ////////////////////////////

  ////////////////////////alerts end//////////////////////////////////////

  return (
    <>
      <div>
        <React.Fragment>
          {" "}
          <CssBaseline />
          <Container maxWidth="sm">
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
                  props.history.push(`/UPSSpecification/${ip}/${upsName}`);
                }}
                label="UPS Specification"
                icon={<InfoIcon />}
              />
              <BottomNavigationAction
                onClick={() => {
                  props.history.push(`/inputOutput/${ip}/${upsName}`);
                }}
                label="Input & Output"
                icon={<SettingsInputComponentIcon />}
              />
              <BottomNavigationAction
                onClick={() => {
                  props.history.push(`/BatteryInverter/${ip}/${upsName}`);
                }}
                label="Battery & Inverter"
                icon={<Battery90Icon />}
              />{" "}
              <BottomNavigationAction
                onClick={() => {
                  props.history.push(`/RelayStatus/${ip}/${upsName}`);
                }}
                label="Relay & Load Shed"
                icon={<AssignmentIcon />}
              />
              <BottomNavigationAction
                onClick={() => {
                  props.history.push(`/UserInput/${ip}/${upsName}`);
                }}
                label="User Input"
                icon={<AccountCircleIcon />}
              />
              <BottomNavigationAction
                onClick={() => {
                  props.history.push(`/PowerOutage/${ip}/${upsName}`);
                }}
                label="Power Outage"
                icon={<PowerIcon />}
              />
            </BottomNavigation>
            {/* {error && <h1>error</h1>} */}
            <h1 className="rainbow-text">
              Input & Output - {upsName}
            </h1>{" "}
            {error ? (
              <>
                <Alert severity="error">
                  Error- cheack if the UPS is connected
                </Alert>
              </>
            ) : loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Input Parameters</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {voltage || frequency || mode ? (
                      <>
                        <TableBody>
                          <StyledTableRow>
                            {voltage && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Voltage
                                </StyledTableCell>

                                <StyledTableCell>{voltage} VAC</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {frequency && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Frequency
                                </StyledTableCell>

                                <StyledTableCell>
                                  {frequency} HZ
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {mode && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Mode
                                </StyledTableCell>

                                <StyledTableCell>{mode}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>
                        </TableBody>
                      </>
                    ) : (
                      <>
                        {" "}
                        <CircularProgress />
                      </>
                    )}{" "}
                  </Table>
                </TableContainer>
                <br />
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Output Parameterss</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {opKWhState ||
                    opFactState ||
                    powerFactor ||
                    apparentPower2 ||
                    apparentPower2 ||
                    apparentPower ||
                    opCurr2 ||
                    opCurr ||
                    opFreq ||
                    opVal2 ||
                    opVal ? (
                      <>
                        {" "}
                        <TableBody>
                          <TableRow>Vout Qualified</TableRow>

                          <StyledTableRow>
                            {opVal && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Voltage
                                </StyledTableCell>

                                <StyledTableCell>{opVal} VAC</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {opVal2 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Voltage 2
                                </StyledTableCell>

                                <StyledTableCell>{opVal2} VAC</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {opFreq && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Frequency
                                </StyledTableCell>

                                <StyledTableCell>{opFreq} Hz</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {opCurr && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Current
                                </StyledTableCell>

                                <StyledTableCell>{opCurr} A</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {opCurr2 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Current 2
                                </StyledTableCell>

                                <StyledTableCell>{opCurr2} A</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {apparentPower && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Apparent Power
                                </StyledTableCell>

                                <StyledTableCell>
                                  {apparentPower} VA
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {apparentPower2 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Apparent Power2
                                </StyledTableCell>

                                <StyledTableCell>
                                  {apparentPower2} VA
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          {/* 
                  <StyledTableRow>
                    {powerFactor && (
                      <>
                        <StyledTableCell component="th" scope="row">
                        Power Factor
                        </StyledTableCell>

                        <StyledTableCell>{powerFactor}</StyledTableCell>
                      </>
                    )}
                  </StyledTableRow> */}

                          <StyledTableRow>
                            {opFactState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Power Factor
                                </StyledTableCell>

                                <StyledTableCell>{opFactState}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {opKWhState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Energy Meter
                                </StyledTableCell>

                                <StyledTableCell>
                                  {opKWhState} KWh
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>
                        </TableBody>
                      </>
                    ) : (
                      <>
                        {" "}
                        <CircularProgress />
                      </>
                    )}
                  </Table>
                </TableContainer>
                <Typography component="div"></Typography>
              </>
            )}
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
