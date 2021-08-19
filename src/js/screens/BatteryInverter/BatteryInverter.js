import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
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

import InfoIcon from "@material-ui/icons/Info";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import AssignmentIcon from "@material-ui/icons/Assignment";

import Battery90Icon from "@material-ui/icons/Battery90";

import PowerIcon from "@material-ui/icons/Power";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// const ENDPOINT = "http://192.168.0.91:5000";

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

export default function BatteryInverter(props) {
  const [value, setValue] = React.useState(2);

  const [modeState, setModeState] = useState(false);
  const [batVoltState, setBatVoltState] = useState(false);
  const [batCCurState, setBatCCurState] = useState(false);

  const [batRRemState, setBatRRemState] = useState(false);
  const [batTempState, setBatTempState] = useState(false);
  const [peukertNumberState, setPeukertNumberState] = useState(false);

  const [peukertCapacityState, setPeukertCapacityState] = useState(false);
  const [batteryOpenVoltageState, setBatteryOpenVoltageState] = useState(false);
  const [invOccState, setInvOccState] = useState(false);

  const [invAccState, setInvAccState] = useState(false);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);
  const ip = props.match.params.id;

  const upsName=props.match.params.name;

  // console.log("ip:", ip);
  // const ip = "192.168.0.90";

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(`hhhhhhttp://${ip}/xml/get_live_status.xml?io_status`, ip);

      try {
        axios
          .get(`http://${ip}/xml/get_live_status.xml?battery_inverter`)
          .then(function (response) {
            //   console.log("response: ", response); // this will print xml data structure

            const data = convert.xml2js(response.data, {
              compact: true,
              spaces: 2,
            });
            // console.log("data:", data);

            /// table input

            setError(false);

            setModeState(data.data.translate[0].text._text);

            setBatVoltState(
              data.data.translate[1].text.qualval._attributes.value
            );

            setBatCCurState(
              data.data.translate[2].text.qualval._attributes.value
            );

            setBatRRemState(
              data.data.translate[2].text.qualval._attributes.value
            );
            // console.log('lineStatusState:', lineStatusState)

            setBatTempState(
              data.data.translate[4].text.qualval._attributes.value
            );
            setPeukertNumberState(data.data.translate[5].text._text);

            setPeukertCapacityState(data.data.translate[6].text._text);

            setBatteryOpenVoltageState(data.data.translate[7].text._text);
            setInvOccState(
              data.data.translate[8].text.qualval._attributes.value
            );
            setInvAccState(
              data.data.translate[9].text.countdown._attributes.value
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
        console.log("err:", err);
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
            <h1 className="rainbow-text"> Battery & Inverter -{upsName} </h1>{" "}
            {error ? (
              <Alert severity="error">
                Error- cheack if the UPS is connected
              </Alert>
            ) : (
              <>
                {" "}
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
                    {modeState ||
                    batVoltState ||
                    batCCurState ||
                    batRRemState ||
                    batTempState ||
                    peukertNumberState ||
                    peukertCapacityState ||
                    batteryOpenVoltageState ? (
                      <>
                        {" "}
                        <TableBody>
                          <TableRow>24 VDC</TableRow>

                          <StyledTableRow>
                            {batVoltState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Battery Voltage
                                </StyledTableCell>

                                <StyledTableCell>
                                  {batVoltState} VDC
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {batCCurState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Charging Current
                                </StyledTableCell>

                                <StyledTableCell>
                                  {batCCurState} A
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {batRRemState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Runtime Remaining
                                </StyledTableCell>

                                <StyledTableCell>
                                  {batRRemState} °C
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {batTempState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  External Temperature
                                </StyledTableCell>

                                <StyledTableCell>
                                  {batTempState} °C
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {peukertNumberState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Peukert Number
                                </StyledTableCell>

                                <StyledTableCell>
                                  {peukertNumberState} Ah
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {peukertCapacityState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Capacity
                                </StyledTableCell>

                                <StyledTableCell>
                                  {peukertCapacityState} Ah
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {batteryOpenVoltageState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Battery Open-Circuit Voltage
                                </StyledTableCell>

                                <StyledTableCell>
                                  {batteryOpenVoltageState} VDC
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
                <br />
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Battery Parameters</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {invOccState || invAccState ? (
                      <>
                        <TableBody>
                          <TableRow></TableRow>
                          <TableRow>Inverter Parameters</TableRow>

                          <StyledTableRow>
                            {invOccState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Accumulated Line Failures
                                </StyledTableCell>

                                <StyledTableCell>
                                  {invOccState} Time
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {invAccState && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Accumulated Backup Time
                                </StyledTableCell>

                                <StyledTableCell>{invAccState}</StyledTableCell>
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
              </>
            )}
            <Typography component="div"></Typography>
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
