export function getCurrentNetwork() {
  const currentChainId = localStorage.getItem("currentChainId") || NETWORKS.BSC_MAINNET.chainId;
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
  const currentChainId = localStorage.getItem("currentChainId") || NETWORKS.BSC_MAINNET.chainId;
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

export const NETWORKS = {
  BSC_TESTNET: {
    chainId: "0x61",
    blockExplorerUrls: ["https://testnet.bscscan.com"],
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      // "https://data-seed-prebsc-2-s1.binance.org:8545/",
      // "https://data-seed-prebsc-1-s1.binance.org:8545/",
      // "https://data-seed-prebsc-1-s2.binance.org:8545/",
      // "https://data-seed-prebsc-2-s2.binance.org:8545/",
      // "https://data-seed-prebsc-1-s3.binance.org:8545/",
      // "https://data-seed-prebsc-2-s3.binance.org:8545/",
      "https://speedy-nodes-nyc.moralis.io/163324c01b6f7f5d7a18bfb1/bsc/testnet",
    ],
  },
  BSC_MAINNET: {
    chainId: "0x38",
    blockExplorerUrls: ["https://bscscan.com/"],
    chainName: "BSC Mainnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.binance.org/",
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed2.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
      "https://bsc-dataseed2.ninicoin.io/",
      "https://speedy-nodes-nyc.moralis.io/163324c01b6f7f5d7a18bfb1/bsc/mainnet",
    ],
  },
  FTM_MAINNET: {
    chainId: "0xfa",
    blockExplorerUrls: ["https://ftmscan.com/"],
    chainName: "Fantom Opera",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools/"],
  },
  FTM_TESTNET: {
    chainId: "0xfa2",
    blockExplorerUrls: ["https://testnet.ftmscan.com/"],
    chainName: "Fantom Testnet",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.fantom.network/"],
  },
};
