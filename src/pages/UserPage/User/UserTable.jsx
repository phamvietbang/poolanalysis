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

const useStyles = makeStyles({
  // root: {
  //   height: "35vw"
  // },
  title: {
    marginTop: "2vw",
    marginBottom: "3vw",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "700",
  },
  table: {
    minWidth: 650,
  },
});

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

export default function BasicTable(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState([]);
  const rows = props.data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Container className={classes.root}>
      <Typography className={classes.title}>
        Deposit and borrow amount of tokens in wallet
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead
            classes={classes}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          >
            <TableRow>
              <TableCell>Token Name</TableCell>
              <TableCell align="center">Token Hash</TableCell>
              <TableCell align="center">Deposit (USD)</TableCell>
              <TableCell align="center">Borrow (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                // {rows.map((row) => (
                return (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
