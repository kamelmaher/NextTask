import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryState } from "./category.types";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.reducer";

const initialState: CategoryState = {
    categories: [],
    loading: false,
    err: null
}
const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload.categories
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload.category)
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.categories = state.categories.map(category => category._id === action.payload.category._id ? action.payload.category : category)
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category._id !== action.payload.category._id)
            })

        builder.addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                state.err = null;
            }
        );

        builder.addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.err = action.payload;
            }
        );

        builder.addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state) => {
                state.loading = false;
            }
        )
    }
})

export default CategorySlice.reducer