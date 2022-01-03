import {
  makeStyles,
  Paper,
  Popover,
  Popper,
  Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React, { useState } from "react";
import { numberWithCommas } from "../../utils/utility";
import "./statuscard.css";

const useStyles = makeStyles((theme) => ({
  badge: {
    fontSize: "0.75rem",
    padding: "4px",
    border: "1px solid #898989",
    borderRadius: 6,
    display: "inline",
  },
  info: {
    padding: "10px",
    fontSize: "13px",
    width: "15vw",
    position: "relative",
    zIndex: "10",
  },
  title: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
}));

const StatusCard = (props) => {
  const classes = useStyles();

  const [anchor, setAnchor] = useState(null);

  const openPopover = (ev) => {
    setAnchor(ev.currentTarget);
  };
  const close = () => {
    setAnchor(null);
  };

  return (
    <div className="status-card">
      <div className="status-card__info">
        {/* <div>
        <div> */}
        <span className={classes.title}>
          <div style={{ marginRight: "5px" }}>{props.title}</div>
          <div>
            <InfoIcon
              fontSize="small"
              onMouseOver={openPopover}
              onMouseOut={close}
            />
            <Popper
              open={Boolean(anchor)}
              anchorEl={anchor}
              placement="top-center"
              onClose={() => setAnchor(null)}
            >
              <Paper className={classes.info}>{props.info}</Paper>
            </Popper>
          </div>
        </span>
        <h5>{numberWithCommas(props.count, 2)}</h5>
      </div>
    </div>
  );
};

export default StatusCard;
