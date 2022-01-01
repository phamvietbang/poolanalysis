/* eslint-disable react/jsx-no-target-blank */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { formatAddress } from "../../utils/format";
import { disconnectCurrentWallet } from "../../web3/wallet/event-handler/disconnect";

const useStyles = makeStyles((theme) => ({
  flexBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "1rem",
    },
  },
}));

export default function DisconnectWalletDialog({ hdClosePopup }) {
  const cls = useStyles();

  const accountAddress = useSelector((state) => state.accountSlice.address);
  const dp = useDispatch();
  const { enqueueSnackbar: eq } = useSnackbar();

  return (
    <div>
      <Dialog open={true} onClose={hdClosePopup} style={{ borderRadius: "10px" }}>
        <DialogTitle>
          <Typography variant="h6">Wallet Connection</Typography>
          <Divider></Divider>
        </DialogTitle>
        <DialogContent>
          <Typography>
            <Hidden smDown>{accountAddress}</Hidden>
            <Hidden mdUp>{formatAddress(accountAddress)}</Hidden>
          </Typography>

          <Box my={2} className={cls.flexBox}>
            <a href={`https://bscscan.com/address/${accountAddress}`} target="_blank" className={cls.link}>
              View on BscScan <OpenInNewIcon fontSize="small" />
            </a>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                disconnectCurrentWallet(dp, eq);
                hdClosePopup();
              }}
            >
              Disconnect
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
