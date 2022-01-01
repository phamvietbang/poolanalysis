import { NETWORKS } from "../network";
import { bscMainnetAssets } from "./bsc-mainnet";
import { bscTestnetAssets } from "./bsc-testnet";
import { ftmMainnetAssets } from "./fantom-mainnet";
import { ftmTestnetAssets } from "./fantom-testnet";

export function getAssetInfo(assetAddress) {
  return getCurrentAssets().find((ast) => ast.underlyingAddress.toLocaleLowerCase() === assetAddress.toLocaleLowerCase());
}

export function getCurrentAssets() {
  const currentChainId = localStorage.getItem("currentChainId") || NETWORKS.BSC_MAINNET.chainId;
  if (currentChainId === NETWORKS.BSC_MAINNET.chainId) {
    return bscMainnetAssets;
  } else if (currentChainId === NETWORKS.BSC_TESTNET.chainId) {
    return bscTestnetAssets;
  } else if (currentChainId === NETWORKS.FTM_MAINNET.chainId) {
    return ftmMainnetAssets;
  } else if (currentChainId === NETWORKS.FTM_TESTNET.chainId) {
    return ftmTestnetAssets;
  } else {
    throw Error("Invalid Network!");
  }
}
