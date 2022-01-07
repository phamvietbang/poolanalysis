import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import {
  Button,
  Modal,
  makeStyles,
  Backdrop,
  Fade,
  MenuItem,
  ButtonGroup,
  Grid,
  Select,
  Container,
  CircularProgress,
  Typography,
  TextField
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import BasicTable from "./UserTable";
import StatusCard from "./../../../components/status-card/StatusCard";
import {
  seriesUsers,
  countUsersData,
  topDepositsAmount,
  topDepositsTransact,
  clusteringUsersData,
} from "../../../redux_components/slices/allUsersSlice";
import { totalValueData } from "../../../redux_components/slices/lendingPoolSlice";
import { useState } from "react";
import { fixedLargeNumber, numberWithCommas } from "../../../utils/utility";
import Advice from "./Advice";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
  selectControl: {
    width: 150,
    height: 37,
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
  },
  loading: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  adviceTitle: {
    marginTop: "13px"
  },
  adviceContent: {

  },
  adviceButton:{
    marginTop: "20px",
    marginBottom: "10px"
  }
}));

function findMinRoundNumber(number) {
  let string_number = Math.floor(number) + "";
  let decimal = string_number.length - 1;
  let tmp = Math.pow(10, decimal);
  return tmp * Math.floor(number / tmp);
}

function findMaxRoundNumber(number) {
  let string_number = Math.floor(number) + "";
  let decimal = string_number.length - 3;
  let tmp = Math.pow(10, decimal);
  return tmp * (Math.floor(number / tmp) + 1);
}

function createData(wallet, number_of_deposits, amount_of_deposits, tvl) {
  return { wallet, number_of_deposits, amount_of_deposits, tvl };
}

function averageAmount(a, b, c, d, e, f) {
  return Math.floor((500 * a + 1000 * b + 5000 * c + 10000 * d + 15000 * e + 20000 * f) / (a + b + c + d + e + f))
}
const AllUsers = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [top, setTop] = React.useState(5);
  // initial variant for advice
  const [deA, setDeA] = React.useState(0)
  const [deB, setDeB] = React.useState(0)
  const [deC, setDeC] = React.useState(0)
  const [deD, setDeD] = React.useState(0)
  const [deE, setDeE] = React.useState(0)
  const [deF, setDeF] = React.useState(0)

  const [tvlA, setTvlA] = React.useState(0)
  const [tvlB, setTvlB] = React.useState(0)
  const [tvlC, setTvlC] = React.useState(0)
  const [tvlD, setTvlD] = React.useState(0)
  const [tvlE, setTvlE] = React.useState(0)
  const [tvlF, setTvlF] = React.useState(0)

  const [value, setValue] = React.useState({
    'deposit': 0,
    'tvl': 0
  })

  const [openChartOne, setOpenChartOne] = React.useState(false);
  const [openChartTwo, setOpenChartTwo] = React.useState(false);
  const [openChartThree, setOpenChartThree] = React.useState(false);
  const [openAdvice, setOpenAdvice] = React.useState(false);
  const [selectedType, setSelectedType] = useState(1);
  const [loadingAll, setLoadingAll] = useState(false);
  const [chartOptionsOne, setChartOptionsOne] = useState({
    series: [],
    options: { xaxis: { type: "numeric" } },
  });
  const [chartOptionsTwo, setChartOptionsTwo] = useState({
    series: [],
    options: {},
  });
  const [chartOptionsThree, setChartOptionsThree] = useState({
    series: [],
    options: {},
  });
  const [selectedBtn, setSelectedBtn] = useState(3);
  const users = useSelector((state) => state.allusers.users);
  const countUsers = useSelector((state) => state.allusers.countUsers);
  const topA = useSelector((state) => state.allusers.topDepositsA);
  const topT = useSelector((state) => state.allusers.topDepositsT);
  const tvlDeposit = useSelector((state) => state.allusers.clusteringUsers);

  const handleCalculate = () => {
    let amountDp = averageAmount(parseInt(deA), parseInt(deB), parseInt(deC), parseInt(deD), parseInt(deE), parseInt(deF))
    let amountTvl = averageAmount(parseInt(tvlA), parseInt(tvlB), parseInt(tvlC), parseInt(tvlD), parseInt(tvlE), parseInt(tvlF))
    let calculate = {
      'deposit': amountDp,
      'tvl': amountTvl,
    }
    setValue(calculate)
  }

  function handleSetDefaultValue() {
    if (!loadingAll) {
      return;
    }
    setDeA(tvlDeposit.deposit[0])
    setDeB(tvlDeposit.deposit[1])
    setDeC(tvlDeposit.deposit[2])
    setDeD(tvlDeposit.deposit[3])
    setDeE(tvlDeposit.deposit[4])
    setDeF(tvlDeposit.deposit[5])

    setTvlA(tvlDeposit.tvl[0])
    setTvlB(tvlDeposit.tvl[1])
    setTvlC(tvlDeposit.tvl[2])
    setTvlD(tvlDeposit.tvl[3])
    setTvlE(tvlDeposit.tvl[4])
    setTvlF(tvlDeposit.tvl[5])

    let amountDp = averageAmount(tvlDeposit.deposit[0], tvlDeposit.deposit[1], tvlDeposit.deposit[2], tvlDeposit.deposit[3], tvlDeposit.deposit[4], tvlDeposit.deposit[5])
    let amountTvl = averageAmount(tvlDeposit.tvl[0], tvlDeposit.tvl[1], tvlDeposit.tvl[2], tvlDeposit.tvl[3], tvlDeposit.tvl[4], tvlDeposit.tvl[5])
    let calculate = {
      'deposit': amountDp,
      'tvl': amountTvl,
    }
    setValue(calculate)
  }

  function handleChangeChartOptionsTwo() {
    if (!loadingAll) {
      return;
    }
    let wallets = [];
    for (var i in topA.wallets) {
      let tmp = topA.wallets[i];
      wallets.push(tmp.slice(0, 3) + "..." + tmp.slice(-3));
    }
    let baroption = {
      options: {
        xaxis: {
          title: {
            text: "Wallet address",
          },
          categories: wallets,
        },
        yaxis: {
          title: {
            text: "Amount (USD)",
          },
          labels: {
            formatter: function (val, index) {
              // return val.toFixed(0);
              return fixedLargeNumber(val, 1);
            },
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return numberWithCommas(val, 2) + " USD";
            },
          }
        },
        legend: {
          position: "bottom",
        },

        dataLabels: {
          enabled: false,
        },
        chart: {
          id: "basic-bar",
          background: "transparent",
          toolbar: {
            tools: {
              download: false,
              zoomout: false,
              zoomin: false,
            },
          },
        },
        title: {
          text: "Top wallets having the most amount of deposits",
          align: "center",
        },
      },
      series: [
        {
          name: "Amount",
          data: topA.totalAmountOfDepositInUSD,
        },
      ],
    };
    setChartOptionsTwo(baroption);
  }


  function handleChangeChartOptionsOne() {
    if (!loadingAll) {
      return;
    }

    let active = users.activeUsers;
    let jdeposit = users.justDeposits;
    let db = users.depositBorrows;
    let datetime = [];
    for (var i in users.timestamp) {
      datetime.push(users.timestamp[i] * 1000);
    }
    datetime = datetime.slice(0, active.length);
    switch (selectedBtn) {
      case 1:
        active = active.slice(-24);
        jdeposit = jdeposit.slice(-24);
        db = db.slice(-24);
        datetime = datetime.slice(-24);
        break;
      case 2:
        active = active.slice(-168);
        jdeposit = jdeposit.slice(-168);
        db = db.slice(-168);
        datetime = datetime.slice(-168);
        break;
      default:
        break;
    }
    let mindb = Math.min(...db)
    let minjd = Math.min(...jdeposit)
    let min_ = minjd < mindb ? minjd : mindb
    let op = {
      series: [
        {
          name: "Active users",
          data: active,
          type: "line",
        },
        {
          name: "Just deposit users",
          data: jdeposit,
          type: "line",
        },
        {
          name: "Deposit and borrow users",
          data: db,
          type: "line",
        },
      ],
      options: {
        title: {
          text: "Number of users change in a month",
          align: "center",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          categories: datetime,
          type: "datetime",
          title: {
            text: "Date time",
          },
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "HH:mm",
            },
          },
        },
        yaxis: [
          {
            // axisTicks: {
            //     show: true
            // },
            min: findMinRoundNumber(min_),
            max: findMaxRoundNumber(Math.max(...active)),
            title: {
              text: "Number of users",
            },
            labels: {
              formatter: function (val, index) {
                return parseInt(val);
                // return fixedLargeNumber(val, 1);
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val, index) {
              return parseInt(val) + " users";
            },
          }
        },
        chart: {
          background: "transparent",
          toolbar: {
            tools: {
              download: false,
              pan: false,
              zoomout: false,
              zoomin: false,
            },
          },
        },
        legend: {
          position: "top",
        },
        grid: {
          show: true,
        },
      },
    };

    setChartOptionsOne(op);
  }


  function handleChangeChartOptionThree() {
    if (!loadingAll) {
      return;
    }
    // console.log(tvlDeposit);
    let amount = tvlDeposit.amount;
    let count = [];
    let tit = "";
    let txt = "";
    switch (selectedType) {
      case 1:
        count = tvlDeposit.deposit;
        tit = "Number of users with amount of deposit";
        txt = "Amount of deposit (USD)";
        break;
      case 2:
        count = tvlDeposit.tvl;
        tit = "Number of users with amount of total value lock";
        txt = "Total value lock (USD)";
        break;
      default:
        break;
    }

    let op = {
      series: [
        {
          name: "number of users",
          data: count,
        },
      ],
      options: {
        tooltip: {
          x: {
            formatter: function (val) {
              return val + " USD";
            },
          },
          y: {
            formatter: function (val) {
              return val + " users";
            },
          }
        },
        title: {
          text: tit,
          align: "center",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          categories: amount,
          title: {
            text: txt,
          },
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            title: {
              text: "Number of users",
            },
          },
        ],
        plotOptions: {
          bar: {
            columnWidth: "100%",
          },
        },
        chart: {
          background: "transparent",
          toolbar: {
            tools: {
              download: false,
              pan: false,
              zoomout: false,
              zoomin: false,
            },
          },
        },
        legend: {
          position: "top",
        },
        grid: {
          show: true,
        },
      },
    };

    setChartOptionsThree(op);
  }
  const handleOpenChartTwo = () => {
    setOpenChartTwo(true);
  };
  const handleCloseChartTwo = () => {
    setOpenChartTwo(false);
  };
  const handleOpenChartOne = () => {
    setOpenChartOne(true);
  };
  const handleCloseChartOne = () => {
    setOpenChartOne(false);
  };
  const handleOpenChartThree = () => {
    setOpenChartThree(true);
  };
  const handleCloseChartThree = () => {
    setOpenChartThree(false);
  };
  const handleOpenAdvice = () => {
    setOpenAdvice(true);
  };
  const handleCloseAdvice = () => {
    setDeA(tvlDeposit.deposit[0])
    setDeB(tvlDeposit.deposit[1])
    setDeC(tvlDeposit.deposit[2])
    setDeD(tvlDeposit.deposit[3])
    setDeE(tvlDeposit.deposit[4])
    setDeF(tvlDeposit.deposit[5])

    setTvlA(tvlDeposit.tvl[0])
    setTvlB(tvlDeposit.tvl[1])
    setTvlC(tvlDeposit.tvl[2])
    setTvlD(tvlDeposit.tvl[3])
    setTvlE(tvlDeposit.tvl[4])
    setTvlF(tvlDeposit.tvl[5])
    let amountDp = averageAmount(tvlDeposit.deposit[0], tvlDeposit.deposit[1], tvlDeposit.deposit[2], tvlDeposit.deposit[3], tvlDeposit.deposit[4], tvlDeposit.deposit[5])
    let amountTvl = averageAmount(tvlDeposit.tvl[0], tvlDeposit.tvl[1], tvlDeposit.tvl[2], tvlDeposit.tvl[3], tvlDeposit.tvl[4], tvlDeposit.tvl[5])
    let calculate = {
      'deposit': amountDp,
      'tvl': amountTvl,
    }
    setValue(calculate)
    setOpenAdvice(false);
  };
  const handleChangeTop = (event) => {
    setTop(event.target.value);
  };
  async function fetchData() {
    setLoadingAll(false);
    await Promise.all([
      dispatch(totalValueData()),
      dispatch(topDepositsTransact(5)),
      dispatch(countUsersData()),
      dispatch(seriesUsers()),
      dispatch(topDepositsAmount(top)),
      dispatch(clusteringUsersData()),
    ]);
    setLoadingAll(true);
  }
  useEffect(() => {
    dispatch(topDepositsAmount(top));
  }, [top]);
  useEffect(() => {
    handleChangeChartOptionThree();
    handleSetDefaultValue()
  }, [loadingAll, selectedType, tvlDeposit]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleChangeChartOptionsOne();
  }, [users, loadingAll, selectedBtn]);
  useEffect(() => {
    handleChangeChartOptionsTwo();
  }, [topA, loadingAll]);

  if (!loadingAll) {
    return <div className={classes.loading}><CircularProgress disableShrink /></div>;
  }
  const type_amount = [
    {
      name: "total user",
      amount: countUsers.all_users,
      info: "The number of users interacted with trava pool",
    },
    {
      name: "Active Users",
      amount: countUsers.active_users,
      info: "Users have amount of deposit more than 10 USD",
    },
    {
      name: "Just Deposit Users",
      amount: countUsers.just_deposit_users,
      info: "Users have amount of deposit more than 10 USD and amount of borrow less than 10 USD",
    },
    {
      name: "Deposit-Borrow Users",
      amount: countUsers.deposit_borrow_users,
      info: "Users have both amount of deposit and amount of borrow more than 10 USD",
    },
    {
      name: "Lazy Users",
      amount: countUsers.lazy_users,
      info: "the  number of users have amount of deposit more than 10 USD but have not interacted with trava pool for 10 days ago",
    },
  ];
  const top_users_transacting = [];
  for (var i in topT.walletAddress) {
    top_users_transacting.push(
      createData(
        topT.walletAddress[i],
        topT.numberOfTx[i],
        topT.tvl[i],
        topT.depositsInUSD[i]
      )
    );
  }

  return (
    <Container fixed={true} maxWidth={"lg"}>
      <Grid
        style={{ marginTop: "5vw" }}
        container
        className="row_phu"
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        {type_amount.map((item, index) => (
          <Grid xs={2} key={index}>
            <StatusCard
              title={item.name}
              count={item.amount}
              info={item.info}
            />
          </Grid>
        ))}
      </Grid>
      <Grid className="row">
        <Grid className="col-6">
          <Grid className="card full-height">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
            // alignItems="baseline"
            >
              <Grid>
                <ButtonGroup aria-label="contained primary button group">
                  <Button
                    color={selectedBtn === 1 ? "secondary" : "primary"}
                    onClick={() => setSelectedBtn(1)}
                  >
                    24h
                  </Button>
                  <Button
                    color={selectedBtn === 2 ? "secondary" : "primary"}
                    onClick={() => setSelectedBtn(2)}
                  >
                    1W
                  </Button>
                  <Button
                    color={selectedBtn === 3 ? "secondary" : "primary"}
                    onClick={() => setSelectedBtn(3)}
                  >
                    1M
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid>
                <Button variant="outlined" onClick={handleOpenChartOne}>
                  Full
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openChartOne}
                  onClose={handleCloseChartOne}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openChartOne}>
                    <Grid
                      className="card"
                      container
                      xs={8}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid>
                        <ButtonGroup aria-label="contained primary button group">
                          <Button
                            color={selectedBtn === 1 ? "secondary" : "primary"}
                            onClick={() => setSelectedBtn(1)}
                          >
                            24h
                          </Button>
                          <Button
                            color={selectedBtn === 2 ? "secondary" : "primary"}
                            onClick={() => setSelectedBtn(2)}
                          >
                            1W
                          </Button>
                          <Button
                            color={selectedBtn === 3 ? "secondary" : "primary"}
                            onClick={() => setSelectedBtn(3)}
                          >
                            1M
                          </Button>
                        </ButtonGroup>
                      </Grid>
                      <Chart
                        options={{ ...chartOptionsOne }.options}
                        series={{ ...chartOptionsOne }.series}
                        height="500"
                        width={1000}
                      />
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
            {/* chart */}
            <Chart
              options={chartOptionsOne.options}
              series={chartOptionsOne.series}
              height="400"
            />
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card full-height">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
            // alignItems="baseline"
            >
              <Grid>
                <ButtonGroup aria-label="contained primary button group">
                  <Button
                    color={selectedType === 1 ? "secondary" : "primary"}
                    onClick={() => setSelectedType(1)}
                  >
                    Amount of deposit
                  </Button>
                  <Button
                    color={selectedType === 2 ? "secondary" : "primary"}
                    onClick={() => setSelectedType(2)}
                  >
                    Total value lock
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid>
                <Advice />
                {/* <Button variant="outlined" onClick={handleOpenAdvice}>
                  Advice
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openAdvice}
                  onClose={handleCloseAdvice}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openAdvice}>
                    <Grid
                      className="card"
                      container
                      xs={8}
                      direction="column"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                      >
                        <Grid
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <h3>Number of users having total value of deposit</h3>
                          <Typography className={classes.adviceTitle}>Less than 1000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={deA} onChange={(event) => setDeA(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 1000 to 5000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={deB} onChange={(event) => setDeB(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 5000 to 10000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={deC} onChange={(event) => setDeC(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 10000 to 15000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={deD} onChange={(event) => setDeD(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 15000 to 20000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={deE} onChange={(event) => setDeE(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>More than 20000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={deF} onChange={(event) => setDeF(event.target.value)} variant="outlined" />
                          <Grid>
                            <Button className={classes.adviceButton} variant="outlined" color="primary" onClick={handleCalculate}>
                              Calculate
                            </Button>
                          </Grid>
                          <Grid
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <h2>You should deposit more than {value['deposit']} USD</h2>
                          </Grid>
                        </Grid>
                        <Grid
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <h3>Number of users having total Value lock</h3>
                          <Typography className={classes.adviceTitle}>Less than 1000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={tvlA} onChange={(event) => setTvlA(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 1000 to 5000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={tvlB} onChange={(event) => setTvlB(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 5000 to 10000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={tvlC} onChange={(event) => setTvlC(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 10000 to 15000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={tvlD} onChange={(event) => setTvlD(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>From 15000 to 20000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={tvlE} onChange={(event) => setTvlE(event.target.value)} variant="outlined" />
                          <Typography className={classes.adviceTitle}>More than 20000 USD</Typography>
                          <TextField size='small' fullWidth id="outlined-basic" value={tvlF} onChange={(event) => setTvlF(event.target.value)} variant="outlined" />
                          <Grid>
                            <Button className={classes.adviceButton} variant="outlined" color="primary" onClick={handleCalculate}>
                              Calculate
                            </Button>
                          </Grid>
                          <Grid
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <h2>You should hold less than {value['tvl']} USD</h2>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Fade>
                </Modal> */}
              </Grid>
              <Grid>
                <Button variant="outlined" onClick={handleOpenChartThree}>
                  Full
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openChartThree}
                  onClose={handleCloseChartThree}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openChartThree}>
                    <Grid
                      className="card"
                      container
                      xs={8}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid>
                        <ButtonGroup aria-label="contained primary button group">
                          <Button
                            color={selectedType === 1 ? "secondary" : "primary"}
                            onClick={() => setSelectedType(1)}
                          >
                            Amount of deposit
                          </Button>
                          <Button
                            color={selectedType === 2 ? "secondary" : "primary"}
                            onClick={() => setSelectedType(2)}
                          >
                            Total value lock
                          </Button>
                        </ButtonGroup>
                      </Grid>
                      <Chart
                        options={{ ...chartOptionsThree }.options}
                        series={{ ...chartOptionsThree }.series}
                        type="bar"
                        height="500"
                        width={1000}
                      />
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
            {/* chart */}
            <Chart
              options={chartOptionsThree.options}
              series={chartOptionsThree.series}
              type="bar"
              height="400"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid className="row">
        <Grid className="col-6">
          <Grid className="card full-height">
            {/* chart */}
            <Chart
              options={chartOptionsTwo.options}
              series={chartOptionsTwo.series}
              type="bar"
              height="100%"
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Grid>
                <Button variant="outlined" onClick={handleOpenChartTwo}>
                  Full
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openChartTwo}
                  onClose={handleCloseChartTwo}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openChartTwo}>
                    <Grid
                      className="card"
                      container
                      xs={8}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Chart
                        options={{ ...chartOptionsTwo }.options}
                        series={{ ...chartOptionsTwo }.series}
                        type="bar"
                        height="500"
                        width={1000}
                      />
                      <Grid>
                        <Select
                          labelId="select-outlined-label"
                          id="select-outlined"
                          value={top}
                          onChange={handleChangeTop}
                          label="top"
                        >
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={15}>15</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
              <Grid>
                <Select
                  labelId="select-outlined-label"
                  id="select-outlined"
                  value={top}
                  onChange={handleChangeTop}
                  label="top"
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card full-height">
            <BasicTable data={top_users_transacting} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default AllUsers;
