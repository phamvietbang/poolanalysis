import { getCurrentConnectedWallet, setCurrentConnectedWallet, setWeb3Sender, WALLET_IDS } from "..";
import { resetAccountPoolState } from "../../../redux_components/account/account-pool-slice";
import { resetAccountPoolsState } from "../../../redux_components/account/account-pools-slice";
import { resetAccountState } from "../../../redux_components/account/account-slice";
import { INFO_TOP_CENTER } from "../../../utils/snackbar-utils";
import { clearMetaMaskEventListeners } from "./metamask";
import { clearWalletConnectEventListeners, provider } from "./wallet-connect";

export function disconnectCurrentWallet(dp, eq) {
  const currentConnectedWallet = getCurrentConnectedWallet();

  if (currentConnectedWallet === WALLET_IDS.METAMASK) {
    clearMetaMaskEventListeners();
  } else if (currentConnectedWallet === WALLET_IDS.WALLET_CONNECT) {
    provider.disconnect();
    clearWalletConnectEventListeners();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  // need resetUserCreditScoreState before resetAccountState
  dp(resetAccountState());
  dp(resetAccountPoolState());
  dp(resetAccountPoolsState());
  setWeb3Sender(null);
  setCurrentConnectedWallet(null);
  eq("Disconnected", INFO_TOP_CENTER);
}
