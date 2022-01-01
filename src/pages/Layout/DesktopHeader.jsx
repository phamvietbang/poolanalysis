import { Box, Button, Typography } from "@material-ui/core";
import DISCONNECT from "./disconnect.svg";
import CONNECT from "./connect.svg";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConnectWalletDialog from "../../components/ConnectWalletDialog";
import DisconnectWalletDialog from "../../components/DisconnectWalletDialog";

export default function DesktopHeader() {
  const accountAddress = useSelector((state) => state.accountSlice.address);
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const [isOpenDisconnectModal, setIsOpenDisconnectModal] = useState(false);
  function hdClickConnectWallet() {
    if (!accountAddress) {
      setIsOpenConnectModal(true);
    } else {
      setIsOpenDisconnectModal(true);
    }
  }

  return (
      <Box display="flex" alignItems="center">
        <Button
          size="small"
          color="primary"
          style={{ textTransform: "capitalize", lineHeight: "1.5" }}
          variant="contained"
          onClick={hdClickConnectWallet}
        >
          <Box display="flex" alignItems="center">
            {accountAddress ? (
              <img src={CONNECT} alt="" style={{ width: "20px", height: "20px" }} />
            ) : (
              <img src={DISCONNECT} alt="" style={{ width: "20px", height: "20px" }} />
            )}
            <Box pl={1}>
              <Typography align="left" style={{ fontSize: 10 }}>
                <FiberManualRecordIcon /> {accountAddress ? "Connected" : "Not Connected"}
              </Typography>
              <span style={{}}>{accountAddress ? accountAddress.slice(0, 10) + "..." : "Connect Wallet"}</span>
            </Box>
          </Box>
        </Button>
        {isOpenConnectModal && <ConnectWalletDialog hdClosePopup={() => setIsOpenConnectModal(false)} />}
        {isOpenDisconnectModal && <DisconnectWalletDialog hdClosePopup={() => setIsOpenDisconnectModal(false)} />}
      </Box>
  );
}
