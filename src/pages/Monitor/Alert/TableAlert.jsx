import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";

import Paper from "@material-ui/core/Paper";
import {
  convertTimestampToDate,
  formatAddress,
  numberWithCommas,
} from "../../../utils/utility";
import { Typography } from "@material-ui/core";

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "datetime", numeric: true, disablePadding: false, label: "Date time" },
  { id: "user", numeric: false, disablePadding: false, label: "User" },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount (USD)" },
  { id: "token", numeric: false, disablePadding: false, label: "Token" },
  {
    id: "transaction",
    numeric: false,
    disablePadding: false,
    label: "Transaction",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "3vw"
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: "10px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const rows = props.data;
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [scan, setScan] = React.useState('bscscan')
  const lending = useSelector((state) => state.layout.lendingpool)

  const handleScan = () => {
    if (lending === 'ftm'|| lending ==='geist_ftm') {
      setScan('ftmscan')
    }
    if (lending === 'bsc') {
      setScan('bscscan')
    }
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  function date(val) {
    const { year, month, date, hour, min, sec } = convertTimestampToDate(val);
    if (min < 10) {
      if (sec < 10) {
        return `${date} ${month} ${hour}:0${min}:0${sec}`;
      } else return `${date} ${month} ${hour}:0${min}:${sec}`;
    } else {
      if (sec < 10) {
        return `${date} ${month} ${hour}:${min}:0${sec}`;
      }
    }
    return `${date} ${month} ${hour}:${min}:${sec}`;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function transformType(type) {
    switch (type) {
      case 'DEPOSIT': return 'Deposit'
      case 'WITHDRAW': return 'Withdraw'
      case 'BORROW': return 'Borrow'
      case 'REPAY': return 'Repay'
      case 'RESERVEUSEDASCOLLATERALDISABLED': return 'Reserve used as collateral disabled'
      case 'RESERVEUSEDASCOLLATERALENABLED': return 'Reserve used as collateral enabled'
      default:
        return type
    }
  }
  React.useEffect(() => {
    handleScan()
  }, [lending])
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Events in the last 7 days</Typography>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.type);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.tx_hash}
                      selected={isItemSelected}
                      style={{
                        backgroundColor: row.amount > 10000 ? "#ed5050a8" : "",
                      }}
                    >
                      <TableCell align="left">{transformType(row.type)}</TableCell>
                      <TableCell align="center">
                        {date(row.datetime * 1000)}
                      </TableCell>
                      <TableCell align="center">
                        <a href={'https://' + scan + '.com/address/' + row.user}>
                          {formatAddress(row.user)}
                        </a>
                      </TableCell>
                      <TableCell align="center">
                        {numberWithCommas(row.amount, 2)}
                      </TableCell>
                      <TableCell align="center">{row.token}</TableCell>
                      <TableCell align="center">
                        <a href={'https://' + scan + '.com/tx/' + row.transaction}>
                          {formatAddress(row.transaction)}
                        </a>
                      </TableCell>
                    </TableRow>
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
      </Paper>
    </div>
  );
}
