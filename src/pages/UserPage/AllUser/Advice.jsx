import { Backdrop, Button, Fade, Grid, makeStyles, Modal, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

export default function Advice() {
  const classes = useStyles();

  const [openAdvice, setOpenAdvice] = React.useState(false);
  const [value, setValue] = React.useState({
    'deposit': 0,
    'tvl': 0
  })
  const [loadingAll, setLoadingAll] = useState(false);

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
  const tvlDeposit = useSelector((state) => state.allusers.clusteringUsers);

  const handleOpenAdvice = () => {
    setOpenAdvice(true);
  };

  useEffect(() => {
    handleCloseAdvice()
  }, [loadingAll, tvlDeposit]);

  function averageAmount(a, b, c, d, e, f) {
    return Math.floor((500 * a + 1000 * b + 5000 * c + 10000 * d + 15000 * e + 20000 * f) / (a + b + c + d + e + f))
  }

  const handleCalculate = () => {
    let amountDp = averageAmount(parseInt(deA), parseInt(deB), parseInt(deC), parseInt(deD), parseInt(deE), parseInt(deF))
    let amountTvl = averageAmount(parseInt(tvlA), parseInt(tvlB), parseInt(tvlC), parseInt(tvlD), parseInt(tvlE), parseInt(tvlF))
    let calculate = {
      'deposit': amountDp,
      'tvl': amountTvl,
    }
    setValue(calculate)
  }

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

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpenAdvice}>
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
                <Typography className={classes.adviceTitle}>
                  Less than 1000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={deA}
                  onChange={(event) => setDeA(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 1000 to 5000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={deB}
                  onChange={(event) => setDeB(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 5000 to 10000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={deC}
                  onChange={(event) => setDeC(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 10000 to 15000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={deD}
                  onChange={(event) => setDeD(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 15000 to 20000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={deE}
                  onChange={(event) => setDeE(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  More than 20000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={deF}
                  onChange={(event) => setDeF(event.target.value)}
                  variant="outlined"
                />
                <Grid>
                  <Button
                    className={classes.adviceButton}
                    variant="outlined"
                    color="primary"
                    onClick={handleCalculate}
                  >
                    Calculate
                  </Button>
                </Grid>
                <Grid
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <h2>You should deposit more than {value["deposit"]} USD</h2>
                </Grid>
              </Grid>
              <Grid
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <h3>Number of users having total Value lock</h3>
                <Typography className={classes.adviceTitle}>
                  Less than 1000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={tvlA}
                  onChange={(event) => setTvlA(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 1000 to 5000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={tvlB}
                  onChange={(event) => setTvlB(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 5000 to 10000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={tvlC}
                  onChange={(event) => setTvlC(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 10000 to 15000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={tvlD}
                  onChange={(event) => setTvlD(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  From 15000 to 20000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={tvlE}
                  onChange={(event) => setTvlE(event.target.value)}
                  variant="outlined"
                />
                <Typography className={classes.adviceTitle}>
                  More than 20000 USD
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  value={tvlF}
                  onChange={(event) => setTvlF(event.target.value)}
                  variant="outlined"
                />
                <Grid>
                  <Button
                    className={classes.adviceButton}
                    variant="outlined"
                    color="primary"
                    onClick={handleCalculate}
                  >
                    Calculate
                  </Button>
                </Grid>
                <Grid
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <h2>You should hold less than {value["tvl"]} USD</h2>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
