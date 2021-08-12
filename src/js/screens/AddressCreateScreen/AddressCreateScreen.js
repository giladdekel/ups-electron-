import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@material-ui/core/Link";

// import "./AddressCreateScreen.scss";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { create } from "../../actions/addressActions";

import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { ADDRESS_CREATE_RESET } from "../../constants/addressConstants";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Gilad Dekel
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddressCreateScreen(props) {
  const classes = useStyles();
  // console.log("props :", props);


  const [ip, setIp] = useState("");

  const [name, setName] = useState("")
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(create(name, ip));
  };

  // const responseFacebook = (response) => {
  //   // console.log("response :", response);
  //   // console.log("response :", response.accessToken);
  //   dispatch(findFacebookByIp(response));
  // };

  // const responseGoogle = (response) => {
  //   // console.log("response :", response);
  //   // console.log("response :", response.tokenId);

  //   dispatch(findByIp(response));
  // };


  const addressCreate = useSelector((state) => state.addressCreate);
  const {   
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate
   } = addressCreate;




  useEffect(() => {
    if (successCreate) {
      // props.history.push(redirect);

      props.history.push("/address/list");
      dispatch({ type: ADDRESS_CREATE_RESET });

    }
  }, [props.history,successCreate]);

  // const responseGoogle = (response) => {
  //   // console.log("response :", response);
  //   // console.log("response :", response.tokenId);

  //   dispatch(findByIp(response));
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon  />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new address
        </Typography>
        <form className={classes.form} noValidate>



        <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />


          <TextField
            onChange={(e) => setIp(e.target.value)}
            value={ip}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ip"
            label="Ip Address"
            name="ip"
            autoComplete="ip"
            autoFocus
          />
         
       
          <Button
            onClick={submitHandler}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
     
          {loadingCreate && <CircularProgress />}
          {errorCreate && <Alert severity="errorCreate">{errorCreate}</Alert>}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
