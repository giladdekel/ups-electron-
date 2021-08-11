import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, listAddresss } from "./../../actions/addressActions";
import { USER_DETAILS_RESET } from "./../../constants/addressConstants";
import { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import "./AddressListScreen.scss";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import  IconButton from '@material-ui/core/IconButton';
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

export default function AddressListScreen(props) {
  const addressList = useSelector((state) => state.addressList);
  const { loading, error, addresss } = addressList;
  // console.log("addresss:", addresss);

  const addressDelete = useSelector((state) => state.addressDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = addressDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAddresss());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (address) => {
    console.log("address:", address);
    if (window.confirm("Are you sure?")) {
      dispatch(deleteAddress(address._id));
    }
  };



  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {loadingDelete && <CircularProgress />}
      {errorDelete && <Alert severity="error">{errorDelete}</Alert>}
      {successDelete && (
        <Alert severity="success">Address Deleted Successfully</Alert>
      )}

      <Container maxWidth="md">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            {" "}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Ip</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Edit</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresss &&
                    addresss.map((address) => (
                      <StyledTableRow key={address.name}>
                        <StyledTableCell component="th" scope="row">
                          {address.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {address.ip}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {address.createdAt.substring(0, 10)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton color="primary" aria-label="delete">
                            <EditIcon
                              className="pointer"
                              onClick={() => {
                                props.history.push(`/address/${address._id}/edit`);
                              }}
                            />{" "}
                          </IconButton>
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <IconButton color="secondary" aria-label="delete">
                            <DeleteIcon
                              className="pointer"
                              onClick={() => deleteHandler(address)}
                            />{" "}
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
