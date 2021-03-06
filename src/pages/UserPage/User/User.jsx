import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import {
  Button,
  TextField,
  Grid,
  ButtonGroup,
  Container,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
  Box,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import {
  totalValueOfUser,
  valueOfUser,
  dataToken,
  seriesDataToken,
} from "../../../redux_components/slices/userSlice";
import { events_data_wallet } from "../../../redux_components/slices/eventsSlice";
import StatusCard from "./../../../components/status-card/StatusCard";
import {
  ZoomChartOneSeries,
  ZoomChartNormal,
} from "../../../components/charts/ZoomChart";
import {
  setUpOptions,
  setUpOptionChartNormal,
  setUpOptionChartOneSeries,
  setUpOptionChartOne,
  setUpOptionChartThree,
} from "../../../components/charts/Options";
import { fixedLargeNumber, numberWithCommas } from "../../../utils/utility";
import UserTable from "./UserTable";
import HistoryTable from "./HistoryTable";

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
  },
  alertConnect: {
    marginTop: "5vw",
  },
}));
const type_amount = [
  { name: "Deposits (USD)", amount: 0 },
  { name: "Borrows (USD)", amount: 0 },
  { name: "Liquidation Threshold", amount: 0 },
  { name: "Loan To Value (USD)", amount: 0 },
  { name: "Health Factor", amount: 0 },
];
function createData(token, token_address, deposit, borrow) {
  return { token, token_address, deposit, borrow };
}

const User = () => {
  const dispatch = useDispatch();
  const accountAddress = useSelector((state) => state.accountSlice.address);
  const admin = useSelector((state) => state.layout.admin)
  const classes = useStyles();
  const [optionChartOne, setOptionChartOne] = React.useState({});
  const [optionChartOneAll, setOptionChartOneAll] = React.useState({});
  const [optionChartTwo, setOptionChartTwo] = React.useState({
    series: [],
    options: { xaxis: { type: "datetime" } },
  });
  const [optionChartTwoZoom, setOptionChartTwoZoom] = React.useState({
    series: [],
    options: {
      xaxis: { type: "datetime" },
    },
  });
  const [optionChartThree, setOptionChartThree] = React.useState({});
  const [optionChartFour, setOptionChartFour] = React.useState({});
  const [optionChartThreeAll, setOptionChartThreeAll] = React.useState({});
  const [optionChartFourAll, setOptionChartFourAll] = React.useState({});
  const [optionChartFive, setOptionChartFive] = React.useState({
    series: [],
    options: { xaxis: { type: "datetime" } },
  });
  const [optionChartFiveZoom, setOptionChartFiveZoom] = React.useState({
    series: [],
    options: { xaxis: { type: "datetime" } },
  });
  const [amount, setAmount] = React.useState(type_amount);
  const [openChartOne, setOpenChartOne] = React.useState(false);
  const [openChartTwo, setOpenChartTwo] = React.useState(false);
  const [openChartThree, setOpenChartThree] = React.useState(false);
  const [openChartFour, setOpenChartFour] = React.useState(false);
  const [openChartFive, setOpenChartFive] = React.useState(false);
  const [loadingAll, setLoadingAll] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [labelAddress, setLabelAddress] = React.useState("");
  const [selectedBtn, setSelectedBtn] = React.useState(3);
  const [selectedBtn2, setSelectedBtn2] = React.useState(3);
  const [tokenName, setTokenName] = React.useState("");
  const totalValue = useSelector((state) => state.user.totalValue);
  const value = useSelector((state) => state.user.value);
  const data_token = useSelector((state) => state.user.dataToken);
  const series_data_token = useSelector(
    (state) => state.user.seriesDataToken
  );
  const lending = useSelector((state) => state.layout.lendingpool);
  const wallet = useSelector((state) => state.accountSlice.address);
  const event = useSelector((state) => state.events.eventWallet);
  const data_token_list = [];
  for (var i in data_token.token) {
    data_token_list.push(
      createData(
        data_token.token[i],
        data_token.token_address[i],
        data_token.depositTokens[i],
        data_token.borrowTokens[i]
      )
    );
  }
  const coin = [];
  for (var i in data_token.token) {
    coin.push({ name: data_token.token[i] });
  }
  const makeAmount = () => {
    if (!loadingAll || Object.keys(totalValue).length === 0) {
      return;
    }
    let deposit = "";
    let borrow = "";
    let liquit = "";
    let ltv = "";
    let health_factor = "";
    if (totalValue.deposit !== "") {
      deposit = totalValue.deposit.toFixed(0);
    }
    if (totalValue.borrow !== "") {
      borrow = totalValue.borrow.toFixed(0);
    }
    if (totalValue.liquidationT !== "") {
      liquit = totalValue.liquidationT.toFixed(0);
    }
    if (totalValue.ltv !== "") {
      ltv = totalValue.ltv.toFixed(0);
    }
    if (totalValue.health_factor !== "") {
      health_factor = totalValue.health_factor.toFixed(2);
    }
    let tmp = [
      {
        name: "Deposit (USD)",
        amount: deposit,
        info: "Amount of user's Deposit (USD) right now",
      },
      {
        name: "Borrow (USD)",
        amount: borrow,
        info: "Amount of user's Borrow (USD) right now",
      },
      {
        name: "Liquidation Threshold",
        amount: liquit,
        info: "Amount of users' Liquidation Threshold (%) right now",
      },
      {
        name: "Loan To Value (%)",
        amount: ltv,
        info: "Amount of user's Loan To Value (%) right now",
      },
      {
        name: "Health Factor",
        amount: health_factor,
        info: "Amount of user's health factor right now",
      },
    ];
    setAmount(tmp);
  };
  const makeOptionChartTwo = () => {
    if (!loadingAll || event === []) {
      return;
    }
    let deposit_ = [];
    let withdraw_ = [];
    let repay_ = [];
    let borrow_ = [];
    for (var i in event) {
      switch (event[i]["type"]) {
        case "DEPOSIT":
          deposit_.push([event[i]["datetime"] * 1000, event[i]["amount"]]);
          break;
        case "BORROW":
          borrow_.push([event[i]["datetime"] * 1000, event[i]["amount"]]);
          break;
        case "REPAY":
          repay_.push([event[i]["datetime"] * 1000, event[i]["amount"]]);
          break;
        case "WITHDRAW":
          withdraw_.push([event[i]["datetime"] * 1000, event[i]["amount"]]);
          break;
        default:
          break;
      }
    }
    let op = {
      series: [
        {
          name: "Deposit",
          data: deposit_.slice(-168,),
        },
        {
          name: "Borrow",
          data: borrow_.slice(-168,),
        },
        {
          name: "Withdraw",
          data: withdraw_.slice(-168,),
        },
        {
          name: "Repay",
          data: repay_.slice(-168,),
        },
      ],
      options: {
        title: {
          text: "Transactions history of wallet",
          align: "center",
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
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          title: {
            text: "Date time",
          },
          type: "datetime",
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy hh:mm",
          },
          y: {
            formatter: function (val) {
              return numberWithCommas(val, 2) + " USD";
            },
          },
        },
        yaxis: {
          title: {
            text: "Amount (USD)",
          },
          labels: {
            formatter: function (val, index) {
              return fixedLargeNumber(val, 1);
            },
          },
        },
      },
    };

    setOptionChartTwo(op);
    let deposit = deposit_;
    let borrow = borrow_;
    let withdraw = withdraw_;
    let repay = repay_;
    let start = 0;
    let end = Date.now();
    if (selectedBtn === 1) {
      deposit = [];
      borrow = [];
      withdraw = [];
      repay = [];
      start = end - 24 * 3600 * 1000;
      for (var i in deposit_) {
        if (deposit_[i][0] >= start && deposit_[i][0] <= end) {
          deposit.push(deposit_[i]);
        }
      }
      for (var i in borrow_) {
        if (borrow_[i][0] >= start && borrow_[i][0] <= end) {
          borrow.push(borrow_[i]);
        }
      }

      for (var i in repay_) {
        if (repay_[i][0] >= start && repay_[i][0] <= end) {
          repay.push(repay_[i]);
        }
      }

      for (var i in withdraw_) {
        if (withdraw_[i][0] >= start && withdraw_[i][0] <= end) {
          withdraw.push(withdraw_[i]);
        }
      }
    }

    if (selectedBtn === 2) {
      deposit = [];
      borrow = [];
      withdraw = [];
      repay = [];
      start = end - 24 * 3600 * 7 * 1000;
      for (var i in deposit_) {
        if (deposit_[i][0] >= start && deposit_[i][0] <= end) {
          deposit.push(deposit_[i]);
        }
      }
      for (var i in borrow_) {
        if (borrow_[i][0] >= start && borrow_[i][0] <= end) {
          borrow.push(borrow_[i]);
        }
      }

      for (var i in repay_) {
        if (repay_[i][0] >= start && repay_[i][0] <= end) {
          repay.push(repay_[i]);
        }
      }

      for (var i in withdraw_) {
        if (withdraw_[i][0] >= start && withdraw_[i][0] <= end) {
          withdraw.push(withdraw_[i]);
        }
      }
    }
    op = {
      series: [
        {
          name: "deposit",
          data: deposit,
        },
        {
          name: "borrow",
          data: borrow,
        },
        {
          name: "withdraw",
          data: withdraw,
        },
        {
          name: "repay",
          data: repay,
        },
      ],
      options: {
        title: {
          text: "Transactions history of wallet",
          align: "center",
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
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy hh:mm",
          },
        },
        yaxis: {
          title: {
            text: "Amount (USD)",
          },
          labels: {
            formatter: function (val, index) {
              return fixedLargeNumber(val, 1);
            },
          },
        },
      },
    };

    setOptionChartTwoZoom(op);
  };

  const makeOptionChartFive = () => {
    if (!loadingAll || Object.keys(series_data_token).length === 0) {
      return;
    }
    let start = 0;
    let end = Date.now();
    let deposit = series_data_token.deposit;
    let borrow = series_data_token.borrow;
    let op = {
      series: [
        {
          name: "Amount of deposit",
          data: deposit.slice(-168,),
        },
        {
          name: "Amount of borrow",
          data: borrow.slice(-168,),
        },
      ],
      options: {
        title: {
          text: "Deposit amount and borrow amount in a token",
          align: "center",
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
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          title: {
            text: "Date time",
            style: {},
          },

          type: "datetime",
          tickAmount: 6,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy hh:mm",
          },
        },
        yaxis: {
          title: {
            text: "Amount (USD)",
          },
          labels: {
            formatter: function (val, index) {
              return fixedLargeNumber(val, 1);
            },
          },
        },
      },
    };

    setOptionChartFive(op);
    if (selectedBtn2 === 1) {
      deposit = [];
      borrow = [];
      start = end - 24 * 3600 * 1000;
      for (var i in series_data_token.deposit) {
        if (
          series_data_token.deposit[i][0] >= start &&
          series_data_token.deposit[i][0] <= end
        ) {
          deposit.push(series_data_token.deposit[i]);
        }
      }
      for (var i in series_data_token.borrow) {
        if (
          series_data_token.borrow[i][0] >= start &&
          series_data_token.borrow[i][0] <= end
        ) {
          borrow.push(series_data_token.borrow[i]);
        }
      }
    }
    if (selectedBtn2 === 2) {
      deposit = [];
      borrow = [];
      start = end - 24 * 3600 * 7 * 1000;
      for (var i in series_data_token.deposit) {
        if (
          series_data_token.deposit[i][0] >= start &&
          series_data_token.deposit[i][0] <= end
        ) {
          deposit.push(series_data_token.deposit[i]);
        }
      }
      for (var i in series_data_token.borrow) {
        if (
          series_data_token.borrow[i][0] >= start &&
          series_data_token.borrow[i][0] <= end
        ) {
          borrow.push(series_data_token.borrow[i]);
        }
      }
    }
    op = {
      series: [
        {
          name: "Amount of deposit",
          data: deposit,
        },
        {
          name: "Amount of borrow",
          data: borrow,
        },
      ],
      options: {
        title: {
          text: "Deposit amount and borrow amount in a token",
          align: "center",
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
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          tickAmount: 6,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy hh:mm",
          },
        },
        yaxis: {
          title: {
            text: "Amount (USD)",
          },
          labels: {
            formatter: function (val, index) {
              return fixedLargeNumber(val, 1);
            },
          },
        },
      },
    };

    setOptionChartFiveZoom(op);
  };

  const makeOptionChartOne = () => {
    if (!loadingAll || Object.keys(value).length === 0) {
      return;
    }
    let datetime = [];
    for (var i in value.timestamp) {
      datetime.push(value.timestamp[i] * 1000);
    }
    let deposit = value.deposit;
    let borrow = value.borrow;
    setOptionChartOne({
      type: "line",
      name_one: "Amount of borrow",
      name_two: "Amount of deposit",
      data_one: borrow.slice(-168,),
      data_two: deposit.slice(-168,),
      datetime: datetime.slice(-168,),
      title: "Amount of borrow and amount of deposit",
      title_one: "Amount (USD)",
    });
    setOptionChartOneAll({
      type: "line",
      name_one: "Amount of borrow",
      name_two: "Amount of deposit",
      data_one: borrow,
      data_two: deposit,
      datetime: datetime,
      title: "Amount of borrow and amount of deposit",
      title_one: "Amount (USD)",
    });
  };
  const makeOptionChartThree = () => {
    if (!loadingAll || Object.keys(value).length === 0) {
      return;
    }
    let datetime = [];
    for (var i in value.timestamp) {
      datetime.push(value.timestamp[i] * 1000);
    }
    let liquidation = value.liquidation;
    let ltv = value.ltv;
    setOptionChartThree({
      type: "line",
      name_one: "Liquidation threshold",
      name_two: "Loan to value",
      data_one: liquidation.slice(-168,),
      data_two: ltv.slice(-168,),
      datetime: datetime.slice(-168,),
      title: "Liquidation threshold and loan to value",
      title_one: "Percentage (%)",
    });
    setOptionChartThreeAll({
      type: "line",
      name_one: "Liquidation threshold",
      name_two: "Loan to value",
      data_one: liquidation,
      data_two: ltv,
      datetime: datetime,
      title: "Liquidation threshold and loan to value",
      title_one: "Percentage (%)",
    });
  };
  const makeOptionChartFour = () => {
    if (!loadingAll || Object.keys(value).length === 0) {
      return;
    }
    let datetime = [];
    for (var i in value.timestamp) {
      datetime.push(value.timestamp[i] * 1000);
    }
    let hf = value.hf;
    setOptionChartFour({
      type: "line",
      name_one: "Health factor",
      data_one: hf.slice(-168,),
      datetime: datetime.slice(-168,),
      title: "Health factor",
      title_one: "Health factor",
    });
    setOptionChartFourAll({
      type: "line",
      name_one: "Health factor",
      data_one: hf,
      datetime: datetime,
      title: "Health factor",
      title_one: "Health factor",
    });
  };
  const setDefaultAddress = () => {
    if (wallet !== null) {
      setAddress(wallet);
      setLabelAddress(wallet)
      return;
    }
    // if (lending === "bsc") {
    //   setAddress("0x855bfeefaabda356b714fd68d666a7926efd49a6");
    // }
    // if (lending === "ftm"||lending==='geist_ftm') {
    //   setAddress("0x8f9276e46036e0a9bb3db46e9bc7e4e3972380b8");
    // }
  };

  const handleChangeAddress = (event) => {

    if (event.target.value == null) {

      return;
    }
    setLabelAddress(event.target.value);
  };

  const handleLabelAddress = (event) => {
    setAddress(labelAddress.toLowerCase());
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

  const handleOpenChartFive = () => {
    setOpenChartFive(true);
  };

  const handleCloseChartFive = () => {
    setOpenChartFive(false);
  };

  const makeSeriesDataToken = () => {
    if (!loadingAll || Object.keys(data_token).length === 0) {
      return;
    }
    let tokenAddress = data_token.token_address[0];
    for (var i in data_token.token) {
      if (tokenName === data_token.token[i]) {
        tokenAddress = data_token.token_address[i];
        break;
      }
    }

    dispatch(seriesDataToken({ wallet: address, token: tokenAddress }));
  };

  const makeWalletData = () => {
    if (address != "") {
      setLoadingAll(false);
      dispatch(totalValueOfUser(address));
      dispatch(valueOfUser(address));
      dispatch(dataToken(address));
      dispatch(events_data_wallet(address));
      setLoadingAll(true);
    }
  };
  const handleChangeTokenName = (value) => {
    if (value == null) {
      return;
    }
    setTokenName(value.name);
  };

  const makeTokenName = () => {
    if (!loadingAll || Object.keys(data_token).length === 0) {
      return;
    }
    setTokenName(data_token.token[0]);
  };

  useEffect(() => {
    setDefaultAddress();
  }, [lending, wallet]);

  useEffect(() => {
    makeAmount();
  }, [loadingAll, totalValue]);

  useEffect(() => {
    makeWalletData();
  }, [address]);

  useEffect(() => {
    makeOptionChartOne();
    makeOptionChartFour();
    makeOptionChartThree();
    makeOptionChartFive();
  }, [loadingAll, value, series_data_token, selectedBtn2]);

  useEffect(() => {
    makeOptionChartTwo();

  }, [loadingAll, event, selectedBtn]);

  useEffect(() => {
    makeSeriesDataToken();
  }, [loadingAll, tokenName, data_token]);

  useEffect(() => {
    makeTokenName();
  }, [loadingAll, data_token]);
  if (wallet===null) {
    return (
      <Box className={classes.alertConnect}>
        Please connect wallet or use another function!
      </Box>
    );
  }
  console.log(loadingAll)
  if (!loadingAll) {
    return (
      <div className={classes.loading}>
        <CircularProgress disableShrink />
      </div>
    );
  }
  return (
    <Container fixed={true} maxWidth={"lg"} display="flex">
      {
        wallet === admin.address ? (
          <Grid className="row_phu card_phu">
            <TextField
              label="Address"
              variant="outlined"
              value={labelAddress}
              onChange={handleChangeAddress}
            />
            <Button onClick={handleLabelAddress}>Enter</Button>
          </Grid>
        ) : (
          <Grid className="row_phu card_phu">
            <Typography> <h3>Your wallet address: {wallet}</h3> </Typography>
          </Grid>
        )
      }
      <Grid
        container
        className="row_user"
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        {amount.map((item, index) => (
          <Grid xs={2} key={index}>
            <StatusCard
              count={item.amount}
              title={item.name}
              info={item.info}
            />
          </Grid>
        ))}
      </Grid>

      <Grid className="row">
        <Grid className="col-6">
          <Grid className="card_phu">
            {/* chart */}
            <Chart
              options={setUpOptionChartOne(optionChartOne).options}
              series={setUpOptionChartOne(optionChartOne).series}
              type="line"
              height="400"
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
                    <ZoomChartNormal data={optionChartOneAll} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card_phu">
            {/* chart */}
            <Chart
              options={optionChartTwo.options}
              series={optionChartTwo.series}
              type="scatter"
              height="400"
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
                      <Grid>
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
                      <Chart
                        options={optionChartTwoZoom.options}
                        series={optionChartTwoZoom.series}
                        type="scatter"
                        high={450}
                        width={800}
                      />
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="row">
        <Grid className="col-6">
          <Grid className="card">
            {/* chart */}
            <Chart
              options={setUpOptionChartThree(optionChartThree).options}
              series={setUpOptionChartThree(optionChartThree).series}
              type="line"
              height="400"
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
                    <ZoomChartNormal data={optionChartThreeAll} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card">
            {/* chart */}
            <Chart
              options={setUpOptionChartOneSeries(optionChartFour).options}
              series={setUpOptionChartOneSeries(optionChartFour).series}
              type="line"
              height="400"
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
                    <ZoomChartOneSeries data={optionChartFourAll} />
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="row">
        <Grid className="col-6">
          <Grid className="card" style={{ height: "35vw" }}>
            <Grid
              container
              // direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
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
              <Grid>
                <Button variant="outlined" onClick={handleOpenChartFive}>
                  Full
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openChartFive}
                  onClose={handleCloseChartFive}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openChartFive}>
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
                            color={selectedBtn2 === 1 ? "secondary" : "primary"}
                            onClick={() => setSelectedBtn2(1)}
                          >
                            24H
                          </Button>
                          <Button
                            color={selectedBtn2 === 2 ? "secondary" : "primary"}
                            onClick={() => setSelectedBtn2(2)}
                          >
                            1W
                          </Button>
                          <Button
                            color={selectedBtn2 === 3 ? "secondary" : "primary"}
                            onClick={() => setSelectedBtn2(3)}
                          >
                            1M
                          </Button>
                        </ButtonGroup>
                      </Grid>
                      <Chart
                        options={optionChartFiveZoom.options}
                        series={optionChartFiveZoom.series}
                        type="line"
                        high={450}
                        width={800}
                      />
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
            </Grid>

            <Chart
              options={optionChartFive.options}
              series={optionChartFive.series}
              type="line"
              height="400"
            />
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid style={{ height: "35vw" }} className="card">
            <UserTable data={data_token_list} />
          </Grid>
        </Grid>
      </Grid>
      <Grid className="row">
        <Grid className="col-12">
          <Grid className="card">
            <HistoryTable data={event} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default User;
