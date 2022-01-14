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
import { Container, TablePagination, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    marginBottom: "2vw",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "700",
  },
});

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

export default function BasicTable(props) {
  const classes = useStyles();
  const lending = useSelector((state) => state.layout.lendingpool);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [scan, setScan] = React.useState("bscscan");
  const handleScan = () => {
    if (lending === "ftm" || lending === "geist_ftm") {
      setScan("ftmscan");
    }
    if (lending === "bsc") {
      setScan("bscscan");
    }
  };
  const rows = props.data;

  React.useEffect(() => {
    handleScan();
  }, [lending]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Container>
      <Typography className={classes.title}>
        Top making deposit transactions wallets
      </Typography>
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
            {stableSort(rows)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  // {rows.map((row) => (
                  <TableRow key={row.wallet}>
                    <TableCell>
                      <a
                        href={"https://" + scan + ".com/address/" + row.wallet}
                      >
                        {formatAddress(row.wallet)}
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      {row.number_of_deposits}
                    </TableCell>
                    <TableCell align="center">
                      {numberWithCommas(row.amount_of_deposits, 2)}
                    </TableCell>
                    <TableCell align="center">
                      {numberWithCommas(row.tvl, 2)}
                    </TableCell>
                  </TableRow>
                  // ))}
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
