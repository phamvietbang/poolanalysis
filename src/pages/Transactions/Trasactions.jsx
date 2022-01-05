import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  Button,
  ButtonGroup,
  makeStyles,
  Backdrop,
  Grid,
  Modal,
  Fade,
  Container,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import ZoomChart from "../../components/charts/ZoomChart";
import {
  totalValueData,
  depositBorrowData,
  tvlSupplyTokensData,
} from "../../redux_components/slices/lendingPoolSlice";
import {
  totalValueTokenData,
  depositBorrowTokenData,
  interestRateTokenData,
} from "../../redux_components/slices/tokenSlice";
import { setNumberUserOptions, setUpOptions } from "../../components/charts/Options";
import { numberWithCommas } from "../../utils/utility";
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
  loading:{
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

// const chartOptions = setUpOptions(op)
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
const Transactions = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openChartOne, setOpenChartOne] = React.useState(false);
  const [openChartTwo, setOpenChartTwo] = React.useState(false);
  const [loadingLp, setLoadingLp] = useState(false);
  const [loadingDBLp, setLoadingDBLp] = useState(false);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [loadingT, setLoadingT] = useState(false);
  const [loadingTokenRate, setLoadingTokenRate] = useState(false);
  const [loadingDBT, setLoadingDBT] = useState(false);
  const [selectedBtn, setSelectedBtn] = React.useState(3);
  const [tokenName, setTokenName] = useState("ALL");
  const [openChartThree, setOpenChartThree] = React.useState(false);
  const [openChartFour, setOpenChartFour] = React.useState(false);
  const [chartOptionsOne, setChartOptionsOne] = React.useState({});
  const [chartOptionsTwo, setChartOptionsTwo] = React.useState({});
  const [chartOptionsTwoZoom, setChartOptionsTwoZoom] = React.useState({});
  const [chartOptionsThree, setChartOptionsThree] = React.useState({});
  const [chartOptionsFour, setChartOptionsFour] = React.useState({});
  const totalValue = useSelector((state) => state.lendingpool.totalValue);
  const tokens = useSelector((state) => state.lendingpool.tokenName);
  const totalValueToken = useSelector((state) => state.token.totalValue);
  const address = useSelector((state) => state.lendingpool.tokenAddress);
  const depositBorrowPool = useSelector(
    (state) => state.lendingpool.depositBorrow
  );
  const depositBorrowToken = useSelector((state) => state.token.depositBorrow);
  const interestRateToken = useSelector((state) => state.token.interestRate);
  function makechartOptionsOne() {
    if (!loadingLp) {
      return;
    }
    let tvl_supply = totalValue;
    if (tokenName != "ALL" && loadingT) {
      tvl_supply = totalValueToken;
    }
    let datetime = [];
    for (var i in tvl_supply.timestamp) {
      datetime.push(tvl_supply.timestamp[i] * 1000);
    }
    let borrow = tvl_supply.borrow;
    let supply = tvl_supply.supply;
    let min_y_left = findMinRoundNumber(Math.min(...borrow));
    let min_y_right = findMinRoundNumber(Math.min(...supply));
    let max_y_left = findMaxRoundNumber(Math.max(...borrow));
    let max_y_right = findMaxRoundNumber(Math.max(...supply));

    setChartOptionsOne({
      type: "line",
      name_one: "Total borrow",
      name_two: "Total supply",
      data_one: borrow,
      data_two: supply,
      datetime: datetime,
      title: "Total borrow and supply",
      title_one: "Total borrow (USD)",
      title_two: "Total supply (USD)",
      min_y_left: min_y_left,
      max_y_left: max_y_left,
      min_y_right: min_y_right,
      max_y_right: max_y_right,
    });
  }
  function makechartOptionsThree() {
    if (!loadingDBLp) {
      return;
    }
    let deposits = depositBorrowPool;
    if (tokenName != "ALL" && loadingDBT) {
      deposits = depositBorrowToken;
    }
    // console.log("123",deposits)
    let datetime = [];
    for (var i in deposits.timestamp) {
      datetime.push(deposits.timestamp[i] * 1000);
    }
    let deposit_amount = deposits.deposit_amount;
    let deposit_tx = deposits.deposit_tx;
    let min_y_right = findMinRoundNumber(Math.min(...deposit_amount));
    let min_y_left = findMinRoundNumber(Math.min(...deposit_tx));
    let max_y_right = findMaxRoundNumber(Math.max(...deposit_amount));
    let max_y_left = findMaxRoundNumber(Math.max(...deposit_tx));

    setChartOptionsThree({
      type: "column",
      name_two: "Amount of deposits",
      name_one: "Number of deposit transactions",
      data_two: deposit_amount,
      data_one: deposit_tx,
      datetime: datetime,
      title: "Amount and Number Of Deposit Transactions",
      title_two: "Amount (USD)",
      title_one: "Number",
      min_y_left: min_y_left,
      max_y_left: max_y_left,
      min_y_right: min_y_right,
      max_y_right: max_y_right,
    });
  }
  function makechartOptionsFour() {
    if (!loadingDBLp) {
      return;
    }
    let borrows = depositBorrowPool;
    if (tokenName != "ALL" && loadingDBT) {
      borrows = depositBorrowToken;
    }
    let datetime = [];
    for (var i in borrows.timestamp) {
      datetime.push(borrows.timestamp[i] * 1000);
    }
    let borrow_amount = borrows.borrow_amount;
    let borrow_tx = borrows.borrow_tx;
    let min_y_right = findMinRoundNumber(Math.min(...borrow_amount));
    let min_y_left = findMinRoundNumber(Math.min(...borrow_tx));
    let max_y_right = findMaxRoundNumber(Math.max(...borrow_amount));
    let max_y_left = findMaxRoundNumber(Math.max(...borrow_tx));

    setChartOptionsFour({
      type: "column",
      name_two: "Amount of borrows",
      name_one: "Number of borrow transactions",
      data_two: borrow_amount,
      data_one: borrow_tx,
      datetime: datetime,
      title: "Amount and Number Of Borrow Transactions",
      title_two: "Amount (USD)",
      title_one: "Number",
      min_y_left: min_y_left,
      max_y_left: max_y_left,
      min_y_right: min_y_right,
      max_y_right: max_y_right,
    });
  }
  function makeChartOptionsTwo() {
    if (!loadingLp) {
      return;
    }
    let tvl_supply = totalValue;
    let datetime = [];
    for (var i in tvl_supply.timestamp) {
      datetime.push(tvl_supply.timestamp[i] * 1000);
    }
    let borrow = tvl_supply.borrow;
    let supply = tvl_supply.supply;
    let utilization = [];
    for (var i in borrow) {
      utilization.push(((100 * borrow[i]) / supply[i]).toFixed(2));
    }
    let uti_rate = utilization;
    let deposit_rate = null;
    let borrow_rate = null;
    let _series = [];
    if (loadingTokenRate && tokenName != "ALL") {
      deposit_rate = interestRateToken.deposit_rate;
      borrow_rate = interestRateToken.borrow_rate;
      uti_rate = interestRateToken.uti_rate;
    }

    _series = [
      {
        name: "Utilization rate",
        data: uti_rate,
      },
    ];
    if (borrow_rate && deposit_rate) {
      _series = [
        {
          name: "Utilization rate",
          data: uti_rate,
        },
        {
          name: "Deposit rate",
          data: deposit_rate,
        },
        {
          name: "Borrow rate",
          data: borrow_rate,
        },
      ];
    }

    let chartOptions = {
      series: _series,
      options: {
        title: {
          text: "Interest Rate",
          align: "center",
        },
        color: ["#6ab04c", "#2980b9"],
        chart: {
          background: "transparent",
        },
        dataLabels: {
          enabled: false,
        },
        chart: {
          toolbar: {
            tools: {
              download: false,
              pan: false,
              zoomout: false,
              zoomin: false,
            },
          },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          title: {
            text: "Date time",
          },
          categories: datetime,
          type: "datetime",
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },

            title: {
              text: "Percentage (%)",
            },
            labels: {
              formatter: function (val, index) {
                return val.toFixed(2);
              },
            },
          },
        ],
        tooltip: {
          x: {
            format: "dd MMM yyyy hh",
          },
          y: {
            formatter: function (val) {
              return numberWithCommas(val, 2) + "%";
            },
          }
        },
        legend: {
          showForSingleSeries: true,
          position: "top",
        },
        grid: {
          show: true,
        },
      },
    };
    setChartOptionsTwo(chartOptions);
    switch (selectedBtn) {
      case 1:
        datetime = datetime.slice(-24);
        uti_rate = uti_rate.slice(-24);
        if (deposit_rate && borrow_rate) {
          deposit_rate = deposit_rate.slice(-24);
          borrow_rate = borrow_rate.slice(-24);
        }
        break;
      case 2:
        datetime = datetime.slice(-168);
        uti_rate = uti_rate.slice(-168);
        if (deposit_rate && borrow_rate) {
          deposit_rate = deposit_rate.slice(-168);
          borrow_rate = borrow_rate.slice(-168);
        }

        break;
      default:
        break;
    }
    _series = [
      {
        name: "utilization rate",
        data: uti_rate,
      },
    ];
    if (borrow_rate && deposit_rate) {
      _series = [
        {
          name: "utilization rate",
          data: uti_rate,
        },
        {
          name: "deposit rate",
          data: deposit_rate,
        },
        {
          name: "borrow rate",
          data: borrow_rate,
        },
      ];
    }

    chartOptions = {
      series: _series,
      options: {
        title: {
          text: "Interest Rate",
          align: "center",
        },
        color: ["#6ab04c", "#2980b9"],
        chart: {
          background: "transparent",
        },
        dataLabels: {
          enabled: false,
        },
        chart: {
          toolbar: {
            tools: {
              download: false,
              pan: false,
              zoomout: false,
              zoomin: false,
            },
          },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          title: {
            text: "Date time",
          },
          categories: datetime,
          type: "datetime",
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },

            title: {
              text: "Percentage (%)",
            },
            labels: {
              formatter: function (val, index) {
                return val.toFixed(2);
              },
            },
          },
        ],
        tooltip: {
          x: {
            format: "dd MMM yyyy hh",
          },
        },
        legend: {
          showForSingleSeries: true,
          position: "top",
        },
        grid: {
          show: true,
        },
      },
    };
    setChartOptionsTwoZoom(chartOptions);
  }
  const dispatchValueTokens = () => {
    if (tokenName != "ALL") {
      for (var i in tokens) {
        if (tokenName == tokens[i]) {
          dispatch(totalValueTokenData(address[i])).then(() =>
            setLoadingT(true)
          );
          dispatch(depositBorrowTokenData(address[i])).then(() =>
            setLoadingDBT(true)
          );
          dispatch(interestRateTokenData(address[i])).then(() =>
            setLoadingTokenRate(true)
          );
          break;
        }
      }
    } else {
      dispatch(totalValueData()).then(() => setLoadingLp(true));
      dispatch(depositBorrowData()).then(() => setLoadingDBLp(true));
    }
  };

  const handleOpenChartOne = () => {
    setOpenChartOne(true);
  };

  const handleCloseChartOne = () => {
    setOpenChartOne(false);
  };
  const handleOpenChartTwo = () => {
    setOpenChartTwo(true);
  };

  const handleCloseChartTwo = () => {
    setOpenChartTwo(false);
  };
  const handleOpenChartThree = () => {
    setOpenChartThree(true);
  };

  const handleCloseChartThree = () => {
    setOpenChartThree(false);
  };
  const handleOpenChartFour = () => {
    setOpenChartFour(true);
  };

  const handleCloseChartFour = () => {
    setOpenChartFour(false);
  };
  useEffect(() => {
    makechartOptionsOne();
  }, [tokenName, totalValue, totalValueToken, loadingT, loadingLp]);
  useEffect(() => {
    makeChartOptionsTwo();
  }, [
    totalValue,
    tokenName,
    loadingLp,
    interestRateToken,
    loadingTokenRate,
    selectedBtn,
  ]);
  useEffect(() => {
    makechartOptionsThree();
    makechartOptionsFour();
  }, [depositBorrowPool, depositBorrowToken, loadingDBLp, loadingDBT]);
  useEffect(() => {
    dispatchValueTokens();
  }, [tokenName, address, tokens]);
  useEffect(() => {
    dispatch(tvlSupplyTokensData()).then(() => setLoadingTokens(true));
  }, []);
  if (!loadingLp || !loadingTokens || !loadingDBLp) {
    return <div className={classes.loading}><CircularProgress disableShrink /></div>;
  }
  const coin = [{ name: "ALL" }];
  for (var i in tokens) {
    coin.push({ name: tokens[i] });
  }
  const handleChangeTokenName = (value) => {
    setTokenName(value.name);
  };
  return (
    <Container fixed={true} maxWidth={"lg"}>
      <Grid
        container
        direction="row"
        justifyContent="left"
        alignItems="center"
        className="col-12"
      >
        <Grid className="card col-12">
          <Autocomplete
            id="select coin"
            options={coin}
            getOptionLabel={(option) => option.name}
            value={{ name: tokenName }}
            onChange={(event, value) => handleChangeTokenName(value)}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Token" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="col-6">
          <Grid className="card full-height">
            {/* chart */}

            <Chart
              options={setUpOptions(chartOptionsOne).options}
              series={setUpOptions(chartOptionsOne).series}
              type="line"
              height="150%"
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
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
                    <ZoomChart data={{ ...chartOptionsOne }} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card full-height">
            {/* chart */}
            <Chart
              options={chartOptionsTwo.options}
              series={chartOptionsTwo.series}
              type="line"
              height="150%"
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
                      <Grid container justifyContent="space-between">
                        <ButtonGroup aria-label="contained primary button group">
                          <Button
                            color={selectedBtn === 1 ? "secondary" : "primary"}
                            onClick={() => setSelectedBtn(1)}
                          >
                            24H
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
                        <Chart
                          options={chartOptionsTwoZoom.options}
                          series={chartOptionsTwoZoom.series}
                          type="line"
                          high={500}
                          width={1000}
                        />
                      </Grid>
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="col-6">
          <Grid className="card full-height">
            {/* chart */}
            <Chart
              options={setNumberUserOptions(chartOptionsThree).options}
              series={setUpOptions(chartOptionsThree).series}
              // type="line"
              height="150%"
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
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
                    <ZoomChart data={{ ...chartOptionsThree }} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card full-height">
            {/* chart */}
            <Chart
              options={setNumberUserOptions(chartOptionsFour).options}
              series={setUpOptions(chartOptionsFour).series}
              type="line"
              height="150%"
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Grid>
                <Button variant="outlined" onClick={handleOpenChartFour}>
                  Full
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openChartFour}
                  onClose={handleCloseChartFour}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openChartFour}>
                    <ZoomChart data={chartOptionsFour} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Transactions;
