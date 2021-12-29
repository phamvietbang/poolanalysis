import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";

const initialState = {
    isLoading: false,
    errorMessage: '',
    countUsers: {},
    users: {},
    topDepositsA:{},
    topDepositsT:{}
}

export const countUsersData = createAsyncThunk(
    "allUsers/count_users",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'timestamp': 1639238430,
                'days': 10,
                'lending':state_.layout.lendingpool,
            },
        }
        let result = await client.get('/stats/number_of_users/trava_pool',config)
        // console.log(result)
        return result.data
    } 
)
export const seriesUsers = createAsyncThunk(
    "allUsers/users",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'start_timestamp': 1636238430,
                'end_timestamp': 1639274475,
                'lending':state_.layout.lendingpool,
                'type': "activeUsers",
            },
        }
        let active = await client.get('/stats/histogram_of_users/trava_pool',config)
        config = {
            params: {
                'start_timestamp': 1636238430,
                'end_timestamp': 1639274475,
                'lending':state_.layout.lendingpool,
                'type': "justDepositUsers",
            },
        }
        let jdeposit = await client.get('/stats/histogram_of_users/trava_pool',config)
        config = {
            params: {
                'start_timestamp': 1636238430,
                'end_timestamp': 1639274475,
                'lending':state_.layout.lendingpool,
                'type': "depositAndBorrowUsers",
            },
        }
        let dp = await client.get('/stats/histogram_of_users/trava_pool',config)
        let result = {
            'timestamp':active.data.timestamp,
            'activeUsers': active.data.users,
            'justDeposits': jdeposit.data.users,
            'depositBorrows':dp.data.users
        }
        // console.log(result)
        return result
    }
)

export const topDepositsAmount = createAsyncThunk(
    "allUsers/top_deposits_amount",
    async (top, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'lending':state_.layout.lendingpool,
                'top': top,
            },
        }
        let result = await client.get('/stats/top_deposit/trava_pool',config)
        console.log(result)
        return result.data
    }
)

export const topDepositsTransact = createAsyncThunk(
    "allUsers/top_deposits_transact",
    async (top, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'lending':state_.layout.lendingpool,
                'top': top,
            },
        }
        let result = await client.get('/stats/top_users_transacting/trava_pool',config)
        // console.log(result)
        return result.data
    }
)

const countUsers = createSlice({
    name: 'allUsers',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(countUsersData.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        })
        .addCase(countUsersData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countUsers = action.payload;
        })
        .addCase(countUsersData.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
        builder
        .addCase(seriesUsers.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        })
        .addCase(seriesUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        .addCase(seriesUsers.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
        builder
        .addCase(topDepositsAmount.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        })
        .addCase(topDepositsAmount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.topDepositsA = action.payload;
        })
        .addCase(topDepositsAmount.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
        builder
        .addCase(topDepositsTransact.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        })
        .addCase(topDepositsTransact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.topDepositsT = action.payload;
        })
        .addCase(topDepositsTransact.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        })
    }
})
export default countUsers.reducer

