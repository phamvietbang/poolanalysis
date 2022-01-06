import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";


const initialState = {
    totalValue: {},
    value: {},
    tx_amount: {},
    data_token: {},
    series_data_token: {}
}
function createTxData(tx) {
    let result = []
    if (tx.timestamp.length === 0) { return result }
    for (var i in tx.timestamp) {
        result.push([Math.floor(tx.timestamp[i] / 60) * 60 * 1000, tx.valueInUSD[i]])
    }
    return result
}

export const dataToken = createAsyncThunk(
    "user/data_token",
    async (wallet, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'address': wallet,
                'lending': state_.layout.lendingpool
            }
        }
        let result = await client.get('/stats/deposit_borrow_token/trava_pool/wallet', config)
        console.log(result)
        return result.data
    }
)

export const seriesDataToken = createAsyncThunk(
    "user/series_data_token",
    async (data, thunkAPI) => {
        let state_ = thunkAPI.getState()
        // let now = Math.floor(Date.now()/1000)
        let now = 1639432800
        let config = {
            params: {
                'address': data["wallet"],
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'token': data['token'],
                'lending': state_.layout.lendingpool,
                'type': 'borrowTokenChangeLogs'
            }
        }
        let borrow = await client.get('/stats/deposit_borrow_token_by_time/trava_pool/wallet', config)
        config = {
            params: {
                'address': data["wallet"],
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'token': data['token'],
                'lending': state_.layout.lendingpool,
                'type': 'depositTokenChangeLogs'
            }
        }
        let deposit = await client.get('/stats/deposit_borrow_token_by_time/trava_pool/wallet', config)
        let data_deposit = []
        let data_borrow = []
        let de = deposit.data.depositTokenChangeLogs[0]
        let bo = borrow.data.borrowTokenChangeLogs[0]
        for (var i=deposit.data.timestamp[0]; i<=now; i+=3600){
            for (var j in deposit.data.timestamp){
                if(deposit.data.timestamp[j]>=i&&deposit.data.timestamp[j]<=i+3600){
                    de=deposit.data.depositTokenChangeLogs[j]
                }
            }
            for (var j in borrow.data.timestamp){
                if(borrow.data.timestamp[j]>=i&&borrow.data.timestamp[j]<=i+3600){
                    bo=borrow.data.borrowTokenChangeLogs[j]
                }
            }
            data_deposit.push([i*1000, de])
            data_borrow.push([i*1000, bo])
        }
        
        let result = {
            'deposit': data_deposit,
            'borrow': data_borrow
        }
        // console.log(result)
        return result
    }
)

export const totalValueOfUser = createAsyncThunk(
    "user/total_value",
    async (wallet, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'address': wallet,
                'lending': state_.layout.lendingpool,
            },
        }
        let result = await client.get('/stats/total_amount/trava_pool/wallet', config)
        return result.data
    }
)

export const transactionAmount = createAsyncThunk(
    "user/transactions",
    async (wallet, thunkAPI) => {
        let state_ = thunkAPI.getState()
        // let now = Math.floor(Date.now()/1000)
        let now = 1639432800
        let config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'deposits',
            },
        }
        let deposit = await client.get('/stats/value/trava_pool/wallet', config)
        config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'borrows',
            },
        }
        let borrow = await client.get('/stats/value/trava_pool/wallet', config)
        config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'withdraws',
            },
        }
        let withdraw = await client.get('/stats/value/trava_pool/wallet', config)
        config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'repays',
            },
        }
        let repay = await client.get('/stats/value/trava_pool/wallet', config)
        let result = {
            "deposit": createTxData(deposit.data),
            "borrow": createTxData(borrow.data),
            "withdraw": createTxData(withdraw.data),
            "repay": createTxData(repay.data)
        }
        // console.log(result)
        // console.log(deposit)
        return result
    }
)

export const valueOfUser = createAsyncThunk(
    "user/deposit_borrow",
    async (wallet, thunkAPI) => {
        let state_ = thunkAPI.getState()
        // let now = Math.floor(Date.now()/1000)
        let now = 1639432800
        let config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'depositLogs',
            },
        }
        let deposit = await client.get('/stats/total_amount_by_time/trava_pool/wallet', config)
        config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'borrowLogs',
            },
        }
        let borrow = await client.get('/stats/total_amount_by_time/trava_pool/wallet', config)
        config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'liquidationThresholdLogs',
            },
        }
        let lT = await client.get('/stats/total_amount_by_time/trava_pool/wallet', config)
        config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'loanToValueLogs',
            },
        }
        let ltv = await client.get('/stats/total_amount_by_time/trava_pool/wallet', config)
        config = {
            params: {
                'start_timestamp': now-24*3600*30,
                'end_timestamp': now,
                'address': wallet,
                'lending': state_.layout.lendingpool,
                'type': 'healthFactorLogs',
            },
        }
        let hf = await client.get('/stats/total_amount_by_time/trava_pool/wallet', config)
        let result = {
            'timestamp': deposit.data.timestamp,
            'deposit': deposit.data.value,
            'borrow': borrow.data.value,
            'liquidation': lT.data.value,
            'ltv': ltv.data.value,
            'hf': hf.data.value
        }
        // console.log(result)
        return result
    }
)
const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {

        builder
            .addCase(totalValueOfUser.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(totalValueOfUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalValue = action.payload;
            })
            .addCase(totalValueOfUser.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });

        builder
            .addCase(dataToken.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(dataToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data_token = action.payload;
            })
            .addCase(dataToken.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });
        builder
            .addCase(seriesDataToken.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(seriesDataToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.series_data_token = action.payload;
            })
            .addCase(seriesDataToken.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });
        builder
            .addCase(valueOfUser.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(valueOfUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = action.payload;
            })
            .addCase(valueOfUser.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });
        builder
            .addCase(transactionAmount.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(transactionAmount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tx_amount = action.payload;
            })
            .addCase(transactionAmount.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });
    }

}
)

export default userSlice.reducer