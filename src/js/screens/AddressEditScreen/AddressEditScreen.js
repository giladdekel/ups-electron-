import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { detailsAddress, updateAddress } from "./../../actions/addressActions";

import { ADDRESS_UPDATE_RESET } from "./../../constants/addressConstants";

import { CircularProgress, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
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

export default function AddressEditScreen(props) {
  console.log('props:', props)
  const classes = useStyles();
  const addressId = props.match.params.id;
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");



  const addressDetails = useSelector((state) => state.addressDetails);
  const { loading, error, address } = addressDetails;

  const addressUpdate = useSelector((state) => state.addressUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = addressUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADDRESS_UPDATE_RESET });
      props.history.push("/address/list");
    }
    if (!address) {
      dispatch(detailsAddress(addressId));
    } else {
      setName(address.name);
      setIp(address.ip);
    
    }
  }, [dispatch, props.history, successUpdate, address, addressId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update address
    dispatch(updateAddress({ _id: addressId, name, ip }));

  };
  return (
    <div>
      <form className="form">
        <div></div>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit Address: {name}
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
                    type="text"
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
                    type="ip"
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
                    Update
                  </Button>
                  {loadingUpdate && <CircularProgress />}
                  {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
                  <Grid container></Grid>
                  {/* {loading && <CircularProgress />}
                  {error && <Alert severity="error">{error}</Alert>} */}
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </>
        )}
      </form>
    </div>
  );
}
