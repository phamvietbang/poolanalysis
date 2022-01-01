import { NETWORKS } from "./network";
import BSC from "../assets/icons/tokens/BSC.svg";
import FTM from "../assets/icons/tokens/FTM.svg";

export const BscMainnetPoolConfig = [
  {
    address: "0x75DE5f7c91a89C16714017c7443eca20C7a8c295",
    name: "BSC Lending Pool",
  },
];

export const BscTestnetPoolConfig = [
  {
    address: "0x24bb42dCe65d85AC8F197DcA093F85BcBbab4c9f",
    name: "BSC Testnet Credit Score Lending Pool",
    creditScoreAddress: "0x0b8833D803a02d70BE185B9b17d58A82F6aA3481",
  },
];

export const FtmMainnetPoolConfig = [
  {
    address: "0xD98bb590BdfAbf18c164056C185fbB6BE5ee643F",
    name: "FTM Lending Pool",
  },
];

export const FtmTestnetPoolConfig = [
  {
    address: "0xcA05f79848517D3F7E89f2D2c1b513a8953a1682",
    name: "FTM Testnet Normal Lending Pool",
  },
];

export const NetworkPoolConfig = [
  {
    name: "Bsc Pools",
    icon: BSC,
    network: NETWORKS.BSC_MAINNET,
    pools: BscMainnetPoolConfig,
  },
  // {
  //   name: "Bsc Testnet Pools",
  //   icon: BSC,
  //   network: NETWORKS.BSC_TESTNET,
  //   pools: BscTestnetPoolConfig,
  // },
  {
    name: "Ftm Pools",
    icon: FTM,
    network: NETWORKS.FTM_MAINNET,
    pools: FtmMainnetPoolConfig,
  },
];

export function getPoolConfigWithAddress(poolAddress) {
  for (var index in NetworkPoolConfig) {
    const networkConfig = NetworkPoolConfig[index];
    for (var poolIndex in networkConfig["pools"]) {
      const poolConfig = networkConfig["pools"][poolIndex];
      if (poolConfig["address"].trim() === poolAddress.trim())
        return {
          networkName: networkConfig["name"],
          networkIcon: networkConfig["icon"],
          networkConfig: networkConfig["network"],
          ...poolConfig,
        };
    }
  }
  return null;
}

export function getPoolConfig(domainPoolAddress) {
  let poolAddress = domainPoolAddress || localStorage.getItem("poolAddress");
  if (poolAddress === null || poolAddress === undefined) {
    const currentChainId = localStorage.getItem("currentChainId") || NETWORKS.BSC_MAINNET.chainId;
    let config = {};
    if (currentChainId === NETWORKS.BSC_MAINNET.chainId) config = NetworkPoolConfig[0];
    else if (currentChainId === NETWORKS.BSC_TESTNET.chainId) config = NetworkPoolConfig[1];
    else if (currentChainId === NETWORKS.FTM_MAINNET) config = NetworkPoolConfig[2];
    else if (currentChainId === NETWORKS.FTM_TESTNET) config = NetworkPoolConfig[3];
    return {
      networkName: config["name"],
      networkIcon: config["icon"],
      networkConfig: config["network"],
      ...config["pools"][0],
    };
  }
  return getPoolConfigWithAddress(poolAddress);
}
