import { bscTestnetAddresses } from "./bsc-testnet";
import { bscMainnetAddresses } from "./bsc-mainnet";
import { ftmTestnetAddresses } from "./fantom-testnet";
import { ftmMainnetAddresses } from "./fantom-mainnet";
import { NETWORKS } from "../network";

export function getCurrentContractAddresses() {
  const currentChainId = localStorage.getItem("currentChainId") || NETWORKS.BSC_MAINNET.chainId;
  if (currentChainId === NETWORKS.BSC_MAINNET.chainId) {
    return bscMainnetAddresses;
  } else if (currentChainId === NETWORKS.BSC_TESTNET.chainId) {
    return bscTestnetAddresses;
  } else if (currentChainId === NETWORKS.FTM_MAINNET.chainId) {
    return ftmMainnetAddresses;
  } else if (currentChainId === NETWORKS.FTM_TESTNET.chainId) {
    return ftmTestnetAddresses;
  } else {
    throw Error("Invalid Network!");
  }
}
