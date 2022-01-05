import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Select, Button, Grid, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import App from "./NavBar";
import LinkRoutes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { updateLendingPool } from "./../../redux_components/slices/layOutSlice";
import DesktopHeader from "./DesktopHeader";
import { updateAccInfo } from "../../redux_components/account/account-slice";
import { reloadConfig } from "../../redux_components/other/config-slice";
import RingLoader from "react-spinners/RingLoader";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  whiteColor: {
    color: "white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  active: {
    color: "rgb(0, 143, 251)",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function PermanentDrawerLeft() {
  const dp = useDispatch();
  const classes = useStyles();
  const dispatch = useDispatch();
  const lp = useSelector((state) => state.layout.lendingpool);
  // console.log(lp)
  const [type, setType] = useState(lp);
  const handleSetType = (e) => {
    var t = e.target.value;
    setType(t);
    // debugger
    dispatch(updateLendingPool(t));
  };
  const connectWallet = async () => {
    const accountAddress = (
      await window.ethereum.request({ method: "eth_requestAccounts" })
    )[0];
    dp(updateAccInfo(accountAddress));
  };

  useEffect(() => {
    connectWallet();
  }, []);
  useEffect(() => {
    dp(reloadConfig());
  }, []);

  const loading = useSelector((state) => state.configSlice.loading);
  console.log("🚀 ~ file: NavBar.jsx ~ line 136 ~ App ~ loading", loading);
  return (
    <div >
      {loading === false ? (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                xs={12}
              >
                {/* <div className={classes.button}> */}
                {/* <Button variant="contained" color="primary" onClick={handleClick}>{type}</Button> */}
                <Select
                  variant="outlined"
                  id="simple-menu"
                  className={classes.whiteColor}
                  value={type}
                  onChange={handleSetType}
                  classes={{
                    icon: classes.whiteColor,
                  }}
                >
                  <MenuItem value='bsc'>TRAVA IN BSC</MenuItem>
                  <MenuItem value='ftm'>TRAVA IN FTM</MenuItem>
                  <MenuItem value='geist_ftm'>GEIST IN FTM</MenuItem>
                </Select>
                {/* <Button variant="contained" color="primary">Connect Wallet</Button> */}
                <DesktopHeader />
                {/* </div> */}
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <div className="sidebar">
              <Typography variant="h6">TRAVA</Typography>
            </div>
            <Divider />
            <App />
          </Drawer>
          <Grid
            container
            className="layout__content-main"
            xs={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <LinkRoutes />
          </Grid>
        </div>
      ) : (
        <div className={classes.loader}>
          <RingLoader color="rgb(0, 143, 251)" size={100} />
        </div>
      )}
    </div>
  );
}
