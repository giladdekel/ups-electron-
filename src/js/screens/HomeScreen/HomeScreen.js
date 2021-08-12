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
import axios from "Axios";

import convert from "xml-js";
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

export default function Home() {
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

  const addresses = [{ ip: "192.168.0.90" }, { ip: "192.168.0.92" }];
  // setInterval(() => {
  //   if (addresses) {
  //     addresses.forEach((address) => {
  //       axios
  //         .get(`http://${address.ip}/xml/get_live_status.xml?io_status`)
  //         .then(function (response) {
  //           console.log("addressIP: ", address.ip);
  //           console.log("responsee: ", response); // this will print xml data structure

  //           const data = convert.xml2js(response.data, {
  //             compact: true,
  //             spaces: 2,
  //           });

  //           console.log("dataaaa:", data);
  //         })
  //         .catch(function (error) {
  //           console.log("eroorrrr: ", error);
  //         })
  //         .then(function () {
  //           // always executed
  //         });
  //     });
  //   }
  // }, 10000);

  // function createData(name, data) {
  //   return { name, data };
  // }

  // const rows = [
  //   createData("Frozen yoghurt", 159),

  // ];

  const ip = "192.168.0.90";

  useEffect(() => {
    if (!socket) {
      // console.log("useEffect in Room Screen :");

      const sk = socketIOClient(ENDPOINT);

      setSocket(sk);

      sk.emit("home");
      console.log("home");
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
        <h1>Home</h1>
      </div>
    </>
  );
}
