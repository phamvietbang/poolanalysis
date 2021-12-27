import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lendingpool: localStorage.getItem("network") || "bsc"
};


export const lendingPoolSlice = createSlice({
    name: "lendingpool",
    initialState,
    reducers: {
        updateLendingPool(state, action) {
            // console.log(action) 
            localStorage.setItem("network", action.payload);
            window.location.reload();
        },
    }
});


export const { updateLendingPool } = lendingPoolSlice.actions;

// export const {selectLendingPool} = state => state.lendingPoolSlice.lendingpool;

export default lendingPoolSlice.reducer;