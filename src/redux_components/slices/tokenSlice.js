import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";

const initialState = {
  isLoading: false,
  errorMessage: "",
  totalValue: {},
  depositBorrow: {},
  interestRate: {},
};
function toFix2Float(number){
  let arr = []
  for(var i in number){
      arr.push(number[i].toFixed(2))
  }
  return arr
}
export const totalValueTokenData = createAsyncThunk(
  "token/total_borrow",
  async (token, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let now = Math.floor(Date.now() / 1000);
    // let now = 1639432800
    let config = {
      params: {
        start_timestamp: now - 3600 * 24 * 30,
        end_timestamp: now,
        token: token,
        lending: state_.layout.lendingpool,
      },
    };
    const total_value = await client.get(
      "/stats/total_value_by_time/token",
      config
    );
    const timestamp = total_value.data.timestamp;
    const borrowInUSD = total_value.data.totalBorrow;
    const supplyInUSD = total_value.data.totalSupply;
    const tvl = [];
    for (var i in supplyInUSD) {
      if (
        supplyInUSD[i] < borrowInUSD[i] &&
        borrowInUSD[i] - supplyInUSD[i] < 10
      ) {
        tvl.push(0);
        continue;
      }
      tvl.push(supplyInUSD[i] - borrowInUSD[i]);
    }
    return {
      token: token,
      timestamp: timestamp,
      supply: supplyInUSD,
      borrow: borrowInUSD,
      tvl: tvl,
    };
  }
);
export const depositBorrowTokenData = createAsyncThunk(
  "token/deposit_borrow",
  async (token, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let now = Math.floor(Date.now() / 1000);
    // let now = 1639432800
    let config = {
      params: {
        start_timestamp: now - 3600 * 24 * 30,
        end_timestamp: now,
        token: token,
        lending: state_.layout.lendingpool,
        type: "deposit",
      },
    };
    let deposit_amount = await client.get(
      "/stats/amount_of_tx/token",
      config
    );
    let d_a_time = deposit_amount.data.timestamp;
    config = {
      params: {
        start_timestamp: now - 3600 * 24 * 30,
        end_timestamp: now,
        lending: state_.layout.lendingpool,
        token: token,
        type: "deposits",
      },
    };
    let deposit_tx = await client.get(
      "/stats/number_of_tx/token",
      config
    );
    let timestamp = deposit_tx.data.timestamp;
    config = {
      params: {
        start_timestamp: now - 3600 * 24 * 30,
        end_timestamp: now,
        token: token,
        lending: state_.layout.lendingpool,
        type: "borrow",
      },
    };

    let borrow_amount = await client.get(
      "/stats/amount_of_tx/token",
      config
    );
    let b_a_time = borrow_amount.data.timestamp;
    config = {
      params: {
        start_timestamp: now - 3600 * 24 * 30,
        end_timestamp: now,
        token: token,
        lending: state_.layout.lendingpool,
        type: "borrows",
      },
    };
    let borrow_tx = await client.get(
      "/stats/number_of_tx/token",
      config
    );
    let deposit_a = [];
    let borrow_a = [];
    for (var i in timestamp) {
      deposit_a[i] = 0;
      borrow_a[i] = 0;
      for (var j in d_a_time) {
        if (d_a_time[j] < timestamp[i] && d_a_time[j] > timestamp[i - 1]) {
          deposit_a[i] += deposit_amount.data.valueInUSD[j];
        }
      }
      for (var j in b_a_time) {
        if (b_a_time[j] < timestamp[i] && b_a_time[j] >= timestamp[i - 1]) {
          borrow_a[i] += borrow_amount.data.valueInUSD[j];
        }
      }
    }
    const result = {
      timestamp: timestamp,
      deposit_amount: toFix2Float(deposit_a),
      deposit_tx: deposit_tx.data.deposits,
      borrow_amount: toFix2Float(borrow_a),
      borrow_tx: borrow_tx.data.borrows,
    };
    return result;
  }
);

export const interestRateTokenData = createAsyncThunk(
  "token/interest_rate",
  async (token, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let now = Math.floor(Date.now() / 1000);
    // let now = 1639432800
    let config = {
      params: {
        start_timestamp: now - 3600 * 24 * 30,
        end_timestamp: now,
        token: token,
        lending: state_.layout.lendingpool,
      },
    };
    let rate = await client.get(
      "/stats/interest_rate/token",
      config
    );
    let result = {
      timestamp: rate.data.timestamp,
      deposit_rate: rate.data.depositRate,
      borrow_rate: rate.data.borrowRate,
      uti_rate: rate.data.utilizationRate,
    };
    return result;
  }
);

const tokenSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(totalValueTokenData.pending, (state) => {
        // Bật trạng thái loading
        state.isLoading = true;
      })
      .addCase(totalValueTokenData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalValue = action.payload;
      })
      .addCase(totalValueTokenData.rejected, (state, action) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
    builder
      .addCase(depositBorrowTokenData.pending, (state) => {
        // Bật trạng thái loading
        state.isLoading = true;
      })
      .addCase(depositBorrowTokenData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.depositBorrow = action.payload;
      })
      .addCase(depositBorrowTokenData.rejected, (state, action) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });

    builder
      .addCase(interestRateTokenData.pending, (state) => {
        // Bật trạng thái loading
        state.isLoading = true;
      })
      .addCase(interestRateTokenData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.interestRate = action.payload;
      })
      .addCase(interestRateTokenData.rejected, (state, action) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export default tokenSlice.reducer;
