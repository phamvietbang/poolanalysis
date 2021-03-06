import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";

const initialState = {
  isLoading: false,
  errorMessage: "",
  countUsers: {},
  users: {},
  topDepositsA: {},
  topDepositsT: {},
  clusteringUsers: {},
};

export const clusteringUsersData = createAsyncThunk(
  "allUsers/clustering_users",
  async (_, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let config = {
      params: {
        lending: state_.layout.lendingpool,
        type:'deposit'
      },
    };
    let result = await client.get(
      "/stats/number_of_users_with_deposit_or_tvl",
      config
    );
    let deposit = result.data;
    config = {
      params: {
        lending: state_.layout.lendingpool,
        type:'tvl'
      },
    };
    result = await client.get(
      "/stats/number_of_users_with_deposit_or_tvl",
      config
    );
    let tvl = result.data;
    let amount = [
      "<1000",
      "1000-5000",
      "5000-10000",
      "10000-15000",
      "15000-20000",
      ">20000",
    ];
    let cluster_deposit = []
    let cluster_tvl = []
    for(var i in amount){
      cluster_deposit.push(deposit[amount[i]])
      cluster_tvl.push(tvl[amount[i]])
    }
    result = {
      amount: amount,
      deposit: cluster_deposit,
      tvl: cluster_tvl,
    };
    return result;
  }
);

export const countUsersData = createAsyncThunk(
  "allUsers/count_users",
  async (_, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let now = Math.floor(Date.now() / 1000);
    let config = {
      params: {
        timestamp: now,
        days: 10,
        lending: state_.layout.lendingpool,
      },
    };
    let result = await client.get("/stats/number_of_users", config);
    return result.data;
  }
);
export const seriesUsers = createAsyncThunk(
  "allUsers/users",
  async (_, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let now = Math.floor(Date.now() / 1000);
    // let now = 1639432800
    let config = {
      params: {
        start_timestamp: now - 3600 * 24 * 30,
        end_timestamp: now,
        lending: state_.layout.lendingpool,
      },
    };
    let user = await client.get(
      "/stats/number_of_users_between_time",
      config
    );
    
    let result = {
      timestamp: user.data.timestamp,
      activeUsers: user.data.activeUsers,
      justDeposits: user.data.depositOnlyUsers,
      depositBorrows: user.data.borrowingUsers,
    };
    return result;
  }
);

export const topDepositsAmount = createAsyncThunk(
  "allUsers/top_deposits_amount",
  async (top, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let config = {
      params: {
        lending: state_.layout.lendingpool,
        top: top,
      },
    };
    let result = await client.get("/stats/top_deposit", config);
    return result.data;
  }
);

export const topDepositsTransact = createAsyncThunk(
  "allUsers/top_deposits_transact",
  async (top, thunkAPI) => {
    let state_ = thunkAPI.getState();
    let config = {
      params: {
        lending: state_.layout.lendingpool,
        top: top,
      },
    };
    let result = await client.get(
      "/stats/top_users_transacting",
      config
    );
    return result.data;
  }
);

const countUsers = createSlice({
  name: "allUsers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(countUsersData.pending, (state) => {
        // B???t tr???ng th??i loading
        state.isLoading = true;
      })
      .addCase(countUsersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countUsers = action.payload;
      })
      .addCase(countUsersData.rejected, (state, action) => {
        // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
    builder
      .addCase(seriesUsers.pending, (state) => {
        // B???t tr???ng th??i loading
        state.isLoading = true;
      })
      .addCase(seriesUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(seriesUsers.rejected, (state, action) => {
        // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
    builder
      .addCase(topDepositsAmount.pending, (state) => {
        // B???t tr???ng th??i loading
        state.isLoading = true;
      })
      .addCase(topDepositsAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topDepositsA = action.payload;
      })
      .addCase(topDepositsAmount.rejected, (state, action) => {
        // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
    builder
      .addCase(topDepositsTransact.pending, (state) => {
        // B???t tr???ng th??i loading
        state.isLoading = true;
      })
      .addCase(topDepositsTransact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topDepositsT = action.payload;
      })
      .addCase(topDepositsTransact.rejected, (state, action) => {
        // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
    builder
      .addCase(clusteringUsersData.pending, (state) => {
        // B???t tr???ng th??i loading
        state.isLoading = true;
      })
      .addCase(clusteringUsersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clusteringUsers = action.payload;
      })
      .addCase(clusteringUsersData.rejected, (state, action) => {
        // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export default countUsers.reducer;
