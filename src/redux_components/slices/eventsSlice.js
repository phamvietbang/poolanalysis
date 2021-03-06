import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";

const initialState = {
    isLoading: false,
    errorMessage: '',
    data: [],
    listTokens: [],
    eventWallet: [],
    countEvent: 0,
}
function createData(type, datetime, user, amount, name, token, transaction) {
    return { type, datetime, user, amount, name, token, transaction };
}
function createDataWallet(type, datetime, user, amount, token, transaction) {
    return { type, datetime, user, amount, token, transaction };
}
export const events_data = createAsyncThunk(
    "events/events_data",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let now = Math.floor(Date.now()/1000)
        // let now = 1639432800
        let config = {
            params: {
                'start_timestamp': now - 24 * 3600 * 7,
                'end_timestamp': now,
                'lending': state_.layout.lendingpool
            },
        }
        const data = await client.get('/stats/events_data', config)
        const event_data = data.data
        const eventData = []
        const coin = []
        coin.push({ 'name': 'None' })
        for (var i = 0; i < event_data.amount.length; i++) {
            eventData.push(createData(event_data.type[i], event_data.datetime[i],
                event_data.user[i], event_data.amount[i], event_data.name[i],event_data.token[i], event_data.tx_hash[i]))
        }
        let uniqueTokens = [...new Set(event_data.name)];
        for (var i in uniqueTokens) {
            coin.push({ 'name': uniqueTokens[i] })
        }
        return { eventData, coin }
    }
)
export const updateCountEvent = createAsyncThunk(
    "events/reset_count",
    async (count, thunkAPI)=>{
        return count
    }
)
export const countEvents = createAsyncThunk(
    "events/count_events",
    async (_, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let now = Math.floor(Date.now()/1000)
        // let now = 1639432800
        let admin = state_.layout.admin
        if (admin['address']==''){
            return 0
        }
        let end = admin['timestamp'] < now - 3600*24 && admin['timestamp']>now - 3600*48? admin['timestamp']:now - 3600*24
        let config = {
            params: {
                'start_timestamp': end,
                'end_timestamp': now,
                'lending': state_.layout.lendingpool
            },
        }
        const data = await client.get('/stats/events_data', config)
        const event_data = data.data
        let eventData = 0
        for (var i = 0; i < event_data.amount.length; i++) {
            if (event_data.amount[i]>10000){
                eventData+=1
            }
        }
        return eventData
    }
)
export const events_data_wallet = createAsyncThunk(
    "events/events_data_wallet",
    async (wallet, thunkAPI) => {
        let state_ = thunkAPI.getState()
        let now = Math.floor(Date.now()/1000)
        // let now = 1639432800
        let config = {
            params: {
                'start_timestamp': now - 24 * 3600 * 30,
                'end_timestamp': now,
                'lending': state_.layout.lendingpool,
                'address': wallet
            },
        }
        const data = await client.get('/stats/events_data/wallet', config)
        const event_data = data.data
        const eventData = []
        for (var i = 0; i < event_data.amount.length; i++) {
            eventData.push(createDataWallet(event_data.type[i], event_data.datetime[i],
                event_data.user[i], event_data.amount[i], event_data.token[i], event_data.tx_hash[i]))
        }
        return eventData
    }
)


const eventSlice = createSlice({
    name: 'events',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(events_data.pending, (state) => {
            // B???t tr???ng th??i loading
            state.isLoading = true;
        });
        builder.addCase(events_data.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.eventData;
            state.listTokens = action.payload.coin;
        });
        builder.addCase(events_data.rejected, (state, action) => {
            // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
            state.isLoading = false;
            // state.errorMessage = action.payload.message;
            console.error(action);
        });
        builder.addCase(events_data_wallet.pending, (state) => {
            // B???t tr???ng th??i loading
            state.isLoading = true;
        });
        builder.addCase(events_data_wallet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.eventWallet = action.payload;
        });
        builder.addCase(events_data_wallet.rejected, (state, action) => {
            // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
            state.isLoading = false;
            // state.errorMessage = action.payload.message;
            console.error(action);
        });
        builder.addCase(countEvents.pending, (state) => {
            // B???t tr???ng th??i loading
            state.isLoading = true;
        });
        builder.addCase(countEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countEvent = action.payload;
        });
        builder.addCase(countEvents.rejected, (state, action) => {
            // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
            state.isLoading = false;
            // state.errorMessage = action.payload.message;
            console.error(action);
        });
        builder.addCase(updateCountEvent.pending, (state) => {
            // B???t tr???ng th??i loading
            state.isLoading = true;
        });
        builder.addCase(updateCountEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countEvent = action.payload;
        });
        builder.addCase(updateCountEvent.rejected, (state, action) => {
            // T???t tr???ng th??i loading, l??u th??ng b??o l???i v??o store
            state.isLoading = false;
            // state.errorMessage = action.payload.message;
            console.error(action);
        });
    }
})
export default eventSlice.reducer