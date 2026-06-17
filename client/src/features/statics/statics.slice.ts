import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./statics.types";
import { getDashboardStatics, getTransactionStatics, getUserStatics } from "./statics.reducer";

const staticsSlice = createSlice({
    name: "statics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserStatics.pending, (state) => {
                state.loading = true
                state.err = null
            })
            .addCase(getUserStatics.fulfilled, (state, action) => {
                state.userStatics = action.payload
                state.loading = false
            })
            .addCase(getUserStatics.rejected, (state, action) => {
                state.loading = false
                state.err = action.payload as string
            })

            .addCase(getDashboardStatics.pending, (state) => {
                state.loading = true
                state.err = null
            })
            .addCase(getDashboardStatics.fulfilled, (state, action) => {
                state.dashboardStatics = action.payload
                state.loading = false
            })
            .addCase(getDashboardStatics.rejected, (state, action) => {
                state.loading = false
                state.err = action.payload as string
            })

            .addCase(getTransactionStatics.pending, (state) => {
                state.loading = true
                state.err = null
            })
            .addCase(getTransactionStatics.fulfilled, (state, action) => {
                state.transactionStatics = action.payload
                state.loading = false
            })
            .addCase(getTransactionStatics.rejected, (state, action) => {
                state.loading = false
                state.err = action.payload as string
            })

    }
})

export default staticsSlice.reducer