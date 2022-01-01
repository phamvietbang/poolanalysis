import WalletConnectProvider from "@walletconnect/web3-provider";
import { updateAccInfo } from "../../../redux_components/account/account-slice";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";
import { setCurrentConnectedWallet, setWeb3Sender, WALLET_IDS } from "..";
import { getCurrentNetwork } from "../../network";
import { disconnectCurrentWallet } from "./disconnect";

export const provider = new WalletConnectProvider({
  chainId: Number(getCurrentNetwork().chainId),
  rpc: {
    56: "https://bsc-dataseed1.binance.org/",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    250: "https://rpc.ftm.tools/",
    4002: "https://rpc.testnet.fantom.network/",
  },
});

export function addWalletConnectEventListeners(dp, eq) {
  provider.on("accountsChanged", async (accounts) => {
    dp(updateAccInfo(accounts[0], eq));
  });

  provider.on("chainChanged", (chainId) => {
    const currentNetwork = getCurrentNetwork();
    if (chainId !== currentNetwork.chainId) {
      eq(`Please switch to ${currentNetwork.chainName}, then reconnect!`, { ...ERR_TOP_CENTER });
      disconnectCurrentWallet(dp, eq);
    }
  });

  provider.on("disconnect", (code, reason) => {
    disconnectCurrentWallet(dp, eq);
  });

  // user reject
  provider.wc.on("disconnect", (error, payload) => {
    eq("Session terminated!", ERR_TOP_CENTER);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
}

export async function hdConnectWalletConnect(dp, eq, shouldNoti) {
  addWalletConnectEventListeners(dp, eq);
  await provider.enable();
  setWeb3Sender(provider);
  setCurrentConnectedWallet(WALLET_IDS.WALLET_CONNECT);
  dp(updateAccInfo(provider.accounts[0], eq)).then(() => {
    shouldNoti && eq("Connect success!", SUCCESS_TOP_CENTER);
  });
}

export function clearWalletConnectEventListeners() {
  provider.removeAllListeners("accountsChanged");
  provider.removeAllListeners("chainChanged");
  provider.removeAllListeners("disconnect");
}
