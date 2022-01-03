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
  table: {
    minWidth: 650,
  },
  title:{
    marginBottom: "2vw",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "700"
  }
});

export default function BasicTable(props) {
  const classes = useStyles();
  const rows = props.data;
  return (
    <Container>
      <Typography className={classes.title}>Top making deposit transactions wallet</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Wallet Address</TableCell>
              <TableCell align="center">Number Of Transactions</TableCell>
              <TableCell align="center">Total value lock (USD)</TableCell>
              <TableCell align="center">Deposit Amount (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.wallet}>
                <TableCell>{formatAddress(row.wallet)}</TableCell>
                <TableCell align="center">{row.number_of_deposits}</TableCell>
                <TableCell align="center">
                  {numberWithCommas(row.amount_of_deposits, 2)}
                </TableCell>
                <TableCell align="center">
                  {numberWithCommas(row.tvl, 2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
