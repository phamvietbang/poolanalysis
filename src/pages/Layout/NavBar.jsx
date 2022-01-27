import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { NavLink } from "react-router-dom";
import { Box, makeStyles, useMediaQuery } from "@material-ui/core";
import MobileHeader from "./MobileHeader";
import { useDispatch, useSelector } from "react-redux";
import { countEvents, updateCountEvent } from "../../redux_components/slices/eventsSlice";
import { useSnackbar } from "notistack";
import { WARNING_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../utils/snackbar-utils";
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import WarningSharpIcon from '@material-ui/icons/WarningSharp';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';


const menu = [
  {
    title: "Transaction Info",
    to: "/",
    icon: <MultilineChartIcon />
  },
  {
    title: "User Page",
    icon: <FaceIcon />,
    items: [
      {
        title: "All Users",
        to: "/all-users",
        icon: <SupervisorAccountIcon />
      },
      {
        title: "User",
        to: "/user",
        icon: <PersonIcon />
      },
    ],
  },
  {
    title: "Monitoring",
    icon: <TrackChangesIcon />,
    items: [
      {
        title: "Total Value",
        to: "/tvl-and-total-supply",
        icon: <TimelineSharpIcon />
      },
      {
        title: "Alert",
        to: "/alert",
        icon: <WarningSharpIcon />
      },
    ],
  },
];
const menu_2 = [
  {
    title: "Transaction Info",
    to: "/",
    icon: <MultilineChartIcon />
  },
  {
    title: "All Users",
    to: "/all-users",
    icon: <SupervisorAccountIcon />
  },
  {
    title: "Your wallet",
    to: "/user",
    icon: <PersonIcon />
  },
  {
    title: "Total Value",
    to: "/tvl-and-total-supply",
    icon: <TimelineSharpIcon />
  },
];
const menu_3 = [
  {
    title: "Transaction Info",
    to: "/",
    icon: <MultilineChartIcon />
  },
  {
    title: "All Users",
    to: "/all-users",
    icon: <SupervisorAccountIcon />
  },
  {
    title: "Total Value",
    to: "/tvl-and-total-supply",
    icon: <TimelineSharpIcon />
  },
];
const useStyles = makeStyles((theme) => ({
  active: {
    color: "rgb(0, 143, 251)",
    backgroundColor: "rgb(0, 143, 251)",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

const SingleLevel = ({ item }) => {
  const dp = useDispatch()
  const [className, setClassName] = useState("");
  const classes = useStyles();
  const count = useSelector((state) => state.events.count_event)
  const [alert, setAlert] = useState(count)
  const { enqueueSnackbar } = useSnackbar()
  const admin = useSelector((state) => state.layout.admin)
  async function getClassName() {
    if (item.title == "Transaction Info" || admin.address == "") {
      setClassName("");
    } else {
      setClassName("list_item");
    }
  }
  async function resetAlert() {
    if (window.location.pathname == "/alert") {
      setAlert(0)
    }
  }
  function handleClick() {
    if (item.title == 'Alert' && admin.address !== "") {
      if (alert > 0) {
        enqueueSnackbar("There are " + alert + " transactions having more than 10,000 USD in the last 24h!", WARNING_TOP_CENTER);
      } else {
        enqueueSnackbar("Everything is ok!", SUCCESS_TOP_CENTER);
      }
      setAlert(0)
      // dp(updateCountEvent(0))
    } else {
      dp(countEvents())
    }
  };
  useEffect(() => {
    resetAlert()
    getClassName();
    // handleClick()
  }, []);
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => (!isActive ? "" : classes.active)}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon className={className} >{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        <div style={{ color: 'red' }}>
          {item.title === 'Alert' && alert > 0 ? <div>{alert}</div> : <div></div>}
        </div>

      </ListItem>
    </NavLink>
  );
};
const MultiLevel = ({ item, key }) => {
  const { items: children } = item;
  const dp = useDispatch()
  const [open, setOpen] = useState(false);
  const count = useSelector((state) => state.events.count_event)
  const [alert, setAlert] = useState(count)

  const checkOpen = () => {
    if (children[0]["to"] === window.location.pathname || children[1]["to"] === window.location.pathname) {
      setOpen(true);
    }
  };

  const handleClick = () => {
    if (item.title == 'Monitoring') {
      setAlert(0)
    } else {
      dp(countEvents())
    }
    setOpen((prev) => !prev);
  };
  async function resetAlert() {
    if (window.location.pathname == "/alert") {
      setAlert(0)
    }
  }

  React.useEffect(() => {
    resetAlert();
    checkOpen();
  }, [children]);
  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        <div style={{ color: 'red' }}>
          {
            item.title == "Monitoring" && alert > 0 ? <div>1</div> : <div></div>
          }
        </div>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
function hasChildren(item) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}
const MenuItem = ({ item, key }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} key={key} />;
};
export default function App() {
  let [menuBar, setMenuBar] = React.useState(menu_3)
  const dp = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const admin = useSelector((state) => state.layout.admin)
  const wallet = useSelector((state) => state.accountSlice.address);
  const isMobile = useMediaQuery("@media screen and (max-width: 750px)");

  const handleSetMenu = () => {
    if (!loading) {
      return
    }
    if (admin.address !== "") {
      setMenuBar(menu)
    } else if (wallet !== null) {
      setMenuBar(menu_2)
    } else {
      setMenuBar(menu_3)
    }
  }

  useEffect(() => {
    dp(countEvents()).then(() => setLoading(true));
  }, []);
  console.log(menuBar)
  useEffect(() => {
    handleSetMenu()
  }, [loading, admin, wallet])
  if (!loading) {
    return <div></div>;
  }
  return (
    <Box id="header">
      {isMobile ? (
        <MobileHeader />
      ) : (
        <div>
          {menuBar.map((item, key) => (
            <MenuItem key={key} item={item} />
          ))}
        </div>
      )}
    </Box>
  );
}
