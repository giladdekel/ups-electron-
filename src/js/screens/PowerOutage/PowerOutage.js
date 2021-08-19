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

// import IconButton from '@material-ui/core/IconButton';

// import Button from "@material-ui/core/Button";

// import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

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

export default function PowerOutage(props) {
  const [startTime, setStartTime] = useState([]);

  const [endTime, setEndTime] = useState([]);

  const [duration, setDuration] = useState([]);

  const [batteryUse, setBatteryUse] = useState([]);

  const [dataRows, setDataRows] = useState([]);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);

  const [value, setValue] = React.useState(6);

  const ip = props.match.params.id;

  const upsName = props.match.params.name;
  // console.log("ip:", ip);
  // const ip = "192.168.0.90";

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(`hhhhhhttp://${ip}/xml/get_live_status.xml?io_status`, ip);

      try {
        axios
          .get(`http://${ip}/xml/get_power_outage_status.xml`)
          .then(function (response) {
            //   console.log("response: ", response); // this will print xml data structure

            const data = convert.xml2js(response.data, {
              compact: true,
              spaces: 2,
            });

            // console.log("data:", data.data.form.table.row);

            let rows = data.data.form.table.row;

            setDataRows(rows);

            // rows.map((row) => {
            //   console.log(row.field);
            //   console.log(
            //     (row.field[0].countdown &&
            //       row.field[0].countdown._attributes.value) ||
            //       (row.field[0]._text && row.field[0]._text)
            //   );

            //   console.log(
            //     (row.field[1].countdown &&
            //       row.field[1].countdown._attributes.value) ||
            //       (row.field[1]._text && row.field[1]._text)
            //   );
            //   console.log(
            //     (row.field[2].countdown &&
            //       row.field[2].countdown._attributes.value) ||
            //       (row.field[2]._text && row.field[2]._text)
            //   );

            //   console.log(
            //     (row.field[3].countdown &&
            //       row.field[3].countdown._attributes.value) ||
            //       (row.field[3]._text && row.field[3]._text)
            //   );
            // });

            // console.log("data:", data.data.form.table.row[0].field[0]._text);
            // console.log("data:", data.data.form.table.row[0].field[1]._text);
            // console.log(
            //   "data:",
            //   data.data.form.table.row[0].field[2].countdown._attributes.value
            // );
            // console.log(
            //   "data:",
            //   data.data.form.table.row[0].field[3].countdown._attributes.value
            // );

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
            <h1 className="rainbow-text"> Power Outage - {upsName} </h1>{" "}
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
                        <StyledTableCell>Power Outage History</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {dataRows.length > 0 ? (
                      <>
                        {" "}
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell>Start Time </StyledTableCell>
                            <StyledTableCell>End Time </StyledTableCell>
                            <StyledTableCell>Duration</StyledTableCell>
                            <StyledTableCell>Battery Use</StyledTableCell>
                          </StyledTableRow>

                          {/* data: 
(5) [{…}, {…}, {…}, {…}, {…}]

0: {field: Array(4)}
1: {field: Array(4)}
2: {field: Array(4)}
3: {field: Array(4)}
4: {field: Array(4)} */}
                          {/* {dataRows.map(dataRow=>  )} */}

                          {dataRows.map(
                            (row) => (
                              <StyledTableRow>
                                <StyledTableCell>
                                  {(row.field[0]._text && row.field[0]._text) ||
                                    (row.field[0].countdown &&
                                      row.field[0].countdown._attributes.value)}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {(row.field[1]._text && row.field[1]._text) ||
                                    (row.field[1].countdown &&
                                      row.field[1].countdown._attributes.value)}
                                </StyledTableCell>

                                <StyledTableCell>
                                  {Math.floor(
                                    (Number(
                                      row.field[2].countdown &&
                                        row.field[2].countdown._attributes.value
                                    ) || 0) / 3600
                                  )}
                                  hr{" "}
                                  {Math.floor(
                                    ((Number(
                                      row.field[2].countdown &&
                                        row.field[2].countdown._attributes.value
                                    ) || 0) %
                                      3600) /
                                      60
                                  )}
                                  min{" "}
                                  {Math.floor(
                                    ((Number(
                                      row.field[2].countdown &&
                                        row.field[2].countdown._attributes.value
                                    ) || 0) %
                                      3600) %
                                      60
                                  )}
                                  sec
                                </StyledTableCell>

                                <StyledTableCell>
                                  {Math.floor(
                                    (Number(
                                      row.field[3].countdown &&
                                        row.field[3].countdown._attributes.value
                                    ) || 0) / 3600
                                  )}
                                  hr{" "}
                                  {Math.floor(
                                    ((Number(
                                      row.field[3].countdown &&
                                        row.field[3].countdown._attributes.value
                                    ) || 0) %
                                      3600) /
                                      60
                                  )}
                                  min{" "}
                                  {Math.floor(
                                    ((Number(
                                      row.field[3].countdown &&
                                        row.field[3].countdown._attributes.value
                                    ) || 0) %
                                      3600) %
                                      60
                                  )}
                                  sec
                                </StyledTableCell>
                              </StyledTableRow>
                            )

                            // console.log(
                            //   (row.field[1].countdown &&
                            //     row.field[1].countdown._attributes.value) ||
                            //     (row.field[1]._text && row.field[1]._text)
                            // );
                            // console.log(
                            //   (row.field[2].countdown &&
                            //     row.field[2].countdown._attributes.value) ||
                            //     (row.field[2]._text && row.field[2]._text)
                            // );

                            // console.log(
                            //   (row.field[3].countdown &&
                            //     row.field[3].countdown._attributes.value) ||
                            //     (row.field[3]._text && row.field[3]._text)
                            // );
                          )}
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
