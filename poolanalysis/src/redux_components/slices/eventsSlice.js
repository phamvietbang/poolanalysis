import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";


const initialState = {
    isLoading: false,
    errorMessage: '',
    data: [],
    listTokens: []
}
function createData(type, datetime, user, amount, token, transaction) {
    return { type, datetime, user, amount, token, transaction };
}
export const events_data = createAsyncThunk(
    "events/events_data",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let config = {
            params: {
                'start_timestamp': 1632482787,
                'end_timestamp': 1633047296,
                'lending': state_.layout.lendingpool
            },
        }
        const data = await client.get('/stats/events_data/trava_pool', config)
        const event_data = data.data
        const eventData = []
        const coin = []
        coin.push({'name':'None'})
        for (var i = 0; i < event_data.amount.length; i++) {
            eventData.push(createData(event_data.type[i], event_data.datetime[i],
                event_data.user[i], event_data.amount[i], event_data.token[i], event_data.tx_hash[i]))
        }
        let uniqueTokens = [...new Set(event_data.token)];
        for (var i in uniqueTokens) {
            coin.push({ 'name': uniqueTokens[i] })
        }
        // console.log(coin)
        return {eventData, coin}
    }
)


const eventSlice = createSlice({
    name: 'events',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(events_data.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(events_data.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.eventData;
            state.listTokens = action.payload.coin;
        });
        builder.addCase(events_data.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            // state.errorMessage = action.payload.message;
            console.error(action);
        });
    }
})
export default eventSlice.reducer