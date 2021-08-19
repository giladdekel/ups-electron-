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


  const [value, setValue] = React.useState(4);

  const [mode, setMode] = useState();

  const [rs0, setRs0] = useState();

  const [ra0, setRa0] = useState();

  const [rs1, setRs1] = useState();

  const [ra1, setRa1] = useState();

  const [rs2, setRs2] = useState();

  const [ra2, setRa2] = useState();

  const [rs3, setRs3] = useState();

  const [ra3, setRa3] = useState();

  const [rs4, setRs4] = useState();

  const [ra4, setRa4] = useState();

  const [rs5, setRs5] = useState();

  const [ra5, setRa5] = useState();

  const [tmr1, setTmr1] = useState();
  const [tmr2, setTmr2] = useState();
  const [tmr3, setTmr3] = useState();

  const [rDTAState1Status, setRDTAState1Status] = useState();

  const [rDTAState2Status, setRDTAState2Status] = useState();

  const [error, setError] = useState();

  const [loading, setLoading] = useState();

  const ip = props.match.params.id;
  // console.log("ip:", ip);

  const upsName = props.match.params.name;


  useEffect(() => {
    const interval = setInterval(() => {
      try {
        axios
          .get(`http://${ip}/xml/get_live_status.xml?relay_status`)
          .then(function (response) {
            //   console.log("response: ", response); // this will print xml data structure

            const data = convert.xml2js(response.data, {
              compact: true,
              spaces: 2,
            });

            console.log("data:", data.data);

            setMode(data.data.newval[0]._text);
            setRs0(data.data.newval[1]._text);
            setRa0(data.data.newval[2]._text);
            setRs1(data.data.newval[3]._text);
            setRa1(data.data.newval[4]._text);
            setRs2(data.data.newval[5]._text);
            setRa2(data.data.newval[6]._text);
            setRs3(data.data.newval[7]._text);
            setRa3(data.data.newval[8]._text);
            setRs4(data.data.newval[9]._text);
            setRa4(data.data.newval[10]._text);
            setRs5(data.data.newval[11]._text);
            setRa5(data.data.newval[12]._text);
            setTmr1(data.data.newval[13].countdown._attributes.value);
            setTmr2(data.data.newval[14].countdown._attributes.value);
            setTmr3(data.data.newval[15].countdown._attributes.value);
            setRDTAState1Status(data.data.newval[16]._text);
            setRDTAState2Status(data.data.newval[17]._text);

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
      <div
  
      >
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

   

            <h1 className="rainbow-text"> Relay & Load Shed - {upsName} </h1>{" "}
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
                        <StyledTableCell>
                          Relay Programmable Status
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {rs0 ||
                    ra0 ||
                    rs1 ||
                    ra1 ||
                    rs2 ||
                    ra2 ||
                    rs3 ||
                    ra3 ||
                    rs4 ||
                    ra4 ||
                    rs5 ||
                    ra5 ? (
                      <>
                        {" "}
                        <TableBody>
                          <StyledTableRow>
                            {rs0 && ra0 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Relay C1
                                </StyledTableCell>

                                <StyledTableCell>{rs0}</StyledTableCell>

                                <StyledTableCell>{ra0}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {rs1 && ra1 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Relay C2
                                </StyledTableCell>

                                <StyledTableCell>{rs1}</StyledTableCell>

                                <StyledTableCell>{ra1}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {rs2 && ra2 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Relay C3
                                </StyledTableCell>

                                <StyledTableCell>{rs2}</StyledTableCell>

                                <StyledTableCell>{ra2}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {rs3 && ra3 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Relay C4
                                </StyledTableCell>

                                <StyledTableCell>{rs3}</StyledTableCell>

                                <StyledTableCell>{ra3}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {rs4 && ra4 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Relay C5
                                </StyledTableCell>

                                <StyledTableCell>{rs4}</StyledTableCell>

                                <StyledTableCell>{ra4}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {rs5 && ra5 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Relay C6
                                </StyledTableCell>

                                <StyledTableCell>{rs5}</StyledTableCell>

                                <StyledTableCell>{ra5}</StyledTableCell>
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
                        <StyledTableCell>
                          Load Shed Timer Status
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {tmr1 || tmr2 || tmr3 ? (
                      <>
                        {" "}
                        <TableBody>
                          <StyledTableRow>
                            <>
                              <StyledTableCell
                                component="th"
                                scope="row"
                              ></StyledTableCell>

                              <StyledTableCell>Time Remaining</StyledTableCell>
                            </>
                          </StyledTableRow>

                          <StyledTableRow>
                            {tmr1 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Timer 1
                                </StyledTableCell>

                                <StyledTableCell>
                                  {Math.floor(tmr1 / 3600)}hr{" "}
                                  {Math.floor((tmr1 % 3600) / 60)}min{" "}
                                  {Math.floor((tmr1 % 3600) % 60)}sec
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {tmr2 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Timer 2
                                </StyledTableCell>

                                <StyledTableCell>
                                  {Math.floor(tmr2 / 3600)}hr{" "}
                                  {Math.floor((tmr2 % 3600) / 60)}min{" "}
                                  {Math.floor((tmr2 % 3600) % 60)}sec
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {tmr3 && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Timer 3
                                </StyledTableCell>

                                <StyledTableCell>
                                  {Math.floor(tmr3 / 3600)}hr{" "}
                                  {Math.floor((tmr3 % 3600) / 60)}min{" "}
                                  {Math.floor((tmr3 % 3600) % 60)}sec
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
                        <StyledTableCell>
                          Time Of Day Action Status
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {rDTAState1Status || rDTAState2Status ? (
                      <>
                        {" "}
                        <TableBody>
                          <StyledTableRow>
                            {rDTAState1Status && rDTAState2Status && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Action Enabled
                                </StyledTableCell>

                                <StyledTableCell>
                                  {rDTAState1Status}
                                </StyledTableCell>

                                <StyledTableCell>
                                  {rDTAState2Status}
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
              </>
            )}
            <Typography component="div"></Typography>
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
