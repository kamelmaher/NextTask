import { createSlice } from "@reduxjs/toolkit";
import type { transactionsState } from "./transactions.types";
import { getTransactions } from "./transactions.reducer";

const initialState: transactionsState = {
    loading: false,
    err: null,
    transactions: []
}
const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.loading = true
                state.err = null
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload.transactions
                state.loading = false
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.err = action.payload as string
                state.loading = false
            })
    }
})

export default transactionsSlice.reducer