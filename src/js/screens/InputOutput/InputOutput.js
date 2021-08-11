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

const ENDPOINT = "http://192.168.1.218:5000";

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
  const [ip, setIp] = useState(props.match.params.id);

  const [socket, setSocket] = useState(null);
  const [voltage, setVoltage] = useState(false);
  const [frequency, setFrequency] = useState(false);
  const [mode, setMode] = useState(false);

  const [opVal, setoOpVal] = useState(false);
  const [opVal2, setOpVal2] = useState(false);
  const [opFreq, setOpFreq] = useState(false);
  const [opCurr, setOpCurr] = useState(false);
  const [opCurr2, setOpCurr2] = useState(false);
  const [apparentPower, setApparentPower] = useState(false);
  const [apparentPower2, setApparentPower2] = useState(false);
  const [powerFactor, setPowerFactor] = useState(false);
  const [opFactState, setOpFactState] = useState(false);
  const [opKWhState, setOpKWhState] = useState(false);

  const [error, setError] = useState(false);

  // function createData(name, data) {
  //   return { name, data };
  // }

  // const rows = [
  //   createData("Frozen yoghurt", 159),

  // ];

  // const ip = props.match.params.id;
  // console.log("ip:", ip);

  // const ip = "192.168.0.90";

  useEffect(() => {
    const sk = socketIOClient(ENDPOINT);

    sk.emit("ip", ip);
    console.log('sk.emit("ip", ip)');

    sk.emit(`InputOutput`, ip);
    console.log(" sk.emit(`InputOutput`, ip);");
    if (!socket) {
      // console.log("useEffect in Room Screen :");
      setSocket(sk);

      sk.on("voltage", (data) => {
        if (data) {
          console.log("volt:", data);
          setVoltage(data);
        }
      });
      sk.on("frequency", (data) => {
        if (data) {
          console.log("frequency:", data);

          setFrequency(data);
        }
      });

      sk.on("mode", (data) => {
        if (data) {
          console.log("mode:", data);

          setMode(data);
        }
      });

      sk.on("opVal", (data) => {
        if (data) {
          console.log("opVal:", data);

          setoOpVal(data);
        }
      });

      sk.on("opVal2", (data) => {
        if (data) {
          console.log("opVal2:", data);

          setOpVal2(data);
        }
      });

      sk.on("opFreq", (data) => {
        if (data) {
          console.log("opFreq:", data);

          setOpFreq(data);
        }
      });

      sk.on("opCurr", (data) => {
        if (data) {
          setOpCurr(data);
        }
      });

      sk.on("opCurr2", (data) => {
        if (data) {
          setOpCurr2(data);
        }
      });

      sk.on("apparentPower", (data) => {
        if (data) {
          setApparentPower(data);
        }
      });

      sk.on("apparentPower2", (data) => {
        if (data) {
          setApparentPower2(data);
        }
      });

      sk.on("powerFactor", (data) => {
        if (data) {
          setPowerFactor(data);
        }
      });

      sk.on("opFactState", (data) => {
        if (data) {
          setOpFactState(data);
        }
      });

      sk.on("opKWhState", (data) => {
        if (data) {
          setOpKWhState(data);
        }
      });

      sk.on("error", () => {
        setError(true);
      });
    }
  }, [socket, ip]);

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
            {/* {error && <h1>error</h1>} */}
            <h1 className="rainbow-text">UPS Contorol </h1>{" "}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
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

                            <StyledTableCell>{frequency} HZ</StyledTableCell>
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
              <Table className={classes.table} aria-label="customized table">
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

                            <StyledTableCell>{opKWhState} KWh</StyledTableCell>
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
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
