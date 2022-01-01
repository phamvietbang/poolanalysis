import { ERR_TOP_CENTER } from "../../utils/snackbar-utils";
import { FS } from "../other/constance";
import CreditScore from "../../web3/artifacts/contracts/CreditScore.json";
import { web3Reader } from "../../web3/wallet";
const { createSlice } = require("@reduxjs/toolkit");

export const updateAccInfo = (accountAddress, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch(updateAccountAddress({ accountAddress }));
  dispatch(startFetchAccInfo());

  try {
    const creditScoreAddress = getState().configSlice.creditScoreAddress;
    if (creditScoreAddress !== undefined && creditScoreAddress !== null) {
      const creditScoreCR = new web3Reader.eth.Contract(CreditScore.abi, creditScoreAddress);
      const creditScoreRank = Number(await creditScoreCR.methods.getUserRank(accountAddress).call());
      dispatch(fetchAccInfoSuccess({ creditScoreRank, creditScore: null, transactions: [] }));
    } else dispatch(fetchAccInfoSuccess({ creditScoreRank: null, creditScore: null, transactions: [] }));
    return Promise.resolve({ success: true });
  } catch (error) {
    console.error(error);
    dispatch(fetchAccInfoFail());
    error.response && enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    return Promise.reject(error);
  }
};

const initState = {
  address: null,
  fetchingStatus: FS.INITIAL,
  creditScore: null,
  transactions: [],
  nonce: 0,
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: initState,
  reducers: {
    updateAccountAddress: (state, action) => {
      state.address = action.payload.accountAddress;
      // state.address = "0x395b88a9b4eF8eAC22df39B00348f910f25Ccf02";
    },
    startFetchAccInfo: (state, action) => {
      state.fetchingStatus = FS.FETCHING;
    },
    fetchAccInfoSuccess: (state, action) => {
      Object.assign(state, action.payload);
      state.fetchingStatus = FS.SUCCESS;
    },
    fetchAccInfoFail: (state, action) => {
      state.fetchingStatus = FS.FAIL;
    },
    resetAccountState: (state, action) => {
      Object.assign(state, initState);
    },
    updateNonce: (state, action) => {
      state.nonce = state.nonce + 1;
    },
  },
});

export default accountSlice.reducer;
export const {
  updateAccountAddress,
  resetAccountState,
  fetchAccInfoSuccess,
  startFetchAccInfo,
  fetchAccInfoFail,
  updateNonce,
} = accountSlice.actions;
