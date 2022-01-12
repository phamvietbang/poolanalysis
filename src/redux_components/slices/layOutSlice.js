import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lendingpool: localStorage.getItem("network") || "ftm",
};

export const lendingPoolSlice = createSlice({
  name: "lendingpool",
  initialState,
  reducers: {
    updateLendingPool(state, action) {
      localStorage.setItem("network", action.payload);
      window.location.reload();
    },
  },
});

export const { updateLendingPool } = lendingPoolSlice.actions;

export default lendingPoolSlice.reducer;
