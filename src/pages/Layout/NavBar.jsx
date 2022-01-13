import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { NavLink } from "react-router-dom";
import { Box, makeStyles, useMediaQuery } from "@material-ui/core";
import MobileHeader from "./MobileHeader";
import { useDispatch, useSelector } from "react-redux";
import { countEvents, updateCountEvent } from "../../redux_components/slices/eventsSlice";

const menu = [
  {
    title: "Transactions-Volumn",
    to: "/",
  },
  {
    title: "User Page",
    items: [
      {
        title: "All Users",
        to: "/all-users",
      },
      {
        title: "User",
        to: "/user",
      },
    ],
  },
  {
    title: "Monitor",
    items: [
      {
        title: "Tvl/Total Supply",
        to: "/tvl-and-total-supply",
      },
      {
        title: "Alert",
        to: "/alert",
      },
    ],
  },
];
const useStyles = makeStyles((theme) => ({
  active: {
    color: "rgb(0, 143, 251)",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loading:{
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
  const count = useSelector((state)=>state.events.count_event)
  const [alert, setAlert] = useState(count)
  async function getClassName() {
    if (item.title == "Transactions-Volumn") {
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
  const handleClick = () => {
    if(item.title=='Alert'){
      setAlert(0)
      dp(updateCountEvent(0))
    }
  }; 
  useEffect(() => {
    resetAlert()
    getClassName();
  }, []);
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => (!isActive ? "" : classes.active)}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText className={className} primary={item.title} />
        {item.title==='Alert' && alert > 0 ?<div>{alert}</div>:<div></div>}
      </ListItem>
    </NavLink>
  );
};
const MultiLevel = ({ item, key }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);
  const count = useSelector((state)=>state.events.count_event)
  const [alert, setAlert] = useState(count)

  const checkOpen = () => {
    if (children[0]["to"] === window.location.pathname || children[1]["to"] === window.location.pathname) {
      setOpen(true);
    }
  };

  const handleClick = () => {
    if(item.title=='Monitor'){
      setAlert(0)
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
        <ListItemText primary={item.title} />
        {
          item.title=="Monitor" && alert>0? <div>1</div>:<div></div> 
        }
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
  const dp = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const isMobile = useMediaQuery("@media screen and (max-width: 750px)");
  useEffect(() => {
    dp(countEvents()).then(() => setLoading(true));
  }, []);
  if (!loading) {
    return <div></div>;
  }
  return (
    <Box id="header">
      {isMobile ? (
        <MobileHeader />
      ) : (
        <div>
          {menu.map((item, key) => (
            <MenuItem key={key} item={item} />
          ))}
        </div>
      )}
    </Box>
  );
}
