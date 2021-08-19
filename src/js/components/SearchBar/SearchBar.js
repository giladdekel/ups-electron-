/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./SearchBar.scss";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { listAddresses } from "../../actions/addressActions";
import {
  ADDRESS_DETAILS_RESET,
  ADDRESS_NAME_RESET,
} from "../../constants/addressConstants";
import { useDispatch, useSelector } from "react-redux";
import { nameAddress } from "./../../actions/addressActions";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function SearchBar(props) {
  console.log("props:", props);

  const addressList = useSelector((state) => state.addressList);
  const { loading, error, addresses } = addressList;

  // console.log("addresses:SearchBar", addresses);

  const [name, setName] = useState();

  const [errorName, setErrorName] = useState(false);
  const addressDelete = useSelector((state) => state.addressDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = addressDelete;

  const addressName = useSelector((state) => state.addressName);
  const {
    loading: loadingAddressName,
    error: errorAddressName,
    address,
  } = addressName;
  console.log("address:", address);

  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      props.history.push(`/address/info/${address.ip}/${address.name}`);
    }

    if (errorAddressName) {
      setErrorName(true);

      setTimeout(() => {
        setErrorName(false);
      }, 3000);

      dispatch({
        type: ADDRESS_NAME_RESET,
      });
    }

    dispatch(listAddresses());
    dispatch({
      type: ADDRESS_DETAILS_RESET,
    });
  }, [dispatch, successDelete, props.history, address, errorAddressName]);

  function handleSearchClick() {
    dispatch(nameAddress(name));
    console.log("name:", name);

    // props.history.push(`/address/info/${name}`);
  }

  return (
    <div style={{ width: 300 }}>
      {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
        )}
      /> */}

      <Autocomplete

      // className="search-bar"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={addresses && addresses.map((option) => option.name)}
        value={name}
        onSelect={(e) => setName(e.target.value)}
        renderInput={(params) => (
          <TextField
          className="search-bar"

            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            value={name}
            InputProps={{ ...params.InputProps, type: "search" }}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      />
      <IconButton
        onClick={handleSearchClick}
        color="primary"
        aria-label="add to shopping cart"
      >
        <SearchIcon />
      </IconButton>

      {/* {loadingAddressName && <CircularProgress />} */}
      {errorName && <Alert className="alert-search" severity="error">{name} is not found</Alert>}
    </div>
  );
}
// `/address/info/${name}`
