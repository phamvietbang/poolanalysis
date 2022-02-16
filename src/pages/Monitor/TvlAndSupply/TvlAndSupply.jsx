import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import {
  Button,
  ButtonGroup,
  Grid,
  Container,
  TextField,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useSelector } from "react-redux";
import TableTVLAndSupply from "./TableTVLAndSupply";
import {
  totalValueData,
  tvlSupplyTokensData,
} from "../../../redux_components/slices/lendingPoolSlice";
import { totalValueTokenData } from "../../../redux_components/slices/tokenSlice";
import { useDispatch } from "react-redux";
import { fixedLargeNumber, numberWithCommas } from "../../../utils/utility";

const useStyles = makeStyles((theme) => ({
  loading:{
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}))

const TvlAndSupply = () => {

  const classes = useStyles()
  const dispatch = useDispatch();
  const [loadingLp, setLoadingLp] = useState(false);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [loadingT, setLoadingT] = useState(false);
  const [tokenName, setTokenName] = useState("ALL");
  const [selectedBtn, setSelectedBtn] = React.useState(3);
  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: { xaxis: { type: "datetime" } },
  });
  const totalValue = useSelector((state) => state.lendingpool.totalValue);
  const tvl_supply_tokens = useSelector((state) => state.lendingpool.tvlSupply);
  const tokens = useSelector((state) => state.lendingpool.tokenName);
  const totalValueToken = useSelector((state) => state.token.totalValue);
  const address = useSelector((state) => state.lendingpool.tokenAddress);

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

  function makechartOptions() {
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
    let time = 0;
    if (selectedBtn === 1 && tvl_supply.timestamp.length > 24) {
      time = -24;
    }
    if (selectedBtn === 2 && tvl_supply.timestamp.length > 168) {
      time = -168;
    }
    let tvl = tvl_supply.tvl.slice(time);
    let supply = tvl_supply.supply.slice(time);
    let min_y_left = findMinRoundNumber(Math.min(...tvl));
    let min_y_right = findMinRoundNumber(Math.min(...supply));
    let max_y_left = findMaxRoundNumber(Math.max(...tvl));
    let max_y_right = findMaxRoundNumber(Math.max(...supply));
    setChartOptions({
      series: [
        {
          name: "Total value lock",
          data: tvl,
        },
        {
          name: "Total supply",
          data: supply,
        },
      ],
      options: {
        title: {
          text: "Total value lock and total supply",
          align: "center",
        },
        color: ["#6ab04c", "#2980b9"],
        dataLabels: {
          enabled: false,
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
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          title: {
            text: "Date time",
          },
          categories: datetime.slice(time,),
          type: "datetime",
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy hh",
          },
          y: {
            formatter: function (val, index) {
              return numberWithCommas(val, 2) + " USD";
            },
          },
        },
        yaxis: [
          {
            min: min_y_left,
            max: max_y_left,
            tickAmount: 4,
            title: {
              text: "Total value lock (USD)",
            },
            labels: {
              formatter: function (val, index) {
                // return val.toFixed(2);
                return fixedLargeNumber(val.toFixed(2), 1);
              },
            },
          },
          {
            min: min_y_right,
            max: max_y_right,
            tickAmount: 4,
            floating: false,
            opposite: true,
            title: {
              text: "Total supply (USD)",
            },
            labels: {
              formatter: function (val, index) {
                // return val.toFixed(2);
                return fixedLargeNumber(val.toFixed(2), 1);
              },
            },
          },
        ],
        legend: {
          position: "top",
        },
        grid: {
          show: true,
        },
      },
    });
  }

  const dispatchValueTokens = () => {
    if (tokenName != "ALL") {
      for (var i in tokens) {
        if (tokenName == tokens[i]) {
          dispatch(totalValueTokenData(address[i])).then(() =>
            setLoadingT(true)
          );
          break;
        }
      }
    } else {
      dispatch(totalValueData()).then(() => setLoadingLp(true));
    }
  };

  useEffect(() => {
    makechartOptions();
  }, [
    tokenName,
    totalValue,
    totalValueToken,
    loadingT,
    selectedBtn,
    loadingLp,
  ]);
  useEffect(() => {
    dispatchValueTokens();
  }, [tokenName, address, tokens]);
  useEffect(() => {
    dispatch(tvlSupplyTokensData()).then(() => setLoadingTokens(true));
  }, []);

  if (!loadingLp || !loadingTokens) {
    return <div className={classes.loading}><CircularProgress disableShrink /></div>;
  }
  const coin = [{ name: "ALL" }];
  for (var i in tokens) {
    coin.push({ name: tokens[i] });
  }
  const handleChangeTokenName = (value) => {
    if(value==null){
      return
    }
    setTokenName(value.name);
  };

  return (
    <Container fixed={true} maxWidth={"lg"} display="flex">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="col-12">
          <Grid className="card">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Autocomplete
                id="select coin"
                options={coin}
                getOptionLabel={(option) => option.name}
                value={{ name: tokenName }}
                onChange={(event, value) => handleChangeTokenName(value)}
                style={{
                  width: 300,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Coin" variant="outlined" />
                )}
              />
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
            {/* chart */}
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="line"
              height="500"
            />
          </Grid>
          <Grid className="card">
            <Grid item xs={12}>
              <TableTVLAndSupply data={tvl_supply_tokens} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default TvlAndSupply;
