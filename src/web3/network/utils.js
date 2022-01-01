import { getPoolConfigWithAddress } from "../poolConfig";
import { NETWORKS } from "./index";

export function getCurrentNetwork() {
    let currentChainId = NETWORKS.BSC_MAINNET.chainId;
    const poolAddress = localStorage.getItem("poolAddress");
    if (poolAddress) {
      const poolConfig = getPoolConfigWithAddress(poolAddress);
      currentChainId = poolConfig["networkConfig"].chainId;
    }
    // const currentChainId = localStorage.getItem("currentChainId") || NETWORKS.BSC_MAINNET.chainId;
    if (currentChainId === NETWORKS.BSC_MAINNET.chainId) {
      return NETWORKS.BSC_MAINNET;
    } else if (currentChainId === NETWORKS.BSC_TESTNET.chainId) {
      return NETWORKS.BSC_TESTNET;
    } else if (currentChainId === NETWORKS.FTM_MAINNET.chainId) {
      return NETWORKS.FTM_MAINNET;
    } else if (currentChainId === NETWORKS.FTM_TESTNET.chainId) {
      return NETWORKS.FTM_TESTNET;
    } else {
      throw Error("Invalid Network!");
    }
  }
  
  export function getAxiosPrefix() {
    let currentChainId = NETWORKS.BSC_MAINNET.chainId;
    const poolAddress = localStorage.getItem("poolAddress");
    if (poolAddress) {
      const poolConfig = getPoolConfigWithAddress(poolAddress);
      currentChainId = poolConfig["networkConfig"].chainId;
    }
    // const currentChainId = localStorage.getItem("currentChainId") || NETWORKS.BSC_MAINNET.chainId;
    if (currentChainId === NETWORKS.BSC_MAINNET.chainId) {
      return "bsc/mainnet";
    } else if (currentChainId === NETWORKS.BSC_TESTNET.chainId) {
      return "bsc/testnet";
    } else if (currentChainId === NETWORKS.FTM_MAINNET.chainId) {
      return "ftm/mainnet";
    } else if (currentChainId === NETWORKS.FTM_TESTNET.chainId) {
      return "ftm/testnet";
    } else {
      throw Error("Invalid Network!");
    }
  }