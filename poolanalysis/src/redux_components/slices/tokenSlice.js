import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";
// list token: danh sách token
// tvl series: datetime - value
// total supply series: datetime - value
// utilization/deposit rate/borrow rate series: datetime - value
// lượng deposit/ số deposit: datetime - value
// lượng borrow/ số borrow: datetime - value


// thunk functions

const initialState = {
    isLoading: false,
    errorMessage: '',
    totalValue: {},
    depositBorrow: {},
    interestRate: {},
    listTokens:{},
}

export const totalValueTokenData = createAsyncThunk(
    "token/total_borrow",
    async (token, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'start_timestamp': 0,
                'end_timestamp': 1688859641,
                'token': token,
                'dapp': state_.layout.lendingpool,
                'tx_type': "borrows",
            },
        }
        const borrow = await client.get('/stats/total_value_by_time/trava_pool/token', config)
        const timestamp = borrow.data.timestamp
        const borrowInUSD = borrow.data.totalBorrowInUSD
        config = {
            params: {
                'start_timestamp': 0,
                'end_timestamp': 1688859641,
                'token': token,
                'dapp': state_.layout.lendingpool,
                'tx_type': "supply",
            },
        }
        const supply = await client.get('/stats/total_value_by_time/trava_pool/token', config)
        const supplyInUSD = supply.data.totalSupplyInUSD
        const tvl = []
        for(var i in supplyInUSD){
            tvl.push(supplyInUSD[i]-borrowInUSD[i])
        }
        return {'token':token, 'timestamp': timestamp,'supply': supplyInUSD,'borrow': borrowInUSD,'tvl': tvl}
    }
    )
export const depositBorrowTokenData = createAsyncThunk(
    "token/deposit_borrow",
    async (token, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'start_timestamp': 1636642811,
                'end_timestamp': 1639234811,
                'token': token,
                'lending_pool': state_.layout.lendingpool,
                'tx_type': "deposits",
            },
        }
        let deposit_amount = await client.get('/stats/value/trava_pool/token', config)
        let d_a_time = deposit_amount.data.timestamp
        config = {
            params: {
                'start_timestamp': 1636642811,
                'end_timestamp': 1639234811,
                'dapp': state_.layout.lendingpool,
                'token': token,
                'tx_type': "deposits",
            },
        }
        let deposit_tx = await client.get('/stats/number_of_tx/trava_pool/token', config)
        let timestamp =deposit_tx.data.timestamp
        config = {
            params: {
                'start_timestamp': 1636642811,
                'end_timestamp': 1639234811,
                'token': token,
                'lending_pool': state_.layout.lendingpool,
                'tx_type': "borrows",
            },
        }
        let borrow_amount = await client.get('/stats/value/trava_pool/token', config)
        let b_a_time = borrow_amount.data.timestamp
        config = {
            params: {
                'start_timestamp': 1636642811,
                'end_timestamp': 1639234811,
                'token': token,
                'dapp': state_.layout.lendingpool,
                'tx_type': "borrows",
            },
        }
        let borrow_tx = await client.get('/stats/number_of_tx/trava_pool/token', config)
        let deposit_a = []
        let borrow_a = []
        for(var i in timestamp){
            deposit_a[i] = 0
            borrow_a[i] = 0
            for(var j in d_a_time){
                if(d_a_time[j]<timestamp[i] && d_a_time[j]>timestamp[i-1]){
                    deposit_a[i]+=deposit_amount.data.valueInUSD[j]
                }
            }
            for(var j in b_a_time){
                if(b_a_time[j]<timestamp[i] && b_a_time[j]>=timestamp[i-1]){
                    borrow_a[i]+=borrow_amount.data.valueInUSD[j]
                }
            }
        }
        const result = {
            'timestamp':timestamp,
            'deposit_amount':deposit_a,
            'deposit_tx':deposit_tx.data.numberOfDeposits,
            'borrow_amount':borrow_a,
            'borrow_tx':borrow_tx.data.numberOfBorrows
        }
        console.log(result)
        return result
        
    }
)

export const interestRateTokenData = createAsyncThunk(
    "token/interest_rate",
    async (token, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'start_timestamp': 1636642811,
                'end_timestamp': 1639234811,
                'token': token,
                'dapp': state_.layout.lendingpool,
                'type': "deposits",
            },
        }
        let deposit_rate = await client.get('/stats/interest_rate/trava_pool/token', config)
        config = {
            params: {
                'start_timestamp': 1636642811,
                'end_timestamp': 1639234811,
                'token': token,
                'dapp': state_.layout.lendingpool,
                'type': "borrows",
            },
        }
        let borrow_rate = await client.get('/stats/interest_rate/trava_pool/token', config)
        config = {
            params: {
                'start_timestamp': 1636642811,
                'end_timestamp': 1639234811,
                'token': token,
                'dapp': state_.layout.lendingpool,
                'type': "utilization",
            },
        }
        let uti_rate = await client.get('/stats/interest_rate/trava_pool/token', config)
        let result = {
            'timestamp':deposit_rate.data.timestamp,
            'deposit_rate':deposit_rate.data.depositRate,
            'borrow_rate':borrow_rate.data.borrowRate,
            'uti_rate': uti_rate.data.utilizationRate
        }
        console.log(result)
        return result
    }
)

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers:{
        updateListTokens(state, action){
            state.listTokens = action.payload
        }
    },
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
    }
})
export default tokenSlice.reducer