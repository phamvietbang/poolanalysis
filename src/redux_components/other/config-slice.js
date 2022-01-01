import { createSlice } from "@reduxjs/toolkit";
import FactoryRegistry from "../../web3/artifacts/contracts/protocol/factory/FactoryRegistry.sol/FactoryRegistry.json";
import { getPoolConfig, getPoolConfigWithAddress } from "../../web3/poolConfig";
import { ERR_TOP_CENTER } from "../../utils/snackbar-utils";
import { getCurrentContractAddresses } from "../../web3/address";
import { getCurrentAssets } from "../../web3/asset";
import { getCurrentNetwork } from "../../web3/network";
import { initWeb3Reader, web3Reader } from "../../web3/wallet";
import { FS } from "./constance";

const RESPONSE_TIME_LOWER_BOUND = 1250;

export const fetchConfig = (poolAddress, enqueueSnackbar) => async (dp, getState) => {
  try {
    dp(startFetchConfig());
    const network = getCurrentNetwork();
    const addresses = getCurrentContractAddresses();
    const assets = getCurrentAssets();
    let poolConfig = null;
    if (poolAddress === null) poolConfig = getPoolConfig();
    else poolConfig = getPoolConfigWithAddress(poolAddress);
    const hardCodePoolAddress = poolConfig["address"];
    const poolName = poolConfig["name"];
    window.localStorage.setItem("poolAddress", hardCodePoolAddress);
    window.localStorage.setItem("currentChainId", poolConfig["networkConfig"].chainId);
    const creditScoreAddress = poolConfig["creditScoreAddress"];

    const start = Date.now();
    await initWeb3Reader();
    const factoriesAddress = await fetchFactoriesAddress(addresses.FACTOR_REGISTRY_ADDRESS);
    const end = Date.now();
    const delta = end - start;

    if (delta < RESPONSE_TIME_LOWER_BOUND) {
      setTimeout(() => {
        dp(
          fetchConfigSuccess({
            factoriesAddress,
            network,
            addresses,
            assets,
            hardCodePoolAddress,
            creditScoreAddress,
            poolName,
          })
        );
      }, RESPONSE_TIME_LOWER_BOUND - delta);
    } else {
      dp(
        fetchConfigSuccess({
          factoriesAddress,
          network,
          addresses,
          assets,
          hardCodePoolAddress,
          creditScoreAddress,
          poolName,
        })
      );
    }
  } catch (error) {
    console.error(error);
    dp(fetchConfigFail());
    enqueueSnackbar(JSON.stringify(error.message), ERR_TOP_CENTER);
  }
};

async function fetchFactoriesAddress(factoryRegistryAddress) {
  const factoryRegistryContract = new web3Reader.eth.Contract(FactoryRegistry.abi, factoryRegistryAddress);
  const addressesProviderFactoryAddress = await factoryRegistryContract.methods.getAddressesProviderFactory().call();
  const interestRateStrategyFactoryAddress = await factoryRegistryContract.methods.getInterestRateFactory().call();

  return {
    addressesProviderFactoryAddress,
    interestRateStrategyFactoryAddress,
  };
}

const configSlice = createSlice({
  name: "configSlice",
  initialState: {
    fetchingStatus: FS.INITIAL,
    factoriesAddress: null,
    network: null,
    addresses: null,
    assets: null,
    hardCodePoolAddress: null,
    creditScoreAddress: null,
    poolName: null,
  },
  reducers: {
    startFetchConfig: (state, action) => {
      state.fetchingStatus = FS.FETCHING;
    },
    fetchConfigSuccess: (state, action) => {
      Object.assign(state, action.payload);
      state.fetchingStatus = FS.SUCCESS;
    },
    fetchConfigFail: (state, action) => {
      state.fetchingStatus = FS.FAIL;
    },
  },
});

export default configSlice.reducer;
export const { fetchConfigSuccess, startFetchConfig, fetchConfigFail } = configSlice.actions;
