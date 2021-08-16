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

export default function UPSSpecification(props) {
  const [mode, setMode] = useState();

  const [spec_CName, setSpec_CName] = useState();

  const [spec_FCode, setSpec_FCode] = useState();

  const [spec_DName, setSpec_DName] = useState();

  const [spec_PCode, setSpec_PCode] = useState();

  const [spec_UName, setSpec_UName] = useState();

  const [spec_SerName, setSpec_SerName] = useState();

  const [spec_Freq, setSpec_Freq] = useState();

  const [spec_InVolt, setSpec_InVolt] = useState();

  const [spec_OutVA, setSpec_OutVA] = useState();

  const [spec_BatVolt, setSpec_BatVolt] = useState();

  const [spec_ChCur, setSpec_ChCur] = useState();

  const [spec_ChComp, setSpec_ChComp] = useState();

  const [spec_MCUv, setSpec_MCUv] = useState();

  const [spec_RMUv, setSpec_RMUv] = useState();

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);
  const ip = props.match.params.id;
  // console.log("ip:", ip);
  // const ip = "192.168.0.90";

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(`hhhhhhttp://${ip}/xml/get_live_status.xml?io_status`, ip);

      try {
        axios
          .get(`http://${ip}/xml/get_live_status.xml?ups_spec`)
          .then(function (response) {
            //   console.log("response: ", response); // this will print xml data structure

            const data = convert.xml2js(response.data, {
              compact: true,
              spaces: 2,
            });
            console.log("data:", data);

            setMode(data.data.newval[0]._text);
            setSpec_CName(data.data.newval[1]._text);
            setSpec_FCode(data.data.newval[2]._text);
            setSpec_DName(data.data.newval[3]._text);
            setSpec_PCode(data.data.newval[4]._text);
            setSpec_UName(data.data.newval[5]._attributes.id);
            setSpec_SerName(data.data.newval[6]._text);
            setSpec_Freq(data.data.newval[7]._text);
            setSpec_InVolt(data.data.newval[8]._text);
            setSpec_OutVA(data.data.newval[9]._text);
            setSpec_BatVolt(data.data.newval[10]._text);
            setSpec_ChCur(data.data.newval[11]._text);
            setSpec_ChComp(data.data.newval[12]._text);
            setSpec_MCUv(data.data.newval[13]._text);
            setSpec_RMUv(data.data.newval[14]._text);

            /// table input

            setError(false);

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
            <h1 className="rainbow-text"> UPS {ip} - UPS Specification </h1>{" "}
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
                        <StyledTableCell>UPS Specification</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {mode ||
                    spec_CName ||
                    spec_FCode ||
                    spec_DName ||
                    spec_PCode ||
                    spec_UName ||
                    spec_SerName ||
                    spec_Freq ||
                    spec_InVolt ||
                    spec_OutVA ||
                    spec_BatVolt ||
                    spec_ChCur ||
                    spec_ChComp ||
                    spec_MCUv ||
                    spec_RMUv ? (
                      <>
                        {" "}
                        <TableBody>

                          <StyledTableRow>
                            {spec_CName && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Company
                                </StyledTableCell>

                                <StyledTableCell>{spec_CName}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_FCode && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Factory Code
                                </StyledTableCell>

                                <StyledTableCell>{spec_FCode}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_DName && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  UPS Model{" "}
                                </StyledTableCell>

                                <StyledTableCell>{spec_DName}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_PCode && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Product Code
                                </StyledTableCell>

                                <StyledTableCell>{spec_PCode}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_UName && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                Unit Name / ID	
                                </StyledTableCell>

                                <StyledTableCell></StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_SerName && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Serial Number
                                </StyledTableCell>

                                <StyledTableCell>
                                  {spec_SerName} Ah
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_Freq && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Rated Frequency
                                </StyledTableCell>

                                <StyledTableCell>
                                  {spec_Freq} Hz
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_InVolt && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Rated Input Voltage
                                </StyledTableCell>

                                <StyledTableCell>
                                  {spec_InVolt} VAC
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_OutVA && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Rated Output Power
                                </StyledTableCell>

                                <StyledTableCell>
                                  {spec_OutVA} VA
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_BatVolt && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Rated Battery Voltage
                                </StyledTableCell>

                                <StyledTableCell>
                                  {spec_BatVolt} VDC
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_ChCur && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Charger Current
                                </StyledTableCell>

                                <StyledTableCell>
                                  {spec_ChCur} A
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_ChComp && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Temperature Compensation
                                </StyledTableCell>

                                <StyledTableCell>
                                  {spec_ChComp} mV/Cell/°C
                                </StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_MCUv && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  FXM Firmware SW Version
                                </StyledTableCell>

                                <StyledTableCell>{spec_MCUv}</StyledTableCell>
                              </>
                            )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {spec_RMUv && (
                              <>
                                <StyledTableCell component="th" scope="row">
                                  Com Module SW Version
                                </StyledTableCell>

                                <StyledTableCell>{spec_RMUv}</StyledTableCell>
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
              </>
            )}
            <Typography component="div"></Typography>
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
