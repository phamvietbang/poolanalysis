import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { formatAddress, numberWithCommas } from "../../../utils/utility";
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  // root: {
  //   height: "35vw"
  // },
  title: {
    marginBottom: "3vw",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "700",
  },
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props) {
  const classes = useStyles();
  const rows = props.data;
  return (
    <Container className={classes.root}> 
      <Typography className={classes.title}>Deposit and borrow amount of tokens in wallet</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Token Name</TableCell>
              <TableCell align="center">Token Hash</TableCell>
              <TableCell align="center">Deposit (USD)</TableCell>
              <TableCell align="center">Borrow (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.wallet}>
                <TableCell>{row.token}</TableCell>
                <TableCell align="center">
                  {formatAddress(row.token_address)}
                </TableCell>
                <TableCell align="center">
                  {numberWithCommas(row.deposit, 2)}
                </TableCell>
                <TableCell align="center">
                  {numberWithCommas(row.borrow, 2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
