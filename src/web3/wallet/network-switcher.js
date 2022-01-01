import Web3 from "web3";
import { getCurrentNetwork } from "../network";
import { disconnectCurrentWallet } from "./event-handler/disconnect";

export async function switchNetwork(dp, eq) {
  const targetNetwork = getCurrentNetwork();
  const web3 = new Web3(Web3.givenProvider);
  const currentMetamaskChainId = await web3.eth.getChainId();

  if (currentMetamaskChainId !== Number(targetNetwork.chainId)) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetwork.chainId }],
      });
    } catch (error) {
      console.error(error);
      if ((error.code = 4001)) {
        disconnectCurrentWallet(dp, eq);
      }
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [targetNetwork],
      });

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetwork.chainId }],
      });
    }
  }
}
