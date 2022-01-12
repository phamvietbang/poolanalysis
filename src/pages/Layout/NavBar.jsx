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
}));

const SingleLevel = ({ item }) => {
  const [className, setClassName] = useState("");
  const classes = useStyles();
  const [id, setId] = useState(null);
  async function getClassName() {
    if (item.title == "Transactions-Volumn") {
      setClassName("");
    } else {
      setClassName("list_item");
    }
  }
  useEffect(() => {
    getClassName();
  }, []);
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => (!isActive ? "" : classes.active)}
    >
      <ListItem button>
        <ListItemText className={className} primary={item.title} />
      </ListItem>
    </NavLink>
  );
};
const MultiLevel = ({ item, key }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);
  const checkOpen = () => {
    if (children[0]["to"] === window.location.pathname || children[1]["to"] === window.location.pathname) {
      setOpen(true);
    }
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  React.useEffect(() => {
    checkOpen();
  }, [children]);
  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={item.title} />
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
  console.log(item)
          // setId(child)
  return <Component item={item} key={key} />;
};
export default function App() {
  const isMobile = useMediaQuery("@media screen and (max-width: 750px)");
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
