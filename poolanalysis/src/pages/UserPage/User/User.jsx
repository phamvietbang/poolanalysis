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
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  totalValueOfUser,
  valueOfUser,
} from "../../../redux_components/slices/userSlice";
import StatusCard from "./../../../components/status-card/StatusCard";

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
}));
const chartOptions = {
  series: [
    {
      name: "active user",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "total supply",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    title: {
      text: "Bieu do 1",
      align: "center",
    },
    chart: {
      background: "transparent",
      toolbar: {
        tools: {
          download: false,
          pan: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    color: ["#6ab04c", "#2980b9"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const User = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openChartOne, setOpenChartOne] = React.useState(false);
  const [openChartTwo, setOpenChartTwo] = React.useState(false);
  const [openChartThree, setOpenChartThree] = React.useState(false);
  const [openChartFour, setOpenChartFour] = React.useState(false);
  const [loadingTotalValue, setLoadingTotalValue] = React.useState(false);
  const [loadingValue, setLoadingValue] = React.useState(false);
  const [btn, setBtn] = React.useState(3);
  const [type, setType] = React.useState("deposits");
  const totalValue = useSelector((state) => state.user.totalValue);
  const value = useSelector((state) => state.user.value);

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
  // useEffect(() => {
  //     dispatch(totalValueOfUser('0xac2a1e9ccc678bfe8e7cfcaf3912109f4b7e2570')).then(() => setLoadingTotalValue(true))
  //     dispatch(valueOfUser('0xac2a1e9ccc678bfe8e7cfcaf3912109f4b7e2570',type)).then(() => setLoadingValue(true))
  // }, [type])
  // if (!loadingTotalValue || !loadingValue) {
  //     return
  // }
  // console.log(totalValue)
  const type_amount = [
    {
      name: "Deposits (USD)",
      amount: 124,
      info: "Amount of user's Deposit (USD) right now",
    },
    {
      name: "Borrows (USD)",
      amount: 124,
      info: "Amount of user's Borrow (USD) right now",
    },
    {
      name: "Liquidation Threshold (%)",
      amount: 124,
      info: "Amount of users' Liquidation Threshold (%) right now",
    },
    {
      name: "Loan To Value (USD)",
      amount: 1234,
      info: "Amount of user's Loan To Value (%) right now",
    },
    {
      name: "Health Factor",
      amount: 1234,
      info: "Amount of user's health factor right now",
    },
  ];
  return (
    <Container fixed={true} maxWidth={"lg"}>
      <Grid className="row_phu card_phu">
        <TextField label="Address" variant="outlined" />
      </Grid>
      <Grid
        container
        className="row_user"
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        {type_amount.map((item, index) => (
          <Grid xs={2} key={index}>
            <StatusCard count={item.amount} title={item.name} info={item.info} />
          </Grid>
        ))}
      </Grid>

      <Grid className="row">
        <Grid className="col-6">
          <Grid className="card_phu">
            <Grid>
              <ButtonGroup aria-label="contained primary button group">
                <Button>Deposits</Button>
                <Button>Borrows</Button>
                <Button>Withdraws</Button>
              </ButtonGroup>
            </Grid>
            {/* chart */}
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
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
                            color={
                              type === "deposits" ? "secondary" : "primary"
                            }
                            onClick={() => setType("deposits")}
                          >
                            Deposit
                          </Button>
                          <Button
                            color={type === "borrows" ? "secondary" : "primary"}
                            onClick={() => setType("borrows")}
                          >
                            Borrow
                          </Button>
                          <Button
                            color={
                              type === "withdraws" ? "secondary" : "primary"
                            }
                            onClick={() => setType("withdraws")}
                          >
                            Withdraw
                          </Button>
                        </ButtonGroup>
                      </Grid>
                      <Chart
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type="line"
                        high={500}
                        width={1000}
                      />
                      <Grid>
                        <ButtonGroup aria-label="contained primary button group">
                          <Button
                            color={btn === 1 ? "secondary" : "primary"}
                            onClick={() => setBtn(1)}
                          >
                            24H
                          </Button>
                          <Button
                            color={btn === 2 ? "secondary" : "primary"}
                            onClick={() => setBtn(2)}
                          >
                            1W
                          </Button>
                          <Button
                            color={btn === 3 ? "secondary" : "primary"}
                            onClick={() => setBtn(3)}
                          >
                            1M
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
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
              options={chartOptions.options}
              series={chartOptions.series}
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
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type="line"
                        high={500}
                        width={1000}
                      />
                      <Grid>
                        <ButtonGroup aria-label="contained primary button group">
                          <Button>Day</Button>
                          <Button>Hour</Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
              <Grid>
                <ButtonGroup aria-label="contained primary button group">
                  <Button>Day</Button>
                  <Button>Hour</Button>
                </ButtonGroup>
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
              options={chartOptions.options}
              series={chartOptions.series}
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
                    <Grid
                      className="card"
                      container
                      xs={8}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Chart
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type="line"
                        high={500}
                        width={1000}
                      />
                      <Grid>
                        <ButtonGroup aria-label="contained primary button group">
                          <Button>Day</Button>
                          <Button>Hour</Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
              <Grid>
                <ButtonGroup aria-label="contained primary button group">
                  <Button>Day</Button>
                  <Button>Hour</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="col-6">
          <Grid className="card">
            {/* chart */}
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
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
                    <Grid
                      className="card"
                      container
                      xs={8}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Chart
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type="line"
                        high={500}
                        width={1000}
                      />
                      <Grid>
                        <ButtonGroup aria-label="contained primary button group">
                          <Button>Day</Button>
                          <Button>Hour</Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </Fade>
                </Modal>
              </Grid>
              <Grid>
                <ButtonGroup aria-label="contained primary button group">
                  <Button>Day</Button>
                  <Button>Hour</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default User;
