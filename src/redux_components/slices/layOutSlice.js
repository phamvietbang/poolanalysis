import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "./../../services/requests";
const initialState = {
  isLoading: false,
  errorMessage: '',
  lendingpool: localStorage.getItem("network") || "ftm",
  admin: {
    'address': '',
    'timestamp': 0
  }
};
export const getAmin = createAsyncThunk(
  "lendingpool/amin",
  async (address, thunkAPI) => {
    let state_ = thunkAPI.getState()
    let config = {
      params: {
        'address': address,
        'timestamp': Math.floor(Date.now() / 1000)
      }
    }
    let result = await client.get('/timestamp_admin/wallet', config)
    return result.data
  }
)
export const lendingPoolSlice = createSlice({
  name: "lendingpool",
  initialState,
  reducers: {
    updateLendingPool(state, action) {
      localStorage.setItem("network", action.payload);
      window.location.reload();
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(getAmin.pending, (state) => {
        // Bật trạng thái loading
        state.isLoading = true;
      })
      .addCase(getAmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
      })
      .addCase(getAmin.rejected, (state, action) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
  }
});

export const { updateLendingPool } = lendingPoolSlice.actions;

export default lendingPoolSlice.reducer;
