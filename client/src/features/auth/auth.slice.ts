import { createSlice } from "@reduxjs/toolkit";
import type { authState } from "./auth.types";
import { assignRole, login, logout, me, removeRole, signup, updateProfile } from "./auth.reducer";

const initialState: authState = {
    user: null,
    isAuthenticated: false,

    loading: false,
    updateProfileLoading: false,
    fetchUserLoading: false,

    err: null,
    updateProfileErr: null,
    fetchUserErr: null
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login Reducer
            // pending
            .addCase(login.pending, (state) => {
                state.loading = true
                state.err = null
            })

            // success
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.user = action.payload.user
                state.loading = false
            })

            // rejected
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.err = action.payload as string
            })

            // sign up reducer
            // pending
            .addCase(signup.pending, (state) => {
                state.loading = true
                state.err = null
            })
            // success
            .addCase(signup.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.user = action.payload.user
                state.loading = false
            })
            // rejected
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.err = action.payload as string
            })

            // logout reducer
            // pending
            .addCase(logout.pending, (state) => {
                state.loading = true
                state.err = null
            })
            // success
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.loading = false
            })
            // rejected
            .addCase(logout.rejected, (state, action) => {
                state.err = action.payload as string
                state.loading = false
            })

            // fetch user reducer
            // pending
            .addCase(me.pending, (state) => {
                state.fetchUserLoading = true
                state.fetchUserErr = null
            })
            // success
            .addCase(me.fulfilled, (state, action) => {
                state.fetchUserLoading = false
                state.user = action.payload.user
                state.isAuthenticated = true
            })
            // rejected
            .addCase(me.rejected, (state, action) => {
                state.fetchUserLoading = false
                state.fetchUserErr = action.payload as string
            })

            // updateProfile reducer
            // pending
            .addCase(updateProfile.pending, (state) => {
                state.updateProfileLoading = true
                state.updateProfileErr = null
            })
            // success
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.updateProfileLoading = false
            })
            // rejected
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateProfileLoading = false
                state.updateProfileErr = action.payload as string
            })

            // assign Role Reducers
            // pending
            .addCase(assignRole.pending, (state) => {
                state.updateProfileLoading = true
                state.updateProfileErr = null
            })
            .addCase(removeRole.pending, (state) => {
                state.updateProfileLoading = true
                state.updateProfileErr = null
            })
            // success
            .addCase(assignRole.fulfilled, (state, action) => {
                state.updateProfileLoading = false
                state.user = action.payload.user
            })
            .addCase(removeRole.fulfilled, (state, action) => {
                state.updateProfileLoading = false
                state.user = action.payload.user
            })
            // rejected
            .addCase(assignRole.rejected, (state, action) => {
                state.updateProfileErr = action.payload as string
                state.updateProfileLoading = false
            })
            .addCase(removeRole.rejected, (state, action) => {
                state.updateProfileErr = action.payload as string
                state.updateProfileLoading = false
            })
    },
});


export default AuthSlice.reducer;