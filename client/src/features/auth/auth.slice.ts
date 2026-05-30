import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { authState } from "./auth.types";
import { assignRole, login, logout, me, removeRole, signup, updateProfile } from "./auth.reducer";

const initialState: authState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    err: null
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isAuthenticated = true
            })
            .addCase(signup.fulfilled, (state) => {
                state.isAuthenticated = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(me.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.isAuthenticated = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(assignRole.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(removeRole.fulfilled, (state, action) => {
                state.user = action.payload.user
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
    },
});


export default AuthSlice.reducer;