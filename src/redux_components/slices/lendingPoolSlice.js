import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";

const initialState = {
    isLoading: false,
    errorMessage: '',
    totalValue: {},
    tvlSupply: {},
    tokenName:[],
    tokenAddress:[],
    depositBorrow: {},
}
function createData(token, name,tvl, tvl_p, supply, supply_p) {
    return { token, name,tvl, tvl_p, supply, supply_p };
}
function toFix2Float(number){
    let arr = []
    for(var i in number){
        arr.push(number[i].toFixed(2))
    }
    return arr
}
export const totalValueData = createAsyncThunk(
    "lendingpool/total_borrow",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let now = Math.floor(Date.now()/1000)
        // let now = 1639432800
        let config = {
            params: {
                'start_timestamp': now-3600*24*30,
                'end_timestamp': now,
                'lending': state_.layout.lendingpool
            },
        }
        const total_value = await client.get('/stats/total_value_by_time', config)
        const timestamp = total_value.data.timestamp
        const borrowInUSD = toFix2Float(total_value.data.totalBorrow)
        const supplyInUSD = toFix2Float(total_value.data.totalSupply)
        const tvl = []
        for (var i in supplyInUSD) {
            tvl.push(supplyInUSD[i] - borrowInUSD[i])
        }
        return { 'timestamp': timestamp, 'supply': supplyInUSD, 'borrow': borrowInUSD, 'tvl': tvl }
    })
export const tvlSupplyTokensData = createAsyncThunk(
    "lendingpool/tvl_tokens",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let now = Math.floor(Date.now()/1000)
        // let now = 1639432800
        let config = {
            params: {
                'lending': state_.layout.lendingpool,
            },
        }
        const total_value = await client.get('/stats/tvl_or_total_supply', config)
        const tokens = total_value.data.token
        const tokens_address = total_value.data.address
        const tvl_value = toFix2Float(total_value.data.tvl)
        const tvl_per = toFix2Float(total_value.data.percentageOfTvl)
        const supply_value = toFix2Float(total_value.data.totalSupply)
        const supply_per = toFix2Float(total_value.data.percentageOfSupply)
        const totalTvlAndSupply = {
            'name': tokens, 'address': tokens_address,
            "tvl_value": tvl_value, 'tvl_per': tvl_per,
            'supply_value': supply_value, 'supply_per': supply_per
        }
        const tvl_supply_tokens = []
        for (var i in totalTvlAndSupply.name) {
            tvl_supply_tokens.push(createData(
                totalTvlAndSupply.address[i],
                totalTvlAndSupply.name[i],
                totalTvlAndSupply.tvl_value[i],
                totalTvlAndSupply.tvl_per[i],
                totalTvlAndSupply.supply_value[i],
                totalTvlAndSupply.supply_per[i],
            ))
        }
        return {tvl_supply_tokens, tokens, tokens_address}
    }
)
export const depositBorrowData = createAsyncThunk(
    "lendingpool/deposit_borrow",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let now = Math.floor(Date.now()/1000)
        // let now = 1639432800
        let config = {
            params: {
                'start_timestamp': now-3600*24*30,
                'end_timestamp': now,
                'lending': state_.layout.lendingpool,
                'type': "deposits",
            },
        }
        let deposit = await client.get('/stats/amount_and_number_of_lending_tx_between_time', config)
        let timestamp = deposit.data.timestamp
        let d_a = toFix2Float(deposit.data.amountOfTx)
        let d_tx = toFix2Float(deposit.data.numberOfTx)
        config = {
            params: {
                'start_timestamp': now-3600*24*30,
                'end_timestamp': now,
                'lending': state_.layout.lendingpool,
                'type': "borrows",
            },
        }
        let borrow = await client.get('/stats/amount_and_number_of_lending_tx_between_time', config)
        let b_a = toFix2Float(borrow.data.amountOfTx)
        let b_tx = toFix2Float(borrow.data.numberOfTx)
        const result = {
            'timestamp':timestamp,
            'deposit_amount':d_a,
            'deposit_tx':d_tx,
            'borrow_amount':b_a,
            'borrow_tx':b_tx
        }
        return result
    }
)

const lendingPoolSlice = createSlice({
    name: 'lendingpool',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(totalValueData.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(totalValueData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalValue = action.payload;
            })
            .addCase(totalValueData.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });
        builder
            .addCase(depositBorrowData.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(depositBorrowData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.depositBorrow = action.payload;
            })
            .addCase(depositBorrowData.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });
        builder
            .addCase(tvlSupplyTokensData.pending, (state) => {
                // Bật trạng thái loading
                state.isLoading = true;
            })
            .addCase(tvlSupplyTokensData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tvlSupply = action.payload.tvl_supply_tokens
                state.tokenName = action.payload.tokens
                state.tokenAddress = action.payload.tokens_address
            })
            .addCase(tvlSupplyTokensData.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
                state.errorMessage = action.payload.message;
            });
    }
})
export default lendingPoolSlice.reducer