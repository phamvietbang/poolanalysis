import React, { useState } from "react";
import InfoIcon from "@material-ui/icons/Info";

import "./statuscard.css";
import { makeStyles, Popover, Typography } from "@material-ui/core";

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
      width: "15vw"
  }
}));

const StatusCard = (props) => {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false)
  const openPopover = (ev) => {
    setAnchor(ev.currentTarget)
  }

  return (
    <div className="status-card">
      <div className="status-card__info">
        <span>{props.title}
            <InfoIcon fontSize="small" onClick={openPopover}/>
            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                onClose={() => setAnchor(null)}
            >
                <Typography className={classes.info}>{props.info}</Typography>
            </Popover>
        </span>
        <h4>{props.count}</h4>
      </div>
    </div>
  );
};

export default StatusCard;
