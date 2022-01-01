import Web3 from "web3";
import { getCurrentConnectedWallet, WALLET_IDS } from "..";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { getCurrentNetwork } from "../../network";
import { switchNetwork } from "../network-switcher";
import { clearMetaMaskEventListeners, hdConnectMetaMask } from "./metamask";
import { clearWalletConnectEventListeners, hdConnectWalletConnect } from "./wallet-connect";

export async function initReconnectWallet(dp, eq) {
  const currentConnectedWallet = getCurrentConnectedWallet();

  if (currentConnectedWallet === WALLET_IDS.METAMASK) {
    try {
      let web3 = new Web3(Web3.givenProvider);
      const chainId = await web3.eth.getChainId();
      const currentNetwork = getCurrentNetwork();
      if (chainId !== Number(currentNetwork.chainId)) {
        eq(`Please switch to ${currentNetwork.chainName}, then reconnect!`, { ...ERR_TOP_CENTER });
      }
      await switchNetwork(dp, eq);
      await hdConnectMetaMask(dp, eq);
    } catch (err) {
      console.error(err);
      clearMetaMaskEventListeners();
      eq(JSON.stringify(err.message), ERR_TOP_CENTER);
    }
  }

  if (currentConnectedWallet === WALLET_IDS.WALLET_CONNECT) {
    try {
      await hdConnectWalletConnect(dp, eq);
    } catch (err) {
      console.error(err);
      clearWalletConnectEventListeners();
      eq(JSON.stringify(err.message), ERR_TOP_CENTER);
    }
  }
}
