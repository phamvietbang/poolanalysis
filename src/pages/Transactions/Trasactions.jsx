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
  loading: {
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
  const [selectedType, setSelectedType] = useState(1);
  const [tokenName, setTokenName] = useState("ALL");
  const [openChartThree, setOpenChartThree] = React.useState(false);
  const [openChartFour, setOpenChartFour] = React.useState(false);
  const [chartOptionsOne, setChartOptionsOne] = React.useState({});
  const [chartOptionsOneAll, setChartOptionsOneAll] = React.useState({});
  const [chartOptionsTwo, setChartOptionsTwo] = React.useState({});
  const [chartOptionsTwoZoom, setChartOptionsTwoZoom] = React.useState({});
  const [chartOptionsThree, setChartOptionsThree] = React.useState({});
  const [chartOptionsThreeAll, setChartOptionsThreeAll] = React.useState({});
  const [chartOptionsFour, setChartOptionsFour] = React.useState({});
  const [chartOptionsFourAll, setChartOptionsFourAll] = React.useState({});
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
    setChartOptionsOne({
      type: "line",
      name_one: "Total borrow",
      name_two: "Total supply",
      data_one: borrow.slice(-168,),
      data_two: supply.slice(-168,),
      datetime: datetime.slice(-168,),
      title: "Total borrow and total supply",
      title_one: "Total borrow (USD)",
      title_two: "Total supply (USD)",
      min_y_left: findMinRoundNumber(Math.min(...borrow.slice(-168,))),
      max_y_left: findMaxRoundNumber(Math.max(...borrow.slice(-168,))),
      min_y_right: findMinRoundNumber(Math.min(...supply.slice(-168,))),
      max_y_right: findMaxRoundNumber(Math.max(...supply.slice(-168,))),
    });
    setChartOptionsOneAll({
      type: "line",
      name_one: "Total borrow",
      name_two: "Total supply",
      data_one: borrow,
      data_two: supply,
      datetime: datetime,
      title: "Total borrow and total supply",
      title_one: "Total borrow (USD)",
      title_two: "Total supply (USD)",
      min_y_left: findMinRoundNumber(Math.min(...borrow)),
      max_y_left: findMaxRoundNumber(Math.max(...borrow)),
      min_y_right: findMinRoundNumber(Math.min(...supply)),
      max_y_right: findMaxRoundNumber(Math.max(...supply)),
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
    setChartOptionsThree({
      type: "column",
      name_two: "Amount of deposit transactions",
      name_one: "Number of deposit transactions",
      data_two: deposit_amount.slice(-168,),
      data_one: deposit_tx.slice(-168,),
      datetime: datetime.slice(-168,),
      title: "Amount and number of deposit transactions",
      title_two: "Amount (USD)",
      title_one: "Number",
      min_y_left: findMinRoundNumber(Math.min(...deposit_tx.slice(-168,))),
      max_y_left: findMaxRoundNumber(Math.max(...deposit_tx.slice(-168,))),
      min_y_right: findMinRoundNumber(Math.min(...deposit_amount.slice(-168,))),
      max_y_right: findMinRoundNumber(Math.max(...deposit_amount.slice(-168,))),
    });
    setChartOptionsThreeAll({
      type: "column",
      name_two: "Amount of deposit transactions",
      name_one: "Number of deposit transactions",
      data_two: deposit_amount,
      data_one: deposit_tx,
      datetime: datetime,
      title: "Amount and number of deposit transactions",
      title_two: "Amount (USD)",
      title_one: "Number",
      min_y_left: findMinRoundNumber(Math.min(...deposit_tx)),
      max_y_left: findMaxRoundNumber(Math.max(...deposit_tx)),
      min_y_right: findMinRoundNumber(Math.min(...deposit_amount)),
      max_y_right: findMinRoundNumber(Math.max(...deposit_amount)),
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
    setChartOptionsFour({
      type: "column",
      name_two: "Amount of borrow transactions",
      name_one: "Number of borrow transactions",
      data_two: borrow_amount.slice(-168,),
      data_one: borrow_tx.slice(-168,),
      datetime: datetime.slice(-168,),
      title: "Amount and number of borrow transactions",
      title_two: "Amount (USD)",
      title_one: "Number",
      min_y_left: findMinRoundNumber(Math.min(...borrow_tx.slice(-168,))),
      max_y_left: findMinRoundNumber(Math.max(...borrow_tx.slice(-168,))),
      min_y_right: findMinRoundNumber(Math.min(...borrow_amount.slice(-168,))),
      max_y_right: findMinRoundNumber(Math.max(...borrow_amount.slice(-168,))),
    });
    setChartOptionsFourAll({
      type: "column",
      name_two: "Amount of borrow transactions",
      name_one: "Number of borrow transactions",
      data_two: borrow_amount,
      data_one: borrow_tx,
      datetime: datetime,
      title: "Amount and number of borrow transactions",
      title_two: "Amount (USD)",
      title_one: "Number",
      min_y_left: findMinRoundNumber(Math.min(...borrow_tx)),
      max_y_left: findMinRoundNumber(Math.max(...borrow_tx)),
      min_y_right: findMinRoundNumber(Math.min(...borrow_amount)),
      max_y_right: findMinRoundNumber(Math.max(...borrow_amount)),
    });
  }
  function makeChartOptionsTwo() {
    if (!loadingLp) {
      return;
    }
    let text = 'Utilization'
    let tvl_supply = totalValue;
    let datetime = [];
    for (var i in tvl_supply.timestamp) {
      datetime.push(tvl_supply.timestamp[i] * 1000);
    }
    let borrow = tvl_supply.borrow;
    let supply = tvl_supply.supply;
    let utilization = [];
    for (var i in borrow) {
      utilization.push(((borrow[i]) / supply[i]).toFixed(2));
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
        name: "Utilization",
        data: uti_rate,
      },
    ];
    if (borrow_rate && deposit_rate && selectedType == 2) {
      _series = [
        {
          name: "Deposit",
          data: deposit_rate,
        },
        {
          name: "Borrow",
          data: borrow_rate,
        },
      ];
      text = 'Interest Rate'
    }else {
      text = 'Utilization'
      _series = [
        {
          name: "Utilization",
          data: uti_rate,
        },
      ];
    }
    let _series_dup = [
      {
        name: "Utilization",
        data: uti_rate.slice(-168,),
      },
    ];
    if (borrow_rate && deposit_rate && selectedType == 2) {
      text = 'Interest Rate'
      _series_dup = [
        {
          name: "Deposit",
          data: deposit_rate.slice(-168,),
        },
        {
          name: "Borrow",
          data: borrow_rate.slice(-168,),
        },
      ];
    } else {
      text = 'Utilization'
      _series_dup = [
        {
          name: "Utilization",
          data: uti_rate.slice(-168,),
        },
      ];
    }
    let chartOptions = {
      series: _series_dup,
      options: {
        title: {
          text: text,
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
          categories: datetime.slice(-168,),
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
                return numberWithCommas(100 * val, 1) + "%";
              },
              offsetX: 10,
            },
          },
        ],
        tooltip: {
          x: {
            format: "dd MMM yyyy hh",
          },
          y: {
            formatter: function (val) {
              return numberWithCommas(100 * val, 2) + "%";
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
        name: "Utilization",
        data: uti_rate,
      },
    ];
    if (borrow_rate && deposit_rate && selectedType == 2) {
      text = 'Interest Rate'
      _series = [
        {
          name: "Deposit",
          data: deposit_rate,
        },
        {
          name: "Borrow",
          data: borrow_rate,
        },
      ];
    } else {
      text = 'Utilization'
      _series = [
        {
          name: "Utilization",
          data: uti_rate,
        },
      ];
    }

    chartOptions = {
      series: _series,
      options: {
        title: {
          text: text,
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
                return numberWithCommas(100 * val, 2) + "%";
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
              return numberWithCommas(100 * val, 2) + "%";
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
    selectedType,
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
    if (value == null) {
      return
    }
    setTokenName(value.name);
  };
  return (
    <Container fixed={true} maxWidth={"lg"} display="flex">
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
                    <ZoomChart data={{ ...chartOptionsOneAll }} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
            <Chart
              options={setUpOptions(chartOptionsOne).options}
              series={setUpOptions(chartOptionsOne).series}
              type="line"
              height="150%"
            />
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card full-height">
            {/* chart */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              {
                tokenName == 'ALL' ? <></> :
                  <Grid>
                    <ButtonGroup aria-label="contained primary button group">
                      <Button
                        color={selectedType === 1 ? "secondary" : "primary"}
                        onClick={() => setSelectedType(1)}
                      >
                        Utilization
                      </Button>
                      <Button
                        color={selectedType === 2 ? "secondary" : "primary"}
                        onClick={() => setSelectedType(2)}
                      >
                        Interest Rate
                      </Button>
                    </ButtonGroup>
                  </Grid>
              }
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
                        {
                          tokenName == 'ALL' ? <></> :
                            <Grid>
                              <ButtonGroup aria-label="contained primary button group">
                                <Button
                                  color={selectedType === 1 ? "secondary" : "primary"}
                                  onClick={() => setSelectedType(1)}
                                >
                                  Utilization
                                </Button>
                                <Button
                                  color={selectedType === 2 ? "secondary" : "primary"}
                                  onClick={() => setSelectedType(2)}
                                >
                                  Interest Rate
                                </Button>
                              </ButtonGroup>
                            </Grid>
                        }

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
                          height={450}
                          width={800}
                        />
                      </Grid>
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
            <Chart
              options={chartOptionsTwo.options}
              series={chartOptionsTwo.series}
              type="line"
              height="150%"
            />
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
                    <ZoomChart data={chartOptionsThreeAll} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
            <Chart
              options={setNumberUserOptions(chartOptionsThree).options}
              series={setUpOptions(chartOptionsThree).series}
              // type="line"
              height="150%"
            />
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card full-height">
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
                    <ZoomChart data={chartOptionsFourAll} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
            <Chart
              options={setNumberUserOptions(chartOptionsFour).options}
              series={setUpOptions(chartOptionsFour).series}
              type="line"
              height="150%"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Transactions;
