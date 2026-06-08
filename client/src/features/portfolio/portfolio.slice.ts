import { createSlice } from "@reduxjs/toolkit"
import type { PortfolioState } from "./portfolio.types"
import { createPortfolioItem, getPortfolioItem, getPortfolioItems, updatePortfolioItem, deletePortfolioItem } from "./portfolio.reducer"

const initialState: PortfolioState = {
    items: [],
    item: null,
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null,
    createError: null,
    updateError: null,
    deleteError: null,
}
export const PortfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPortfolioItem.pending, (state) => {
                state.createError = null
                state.createLoading = true
            })
            .addCase(createPortfolioItem.fulfilled, (state, action) => {
                state.items.push(action.payload.portfolioItem)
                state.createLoading = false
            })
            .addCase(createPortfolioItem.rejected, (state, action) => {
                state.createError = action.payload as string
                state.createLoading = false
            })

            .addCase(getPortfolioItems.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(getPortfolioItems.fulfilled, (state, action) => {
                state.items = action.payload.portfolioItems
                state.loading = false
            })
            .addCase(getPortfolioItems.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })

            .addCase(getPortfolioItem.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(getPortfolioItem.fulfilled, (state, action) => {
                state.item = action.payload.portfolioItem
                state.loading = false
            })
            .addCase(getPortfolioItem.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })

            .addCase(updatePortfolioItem.pending, (state) => {
                state.updateError = null
                state.updateLoading = true
            })
            .addCase(updatePortfolioItem.fulfilled, (state, action) => {
                const updated = action.payload.portfolioItem
                state.item = updated
                state.items = state.items.map((item) => item._id === updated._id ? updated : item)
                state.updateLoading = false
            })
            .addCase(updatePortfolioItem.rejected, (state, action) => {
                state.updateError = action.payload as string
                state.updateLoading = false
            })

            .addCase(deletePortfolioItem.pending, (state) => {
                state.deleteError = null
                state.deleteLoading = true
            })
            .addCase(deletePortfolioItem.fulfilled, (state, action) => {
                const deletedId = action.meta.arg
                state.item = null
                state.items = state.items.filter((item) => item._id !== deletedId)
                state.deleteLoading = false
            })
            .addCase(deletePortfolioItem.rejected, (state, action) => {
                state.deleteError = action.payload as string
                state.deleteLoading = false
            })

    }
})

export default PortfolioSlice.reducer