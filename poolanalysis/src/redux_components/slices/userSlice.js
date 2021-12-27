import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";


const initialState = {
    totalValue: {},
    value:{}
}

export const totalValueOfUser = createAsyncThunk(
    "user/total_value",
    async (wallet, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'wallet': wallet,
                'lending_pool': state_.layout.lendingpool,
                'tx_type': "deposits",
            },
        }
        let deposit = await client.get('/stats/total_value/trava_pool/wallet', config)
        config = {
            params: {
                'wallet': wallet,
                'lending_pool': state_.layout.lendingpool,
                'tx_type': "borrows",
            },
        }
        let borrow = client.get('/stats/total_value/trava_pool/wallet', config)
        config = {
            params: {
                'wallet': wallet,
                'lending_pool': state_.layout.lendingpool,
                'tx_type': "withdraw",
            },
        }
        let withdraw = await client.get('/stats/total_value/trava_pool/wallet', config)
        let result = {
            'deposit': deposit.data.totalAmountOfDepositInUSD,
            'borrow':borrow.data.totalAmountOfBorrowInUSD,
            'withdraw':withdraw.data.totalAmountOfWithdrawInUSD
        }
        return result
    }
)

export const valueOfUser = createAsyncThunk(
    "user/value",
    async ({wallet, type}, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'start_timestamp': 1630804928,
                'end_timestamp': 1631816374,
                'wallet': wallet,
                'lending_pool': state_.layout.lendingpool,
                'tx_type': type,
            },
        }
        let result = await client.get('/stats/value/trava_pool/wallet', config)
        return result.data
        
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
    }

}
)

export default userSlice.reducer