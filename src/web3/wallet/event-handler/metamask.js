import Web3 from "web3";
import { WALLET_IDS } from "..";
import { setCurrentConnectedWallet, setWeb3Sender } from "..";
import { updateAccInfo } from "../../../redux_components/account/account-slice";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";
import { getCurrentNetwork } from "../../network";
import { disconnectCurrentWallet } from "./disconnect";

let metaMaskClockId;

export function addMetaMaskEventListeners(dp, eq) {
  // this line fix lock/unlock events
  metaMaskClockId = setInterval(async () => {
    try {
      const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0];
    } catch (error) {}
  }, 1000);

  // account changed
  window.ethereum.on("accountsChanged", async (addresses) => {
    if (addresses.length === 0) {
      disconnectCurrentWallet(dp, eq);
    } else {
      dp(updateAccInfo(addresses[0], eq));
    }
  });

  // chainChanged
  window.ethereum.on("chainChanged", async (chainId) => {
    const currentNetwork = getCurrentNetwork();
    if (chainId !== currentNetwork.chainId) {
      eq(`Please switch to ${currentNetwork.chainName}, then reconnect!`, { ...ERR_TOP_CENTER });
      disconnectCurrentWallet(dp, eq);
    }
  });
}

// don't know why use this function will case stack overflow
export async function hdConnectMetaMask(dp, eq, shouldNoti) {
  addMetaMaskEventListeners(dp, eq);
  const accountAddress = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0];
  setWeb3Sender(Web3.givenProvider);
  setCurrentConnectedWallet(WALLET_IDS.METAMASK);
  dp(updateAccInfo(accountAddress, eq))
    .then(() => shouldNoti && eq("Connect success!", SUCCESS_TOP_CENTER))
    .catch(() => shouldNoti && eq("Something went wrong!", ERR_TOP_CENTER));
}

export function clearMetaMaskEventListeners() {
  window.ethereum.removeAllListeners("accountsChanged");
  window.ethereum.removeAllListeners("chainChanged");
  clearInterval(metaMaskClockId);
}
