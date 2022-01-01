import { createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import AaveOracle from "../../web3/artifacts/contracts/misc/AaveOracle.sol/AaveOracle.json";
import StakedIncentivesController from "../../web3/artifacts/contracts/protocol/incentives/StakedTokenIncentivesController.sol/StakedTokenIncentivesController.json";
import LendingPool from "../../web3/artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json";
import TToken from "../../web3/artifacts/contracts/protocol/tokenization/TToken.sol/TToken.json";
import VariableDebtToken from "../../web3/artifacts/contracts/protocol/tokenization/VariableDebtToken.sol/VariableDebtToken.json";
import { ONE_RAY, SOLIDITY_MAX_INT } from "../../constance";
import { ERR_TOP_CENTER } from "../../utils/snackbar-utils";
import { getAssetInfo } from "../../web3/asset";
import { web3Reader } from "../../web3/wallet";
import { FS } from "../other/constance";
import { fetchTokensPrice } from "../pools/price";

export const fetchAccountPool = (accountAddress, poolAddress, enqueueSnackbar) => async (dispatch, getState) => {
  const { AAVE_ORACLE_ADDRESS } = getState().configSlice.addresses;

  dispatch(startFetchAccountPool());
  try {
    const accountPoolInfo = await fetchAccountPoolInfo(accountAddress, poolAddress, AAVE_ORACLE_ADDRESS);
    dispatch(fetchAccountPoolSuccess(accountPoolInfo));
  } catch (error) {
    console.error(error);
    enqueueSnackbar(JSON.stringify(error.message), ERR_TOP_CENTER);
    dispatch(fetchAccountPoolFail());
  }
};

export async function fetchAccountPoolInfo(accountAddress, poolAddress, AAVE_ORACLE_ADDRESS) {
  const lendingPoolContract = new web3Reader.eth.Contract(LendingPool.abi, poolAddress);
  const assetsAddress = await lendingPoolContract.methods.getReservesList().call();
  const assetsInfo = await Promise.all(
    assetsAddress.map((assetAddress) => lendingPoolContract.methods.getReserveData(assetAddress).call())
  );

  // price
  const aaveOraclePriceContract = new web3Reader.eth.Contract(AaveOracle.abi, AAVE_ORACLE_ADDRESS);
  const assetsPricePromise = assetsAddress.map(async (assetAddress) => {
    const rawAssetPrice = await aaveOraclePriceContract.methods.getAssetPrice(assetAddress).call();
    return rawAssetPrice / 1e8;
  });
  const assetsPrice = await Promise.all(assetsPricePromise);

  // deposit
  const tTokensBalancePromise = assetsInfo.map(async (assetInfo, index) => {
    const decimals = getAssetInfo(assetsAddress[index]).reserveDecimals;
    const rawTTokenBalance = await new web3Reader.eth.Contract(TToken.abi, assetInfo.tTokenAddress).methods
      .balanceOf(accountAddress)
      .call();
    return new BigNumber(rawTTokenBalance).dividedBy(decimals).toNumber() * assetsPrice[index];
  });

  // borrow
  const debtTokenBalancePromise = assetsInfo.map(async (assetInfo, index) => {
    const decimals = getAssetInfo(assetsAddress[index]).reserveDecimals;
    const rawTotalBorrow = await new web3Reader.eth.Contract(
      VariableDebtToken.abi,
      assetInfo.variableDebtTokenAddress
    ).methods
      .balanceOf(accountAddress)
      .call();
    return new BigNumber(rawTotalBorrow).dividedBy(decimals).toNumber() * assetsPrice[index];
  });

  const tTokensBalance = await Promise.all(tTokensBalancePromise);
  const deposited = tTokensBalance.reduce((a, b) => a + b, 0);

  const debtTokenBalance = await Promise.all(debtTokenBalancePromise);
  const borrowed = debtTokenBalance.reduce((a, b) => a + b, 0);

  // interest rate
  const assetsDepositRate = assetsInfo.map((assetInfo, index) => assetInfo[3] / ONE_RAY);
  const assetsBorrowRate = assetsInfo.map((assetInfo, index) => assetInfo[4] / ONE_RAY);

  const myInterestValue = assetsInfo.map(
    (_, index) => tTokensBalance[index] * assetsDepositRate[index] - debtTokenBalance[index] * assetsBorrowRate[index]
  );
  let myInterest = myInterestValue.reduce((accum, item) => accum + item, 0);

  // reward
  let userUnclaimReward;
  let rewardAPY;
  if (assetsInfo.length > 0) {
    const tTokenContract = new web3Reader.eth.Contract(TToken.abi, assetsInfo[0].tTokenAddress);
    const incentiveControllerAddress = await tTokenContract.methods.getIncentivesController().call();
    if (incentiveControllerAddress !== "0x0000000000000000000000000000000000000000") {
      const ttokensAddress = assetsInfo.map((assetInfo) => assetInfo.tTokenAddress);
      const debtTokensAddress = assetsInfo.map((assetInfo) => assetInfo.variableDebtTokenAddress);
      const stakedIncentivesController = new web3Reader.eth.Contract(
        StakedIncentivesController.abi,
        incentiveControllerAddress
      );
      userUnclaimReward =
        (await stakedIncentivesController.methods
          .getRewardsBalance([...ttokensAddress, ...debtTokensAddress], accountAddress)
          .call()) / 1e18;
      const tokensPrice = await fetchTokensPrice();
      const travaPrice = tokensPrice["trava"];
      rewardAPY = ((userUnclaimReward * travaPrice) / deposited) * 5200;
    }
  }

  // params
  const userData = await lendingPoolContract.methods.getUserAccountData(accountAddress).call();
  let healthFactor = `userData`.healthFactor !== SOLIDITY_MAX_INT ? userData.healthFactor / 1e18 : null;
  const availableBorrowsUSD = userData.availableBorrowsUSD / 1e8;
  const totalCollateralUSD = userData.totalCollateralUSD / 1e8;
  const totalDebtUSD = userData.totalDebtUSD / 1e8;
  const ltv = userData.ltv / 1e4;
  const currentLiquidationThreshold = userData.currentLiquidationThreshold / 1e4;

  return {
    assetsAddress,
    assetsInfo,
    assetsPrice,
    deposited,
    borrowed,
    myInterest,
    userUnclaimReward,
    rewardAPY,
    healthFactor,
    availableBorrowsUSD,
    totalCollateralUSD,
    totalDebtUSD,
    ltv,
    currentLiquidationThreshold,
  };
}

const initState = {
  fetchingStatus: FS.INITIAL,
  deposited: undefined,
  borrowed: undefined,
  myInterest: undefined,
  userUnclaimReward: undefined,
  rewardAPY: undefined,
  healthFactor: undefined,
  availableBorrowsUSD: undefined,
  totalCollateralUSD: undefined,
  totalDebtUSD: undefined,
  ltv: undefined,
  currentLiquidationThreshold: undefined,
};

const accountPoolSlice = createSlice({
  name: "accountPoolSlice",
  initialState: initState,
  reducers: {
    startFetchAccountPool: (state, action) => {
      state.fetchingStatus = FS.FETCHING;
    },
    fetchAccountPoolSuccess: (state, action) => {
      Object.assign(state, action.payload);
      state.fetchingStatus = FS.SUCCESS;
    },
    fetchAccountPoolFail: (state, action) => {
      state.fetchingStatus = FS.FAIL;
    },
    resetAccountPoolState: (state, action) => {
      Object.assign(state, initState);
    },
  },
});

export default accountPoolSlice.reducer;
export const { fetchAccountPoolSuccess, startFetchAccountPool, fetchAccountPoolFail, resetAccountPoolState } =
  accountPoolSlice.actions;
