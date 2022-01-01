/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Dialog, List, ListItem, ListItemText, Tooltip, Typography } from "@material-ui/core";
import ComputerIcon from "@material-ui/icons/Computer";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import metamaskLogo from "../../assets/icons/wallets/metamask512.png";
import { updateAccInfo } from "../../redux_components/account/account-slice";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../utils/snackbar-utils";
import Web3 from "web3";
import { getCurrentNetwork } from "../../web3/network";
import { getCurrentConnectedWallet, setCurrentConnectedWallet, setWeb3Sender, WALLET_IDS } from "../../web3/wallet";
import { addMetaMaskEventListeners, clearMetaMaskEventListeners } from "../../web3/wallet/event-handler/metamask";
import {
  addWalletConnectEventListeners,
  clearWalletConnectEventListeners,
  provider,
} from "../../web3/wallet/event-handler/wallet-connect";
import { switchNetwork } from "../../web3/wallet/network-switcher";
import topImgSrc from "./connect-wallet-top-img.png";
import walletConnectIcon from "./wallet-connect-icon.svg";

const imgStyle = {
  height: 32,
  width: 32,
  objectFit: "contain",
  marginRight: 16,
};

export default function ConnectWalletDialog({ hdClosePopup }) {
  const dp = useDispatch();
  const { enqueueSnackbar: eq } = useSnackbar();

  const currentConnectedWallet = getCurrentConnectedWallet();

  async function hdConnectMetaMask() {
    if (currentConnectedWallet === WALLET_IDS.WALLET_CONNECT) {
      clearWalletConnectEventListeners();
    }
    try {
      const chainId = window.ethereum.networkVersion;
      const currentNetwork = getCurrentNetwork();
      if (chainId !== Number(currentNetwork.chainId).toString()) {
        eq(`Please switch to ${currentNetwork.chainName}, then reconnect!`, { ...ERR_TOP_CENTER });
      }
      await switchNetwork(dp, eq);
      addMetaMaskEventListeners(dp, eq);
      const accountAddress = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0];
      setWeb3Sender(Web3.givenProvider);
      setCurrentConnectedWallet(WALLET_IDS.METAMASK);
      dp(updateAccInfo(accountAddress, eq)).then(() => eq("Connect success!", SUCCESS_TOP_CENTER));
    } catch (err) {
      console.error(err);
      clearMetaMaskEventListeners();
      eq(JSON.stringify(err.message), ERR_TOP_CENTER);
    } finally {
      hdClosePopup();
    }
  }

  async function hdWalletConnect() {
    if (currentConnectedWallet === WALLET_IDS.METAMASK) {
      clearMetaMaskEventListeners();
    }
    try {
      addWalletConnectEventListeners(dp, eq);
      await provider.enable();
      setWeb3Sender(provider);
      setCurrentConnectedWallet(WALLET_IDS.WALLET_CONNECT);
      dp(updateAccInfo(provider.accounts[0], eq)).then(() => {
        eq("Connect successfully!", SUCCESS_TOP_CENTER);
      });
    } catch (err) {
      console.error(err);
      clearWalletConnectEventListeners();
      eq(JSON.stringify(err.message), ERR_TOP_CENTER);
    } finally {
      hdClosePopup();
    }
  }

  return (
    <Dialog open={true} onClose={hdClosePopup} style={{ borderRadius: "10px" }}>
      <img src={topImgSrc} alt="" style={{ width: "100%" }} />
      <Box p={2} py={3} maxWidth="450px">
        <Box textAlign="center">
          <Typography variant="h4" style={{ fontSize: 20, fontWeight: 700 }}>
            Choose Wallet
          </Typography>
          <Typography style={{ width: "90%", margin: "auto", fontSize: 14 }}>
            Safely connect to your existing blockchain waller and directly stake tokens in them.
          </Typography>
        </Box>

        <Box width="100%" border="0.5px solid rgba(65, 69, 97, 0.2)" borderRadius="5px" mt={2}>
          <List disablePadding={true}>
            <ListItem
              divider
              button
              style={{ minHeight: 64, borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}
              onClick={hdConnectMetaMask}
            >
              <img src={metamaskLogo} alt="metamask" style={imgStyle} />
              <ListItemText>MetaMask</ListItemText>
              <Tooltip title="For PC">
                <ComputerIcon></ComputerIcon>
              </Tooltip>
            </ListItem>

            <ListItem
              divider
              button
              style={{ minHeight: 64, borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px" }}
              onClick={hdWalletConnect}
            >
              <img src={walletConnectIcon} alt="wallet-connect" style={imgStyle} />
              <ListItemText>WalletConnect</ListItemText>
              <Tooltip title="For Mobile">
                <PhoneIphoneIcon></PhoneIphoneIcon>
              </Tooltip>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Dialog>
  );
}
