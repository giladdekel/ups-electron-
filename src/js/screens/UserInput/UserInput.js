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

export default function UserInput(props) {
  const [mode, setMode] = useState();

  const [userInputType1Status, setUserInputType1Status] = useState();

  const [userInputType2Status, setUserInputType2Status] = useState();

  const [userInputType3Status, setUserInputType3Status] = useState();

  const [userInputType4Status, setUserInputType4Status] = useState();

  const [userInputLevel1Status, setUserInputLevel1Status] = useState();

  const [userInputLevel2Status, setUserInputLevel2Status] = useState();

  const [userInputLevel3Status, setUserInputLevel3Status] = useState();

  const [userInputLevel4Status, setUserInputLevel4Status] = useState();

  const [userInputAction11Status, setUserInputAction11Status] = useState();

  const [userInputAction12Status, setUserInputAction12Status] = useState();

  const [userInputAction21Status, setUserInputAction21Status] = useState();

  const [userInputAction22Status, setUserInputAction22Status] = useState();

  const [userInputAction31Status, setUserInputAction31Status] = useState();

  const [userInputAction32Status, setUserInputAction32Status] = useState();


  const [userInputAction41Status, setUserInputAction41Status] = useState();

  const [userInputAction42Status, setUserInputAction42Status] = useState();

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
          .get(`http://${ip}/xml/get_live_status.xml?userinput_status`)
          .then(function (response) {
            //   console.log("response: ", response); // this will print xml data structure

            const data = convert.xml2js(response.data, {
              compact: true,
              spaces: 2,
            });
            console.log("data:", data);

            /// table input

            setError(false);

            setMode(data.data.newval[0]._text);
            setUserInputType1Status(data.data.newval[1]._text);
            setUserInputType2Status(data.data.newval[2]._text);
            setUserInputType3Status(data.data.newval[3]._text);
            setUserInputType4Status(data.data.newval[4]._text);
            setUserInputLevel1Status(data.data.newval[5]._text);
            setUserInputLevel2Status(data.data.newval[6]._text);
            setUserInputLevel3Status(data.data.newval[7]._text);
            setUserInputLevel4Status(data.data.newval[8]._text);
            setUserInputAction11Status(data.data.newval[9]._text);
            setUserInputAction12Status(data.data.newval[10]._text);
            setUserInputAction21Status(data.data.newval[11]._text);
            setUserInputAction22Status(data.data.newval[12]._text);
            setUserInputAction31Status(data.data.newval[13]._text);
            setUserInputAction32Status(data.data.newval[14]._text);
            setUserInputAction41Status(data.data.newval[15]._text);
            setUserInputAction42Status(data.data.newval[16]._text);

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
            <h1 className="rainbow-text"> UPS {ip} - User Input Status </h1>{" "}
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
                        <StyledTableCell>User Input Statuss</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {mode ||
                    userInputType1Status ||
                    userInputType2Status ||
                    userInputType3Status ||
                    userInputType4Status ||
                    userInputLevel1Status ||
                    userInputLevel2Status ||
                    userInputLevel3Status ||
                    userInputLevel4Status ||
                    userInputAction11Status ||
                    userInputAction12Status ||
                    userInputAction21Status ||
                    userInputAction22Status ||
                    userInputAction31Status ||
                    userInputAction41Status ||
                    userInputAction42Status ? (
                      <>
                        {" "}
                        <TableBody>
                          <StyledTableRow>
                            <>
                              <StyledTableCell
                                component="th"
                                scope="row"
                              ></StyledTableCell>
                              <StyledTableCell>Input 1</StyledTableCell>

                              <StyledTableCell>Input 1</StyledTableCell>

                              <StyledTableCell>Input 3</StyledTableCell>

                              <StyledTableCell>Input 4</StyledTableCell>
                            </>
                          </StyledTableRow>

                          <StyledTableRow>
                            {userInputType1Status &&
                              userInputType2Status &&
                              userInputType3Status &&
                              userInputType4Status && (
                                <>
                                  <StyledTableCell component="th" scope="row">
                                    Type
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputType1Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputType2Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputType3Status}
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputType4Status}
                                  </StyledTableCell>
                                </>
                              )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {userInputLevel1Status &&
                              userInputLevel2Status &&
                              userInputLevel3Status &&
                              userInputLevel4Status && (
                                <>
                                  <StyledTableCell component="th" scope="row">
                                    Level
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputLevel1Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputLevel2Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputLevel3Status}
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputLevel4Status}
                                  </StyledTableCell>
                                </>
                              )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {userInputAction11Status &&
                              userInputAction12Status &&
                              userInputAction21Status &&
                              userInputAction22Status && (
                                <>
                                  <StyledTableCell component="th" scope="row">
                                    Action #1
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputAction11Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputAction21Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputAction31Status}
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputAction42Status}
                                  </StyledTableCell>
                                </>
                              )}
                          </StyledTableRow>

                          <StyledTableRow>
                            {userInputAction31Status &&
                              userInputAction41Status &&
                              userInputAction42Status &&
                              userInputType4Status && (
                                <>
                                  <StyledTableCell component="th" scope="row">
                                    Action #2
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputAction12Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputAction22Status}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {userInputAction32Status}
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {userInputAction42Status}
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
              </>
            )}
            <Typography component="div"></Typography>
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
