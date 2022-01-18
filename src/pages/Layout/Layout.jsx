import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Select, FormControl, ListSubheader, Grid, MenuItem, NativeSelect } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import App from "./NavBar";
import LinkRoutes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { updateLendingPool } from "./../../redux_components/slices/layOutSlice";
import DesktopHeader from "./DesktopHeader";
import { updateAccInfo } from "../../redux_components/account/account-slice";
import { reloadConfig } from "../../redux_components/other/config-slice";
import RingLoader from "react-spinners/RingLoader";
import { formatAddress } from "../../utils/utility";
import { getAmin } from "./../../redux_components/slices/layOutSlice";
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
    zIndex: 1399,
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  whiteColor: {
    borderRadius:"10px",
    color: "white",
  },
  blackColor: {
    
    color: "green",
  },
  formControl: {
    borderRadius:"10px",
    margin: theme.spacing(1),
    minWidth: 120,
  },
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
  const [type, setType] = useState(lp);
  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    dp(reloadConfig());
  }, []);

  const handleSetType = (e) => {
    var t = e.target.value;
    setType(t);
    dispatch(updateLendingPool(t));
  };

  const connectWallet = async () => {
    const accountAddress = (
      await window.ethereum.request({ method: "eth_requestAccounts" })
    )[0];
    dp(updateAccInfo(accountAddress));
    dp(getAmin(accountAddress))
  };

  const loading = useSelector((state) => state.configSlice.loading);

  return (
    <div>
      {loading === false ? (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                xs={12}
              >
                <Grid>
                  <Typography variant="h6">DeFi Dashboard</Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  xs={3}
                >
                  <Grid xs={1}></Grid>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      native
                      id="simple-menu"
                      className={classes.whiteColor}
                      value={type}
                      onChange={handleSetType}
                      classes={{
                        icon: classes.whiteColor,
                      }}

                    >
                      <optgroup className={classes.blackColor} label="BSC">
                        <option value='bsc'>{formatAddress("0x75de5f7c91a89c16714017c7443eca20c7a8c295")}</option>
                      </optgroup>
                      <optgroup className={classes.blackColor} label="FTM">
                        <option value="ftm">{formatAddress("0xd98bb590bdfabf18c164056c185fbb6be5ee643f")}</option>
                        <option value="geist_ftm">{formatAddress("0x9fad24f572045c7869117160a571b2e50b10d068")}</option>
                      </optgroup>
                    </Select>
                  </FormControl>

                  <DesktopHeader />
                </Grid>
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
            <Toolbar />
            <Toolbar />
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
