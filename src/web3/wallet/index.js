import Web3 from "web3";
import { getCurrentNetwork, NETWORKS } from "../network";

let web3Reader;
function getWeb3Reader() {
  return web3Reader;
}
async function initWeb3Reader() {
  const currentNetwork = getCurrentNetwork() || NETWORKS.BSC_MAINNET;
  const promises = currentNetwork.rpcUrls.map(async (rpc, index) => {
    const web3 = new Web3(rpc);
    await web3.eth.getBlockNumber();
    return rpc;
  });
  const bestRPC = await Promise.any(promises);
  web3Reader = new Web3(bestRPC);
  // web3Reader = new Web3(currentNetwork.rpcUrls[0]);
}

let web3Sender;
function getWeb3Sender() {
  return web3Sender;
}
function setWeb3Sender(provider) {
  if (!provider) {
    web3Sender = null;
  } else {
    web3Sender = new Web3(provider);
  }
}

const WALLET_IDS = {
  METAMASK: 1,
  WALLET_CONNECT: 2,
};
let currentConnectedWallet = JSON.parse(window.localStorage.getItem("currentConnectedWallet"));
function getCurrentConnectedWallet() {
  return currentConnectedWallet;
}
function setCurrentConnectedWallet(walletID) {
  currentConnectedWallet = walletID;
  window.localStorage.setItem("currentConnectedWallet", walletID);
}

export {
  web3Reader,
  initWeb3Reader,
  getWeb3Reader,
  WALLET_IDS,
  getWeb3Sender,
  setWeb3Sender,
  getCurrentConnectedWallet,
  setCurrentConnectedWallet,
};
