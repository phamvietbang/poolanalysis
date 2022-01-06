import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";

const initialState = {
    isLoading: false,
    errorMessage: '',
    countUsers: {},
    users: {},
    topDepositsA:{},
    topDepositsT:{},
    clusteringUsers:{}
}

export const clusteringUsersData = createAsyncThunk(
    "allUsers/clustering_users",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'lending':state_.layout.lendingpool,
            },
        }
        let result = await client.get('/stats/deposit_tvl/trava_pool/wallet',config)
        let deposit = result.data.deposit
        let tvl = result.data.tvl
        let amount = ['<1000', '1000-5000', '5000-10000', '10000-15000','15000-20000', '>20000'] 
        let cluster_tvl = [0,0,0,0,0,0]
        let cluster_deposit = [0,0,0,0,0,0]
        for(var i in tvl){
            if (tvl[i]<1000){
                cluster_tvl[0]+=1
            }else if(tvl[i]>=1000 && tvl[i]<5000){
                cluster_tvl[1]+=1
            }else if(tvl[i]>=5000 && tvl[i]<10000){
                cluster_tvl[2]+=1
            }else if(tvl[i]>=10000 && tvl[i]<15000){
                cluster_tvl[3]+=1
            }else if(tvl[i]>15000 && tvl[i]<20000){
                cluster_tvl[4]+=1
            }else{
                cluster_tvl[5]+=1
            }
            if (deposit[i]<1000){
                cluster_deposit[0]+=1
            }else if(deposit[i]>=1000 && deposit[i]<5000){
                cluster_deposit[1]+=1
            }else if(deposit[i]>=5000 && deposit[i]<10000){
                cluster_deposit[2]+=1
            }else if(deposit[i]>=10000 && deposit[i]<15000){
                cluster_deposit[3]+=1
            }else if(deposit[i]>15000 && deposit[i]<20000){
                cluster_deposit[4]+=1
            }else{
                cluster_deposit[5]+=1
            }
        }
        result = {
            'amount':amount,
            'deposit':cluster_deposit,
            'tvl':cluster_tvl
        }
        // console.log(result)
        return result
    }
)
    


export const countUsersData = createAsyncThunk(
    "allUsers/count_users",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        // let now = Math.floor(Date.now()/1000)
        let now = 1639432800
        let config = {
            params: {
                'timestamp': now,
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
        // let now = Math.floor(Date.now()/1000)
        let now = 1639432800
        let config = {
            params: {
                'start_timestamp': now-3600*24*30,
                'end_timestamp': now,
                'lending':state_.layout.lendingpool,
                'type': "totalNumberOfActiveUserChangeLogs",
            },
        }
        let active = await client.get('/stats/histogram_of_users/trava_pool',config)
        config = {
            params: {
                'start_timestamp': now-3600*24*30,
                'end_timestamp': now,
                'lending':state_.layout.lendingpool,
                'type': "totalNumberOfDepositingOnlyUserChangeLogs",
            },
        }
        let jdeposit = await client.get('/stats/histogram_of_users/trava_pool',config)
        config = {
            params: {
                'start_timestamp': now-3600*24*30,
                'end_timestamp': now,
                'lending':state_.layout.lendingpool,
                'type': "totalNumberOfBorrowingUserChangeLogs",
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
        // console.log(result)
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
        });
        builder
        .addCase(clusteringUsersData.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        })
        .addCase(clusteringUsersData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.clusteringUsers = action.payload;
        })
        .addCase(clusteringUsersData.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        })
    }
})
export default countUsers.reducer

