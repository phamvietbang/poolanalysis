import { createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { ERR_TOP_CENTER } from "../../utils/snackbar-utils";
import AaveOracle from "../../web3/artifacts/contracts/misc/AaveOracle.sol/AaveOracle.json";
import AddressesProviderFactory from "../../web3/artifacts/contracts/protocol/factory/AddressesProviderFactory.sol/AddressesProviderFactory.json";
import StakedIncentivesController from "../../web3/artifacts/contracts/protocol/incentives/StakedTokenIncentivesController.sol/StakedTokenIncentivesController.json";
import LendingPool from "../../web3/artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json";
import TToken from "../../web3/artifacts/contracts/protocol/tokenization/TToken.sol/TToken.json";
import VariableDebtToken from "../../web3/artifacts/contracts/protocol/tokenization/VariableDebtToken.sol/VariableDebtToken.json";
import { ONE_RAY } from "../../constance";
import { getAssetInfo } from "../../web3/asset";
import { web3Reader } from "../../web3/wallet";
import { FS } from "../other/constance";
import { fetchTokensPrice } from "../pools/price";

export const fetchAccountPools = (enqueueSnackbar) => async (dp, getState) => {
  const { AAVE_ORACLE_ADDRESS, STAKED_TOKEN_INCENTIVES_CONTROLLER_ADDRESS } = getState().configSlice.addresses;

  const ASSETS = getState().configSlice.assets;
  const factoriesAddress = getState().configSlice.factoriesAddress;
  const accountAddress = getState().accountSlice.address;
  const fetchingStatus = getState().accountPoolsSlice.fetchingStatus;

  try {
    if (fetchingStatus === FS.INITIAL) dp(startFetchAccountPools());
    const addressesProviderFactory = new web3Reader.eth.Contract(
      AddressesProviderFactory.abi,
      factoriesAddress.addressesProviderFactoryAddress
    );
    const providerIds = await addressesProviderFactory.methods.getAllPools().call();
    const lendingPoolsAddress = await fetchLendingPoolsAddressByProviderIds(providerIds, getState, true);

    const result = lendingPoolsAddress.map(async (lendingPoolAddress, index) => {
      const lendingPoolContract = new web3Reader.eth.Contract(LendingPool.abi, lendingPoolAddress);
      const reservesAddress = await lendingPoolContract.methods.getReservesList().call();
      const reservesInfoPromise = reservesAddress.map((reserveAddress) =>
        lendingPoolContract.methods.getReserveData(reserveAddress).call()
      );
      const reservesInfo = await Promise.all(reservesInfoPromise);

      // rate
      const assetsDepositRate = reservesInfo.map((reserveInfo) => reserveInfo[3] / ONE_RAY);
      const assetsBorrowRate = reservesInfo.map((reserveInfo) => reserveInfo[4] / ONE_RAY);

      // price
      const aaveOraclePriceContract = new web3Reader.eth.Contract(AaveOracle.abi, AAVE_ORACLE_ADDRESS);
      const reservesPricePromise = reservesAddress.map((reserveAddress) =>
        aaveOraclePriceContract.methods.getAssetPrice(reserveAddress).call()
      );
      const reservesPrice = (await Promise.all(reservesPricePromise)).map((reservePrice) => Number(reservePrice / 1e8));

      // supply
      const myAssetsSupplyPromise = reservesInfo.map(async (reserveInfo, index) => {
        const decimals = getAssetInfo(reservesAddress[index])["reserveDecimals"];
        const tTokenContract = new web3Reader.eth.Contract(TToken.abi, reserveInfo.tTokenAddress);
        const tTokenBalance = await tTokenContract.methods.balanceOf(accountAddress).call();
        return (tTokenBalance * reservesPrice[index]) / decimals;
      });

      // borrow
      const myAssetsBorrowPromise = reservesInfo.map(async (reserveInfo, index) => {
        const decimals = getAssetInfo(reservesAddress[index])["reserveDecimals"] || 18;
        const debtTokenContract = new web3Reader.eth.Contract(
          VariableDebtToken.abi,
          reserveInfo.variableDebtTokenAddress
        );
        const debtTokenBalance = await debtTokenContract.methods.balanceOf(accountAddress).call();
        return (debtTokenBalance * reservesPrice[index]) / decimals;
      });

      const myAssetsSupply = await Promise.all(myAssetsSupplyPromise);
      const mySupply = myAssetsSupply.reduce((accum, item) => accum + item, 0);
      const myAssetsBorrow = await Promise.all(myAssetsBorrowPromise);
      const myBorrow = myAssetsBorrow.reduce((accum, item) => accum + item, 0);
      const myLiquidity = mySupply - myBorrow;

      // apr,
      const tokensPrice = await fetchTokensPrice();
      const travaPrice = tokensPrice["trava"];
      const stakedIncentivesController = new web3Reader.eth.Contract(
        StakedIncentivesController.abi,
        STAKED_TOKEN_INCENTIVES_CONTROLLER_ADDRESS
      );
      const tTokensEPSPromise = reservesInfo.map((assetInfo) =>
        stakedIncentivesController.methods.getAssetData(assetInfo.tTokenAddress).call()
      );
      const debtTokensEPSPromise = reservesInfo.map((assetInfo) =>
        stakedIncentivesController.methods.getAssetData(assetInfo.variableDebtTokenAddress).call()
      );
      const tTokensEPS = (await Promise.all(tTokensEPSPromise)).map((arr) => Number(arr[1]) / 1e18);
      const debtTokenEPS = (await Promise.all(debtTokensEPSPromise)).map((arr) => Number(arr[1]) / 1e18);
      const assetsTotalSupplyPromise = reservesInfo.map(async (assetInfo, index) => {
        const decimals = getAssetInfo(reservesAddress[index])["reserveDecimals"];
        const rawTotalSupply = await new web3Reader.eth.Contract(TToken.abi, assetInfo.tTokenAddress).methods
          .totalSupply()
          .call();
        return new BigNumber(rawTotalSupply).dividedBy(decimals).toNumber() * reservesPrice[index];
      });
      const assetsTotalBorrowPromise = reservesInfo.map(async (assetInfo, index) => {
        const decimals = getAssetInfo(reservesAddress[index])["reserveDecimals"];
        const rawTotalBorrow = await new web3Reader.eth.Contract(
          VariableDebtToken.abi,
          assetInfo.variableDebtTokenAddress
        ).methods
          .totalSupply()
          .call();
        return new BigNumber(rawTotalBorrow).dividedBy(decimals).toNumber() * reservesPrice[index];
      });
      const assetsTotalSupply = await Promise.all(assetsTotalSupplyPromise);
      const assetsTotalBorrow = await Promise.all(assetsTotalBorrowPromise);

      const depositAPRs = tTokensEPS.map(
        (tTokenEPS, index) => (travaPrice * tTokenEPS * 365 * 24 * 60 * 60) / assetsTotalSupply[index]
      );

      const borrowAPRs = debtTokenEPS.map(
        (debtTokenEPS, index) => (travaPrice * debtTokenEPS * 365 * 24 * 60 * 60) / assetsTotalBorrow[index]
      );

      const statistic = reservesAddress.map((address, index) => {
        const asset = ASSETS.find((asset) => asset.underlyingAddress === address);
        return {
          assetAddress: asset.underlyingAddress,
          code: asset.code,
          imgSrc: asset.imgSrc,
          tTokenAddress: reservesInfo[index].tTokenAddress,
          debTokenAddress: reservesInfo[index].variableDebtTokenAddress,
          deposited: myAssetsSupply[index],
          depositRate: assetsDepositRate[index],
          depositAPR: depositAPRs[index],
          borrowed: myAssetsBorrow[index],
          borrowRate: assetsBorrowRate[index],
          borrowAPR: borrowAPRs[index],
        };
      });

      // interest
      const myInterestValue = reservesInfo.map(
        (_, index) => myAssetsSupply[index] * assetsDepositRate[index] - myAssetsBorrow[index] * assetsBorrowRate[index]
      );
      const myInterest = myInterestValue.reduce((accum, item) => accum + item, 0);

      return {
        poolAddress: lendingPoolAddress,
        statistic,
        // reservesAddress,
        // myAssetsSupply,
        // myAssetsBorrow,
        mySupply,
        myBorrow,
        myInterest,
        myLiquidity,
      };
    });

    const accountPools = (await Promise.allSettled(result))
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    dp(fetchAccountPoolsSuccess({ accountPools }));
  } catch (error) {
    dp(fetchAccountPoolsFail());
    console.error(error);
    enqueueSnackbar(JSON.stringify(error.message), ERR_TOP_CENTER);
  }
};

async function fetchLendingPoolsAddressByProviderIds(providerIds, getState, shouldFilter) {
  try {
    const factoriesAddress = getState().configSlice.factoriesAddress;
    const addressesProviderFactoryContract = new web3Reader.eth.Contract(
      AddressesProviderFactory.abi,
      factoriesAddress.addressesProviderFactoryAddress
    );
    const lendingPoolAddressPromises = providerIds.map((providerId) => {
      return addressesProviderFactoryContract.methods.getLendingPool(Number(providerId)).call();
    });
    let lendingPoolAddresses = await Promise.all(lendingPoolAddressPromises);
    // filter trash
    lendingPoolAddresses = lendingPoolAddresses.filter(
      (lendingPoolAddr) => lendingPoolAddr !== "0x0000000000000000000000000000000000000000"
    );
    // filter pool that does not contain any asset
    if (shouldFilter) {
      const reservesAddressList = await Promise.all(
        lendingPoolAddresses.map(async (lendingPoolAddress) => {
          const lendingPoolContract = new web3Reader.eth.Contract(LendingPool.abi, lendingPoolAddress);
          const reservesAddress = await lendingPoolContract.methods.getReservesList().call();
          return reservesAddress;
        })
      );
      lendingPoolAddresses = lendingPoolAddresses.filter((_, index) => reservesAddressList[index].length >= 2);
    }
    return lendingPoolAddresses;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const initState = {
  fetchingStatus: FS.INITIAL,
  accountPools: [{ myLiquidity: undefined, mySupply: undefined, myBorrow: undefined, myInterest: undefined }],
};

const accountPoolsSlice = createSlice({
  name: "accountPoolsSlice",
  initialState: initState,
  reducers: {
    startFetchAccountPools: (state, action) => {
      state.fetchingStatus = FS.FETCHING;
    },
    fetchAccountPoolsSuccess: (state, action) => {
      state.accountPools = action.payload.accountPools;
      state.fetchingStatus = FS.SUCCESS;
    },
    fetchAccountPoolsFail: (state, action) => {
      state.fetchingStatus = FS.FAIL;
    },
    resetAccountPoolsState: (state) => {
      Object.assign(state, initState);
    },
  },
});

export default accountPoolsSlice.reducer;
export const { startFetchAccountPools, fetchAccountPoolsSuccess, fetchAccountPoolsFail, resetAccountPoolsState } =
  accountPoolsSlice.actions;
