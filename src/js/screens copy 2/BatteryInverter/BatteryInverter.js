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

const ENDPOINT = "http://192.168.0.91:5000";

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
  const [socket, setSocket] = useState(null);
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

  // function createData(name, data) {
  //   return { name, data };
  // }

  // const rows = [
  //   createData("Frozen yoghurt", 159),

  // ];

  const ip = props.match.params.id;
  console.log("ip:", ip);
  // const ip = "192.168.0.90";

  useEffect(() => {
    if (!socket) {
      // console.log("useEffect in Room Screen :");

      const sk = socketIOClient(ENDPOINT);

      setSocket(sk);

      sk.emit(`BatteryInverter`, ip);
      console.log(" sk.emit(`BatteryInverter`, ip);");

      sk.on("modeState", (data) => {
        if (data) {
          setModeState(data);
        }
      });
      sk.on("batVoltState", (data) => {
        if (data) {
          setBatVoltState(data);
        }
      });

      sk.on("batCCurState", (data) => {
        if (data) {
          setBatCCurState(data);
        }
      });

      sk.on("batRRemState", (data) => {
        if (data) {
          console.log("opVal:", data);

          setBatRRemState(data);
        }
      });

      sk.on("batTempState", (data) => {
        if (data) {
          setBatTempState(data);
        }
      });

      sk.on("peukertNumberState", (data) => {
        if (data) {
          setPeukertNumberState(data);
        }
      });

      sk.on("peukertCapacityState", (data) => {
        if (data) {
          setPeukertCapacityState(data);
        }
      });

      sk.on("batteryOpenVoltageState", (data) => {
        if (data) {
          setBatteryOpenVoltageState(data);
        }
      });

      sk.on("invOccState", (data) => {
        if (data) {
          setInvOccState(data);
        }
      });

      sk.on("invAccState", (data) => {
        if (data) {
          setInvAccState(data);
        }
      });
    }
  }, [socket]);

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
        style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2016/01/19/17/15/windmills-1149604_960_720.jpg)`,
          height: "1000px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <React.Fragment>
          {" "}
          <CssBaseline />
          <Container maxWidth="sm">
            <h1 className="rainbow-text">UPS Contorol </h1>{" "}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
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

                            <StyledTableCell>{batCCurState} A</StyledTableCell>
                          </>
                        )}
                      </StyledTableRow>

                      <StyledTableRow>
                        {batRRemState && (
                          <>
                            <StyledTableCell component="th" scope="row">
                              Runtime Remaining
                            </StyledTableCell>

                            <StyledTableCell>{batRRemState} °C</StyledTableCell>
                          </>
                        )}
                      </StyledTableRow>

                      <StyledTableRow>
                        {batTempState && (
                          <>
                            <StyledTableCell component="th" scope="row">
                              External Temperature
                            </StyledTableCell>

                            <StyledTableCell>{batTempState} °C</StyledTableCell>
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
              <Table className={classes.table} aria-label="customized table">
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
            <Typography component="div"></Typography>
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
