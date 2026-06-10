import { createSlice } from "@reduxjs/toolkit";
import type { authState } from "./auth.types";
import { login, logout, me, signup, updateProfile, toggleRole, getAllUsers, deleteUser } from "./auth.reducer";

const initialState: authState = {
    users: [],
    user: null,
    isAuthenticated: false,

    loading: false,
    updateProfileLoading: false,
    fetchUserLoading: false,
    deleteLoading: false,
    authChecked: false,

    err: null,
    updateProfileErr: null,
    fetchUserErr: null,
    deleteErr: null
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
                state.isAuthenticated = true
                state.user = action.payload.user
                state.fetchUserLoading = false
                state.authChecked = true
            })
            // rejected
            .addCase(me.rejected, (state, action) => {
                state.fetchUserLoading = false
                state.fetchUserErr = action.payload as string
                state.isAuthenticated = false
                state.user = null
                state.authChecked = true
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

            // Admin
            .addCase(toggleRole.pending, (state) => {
                state.updateProfileLoading = true
                state.updateProfileErr = null
            })
            .addCase(toggleRole.fulfilled, (state, action) => {
                state.users = state.users.map(user => user._id === action.payload.user._id ? action.payload.user : user)
                state.updateProfileLoading = false
            })
            .addCase(toggleRole.rejected, (state, action) => {
                state.updateProfileErr = action.payload as string
                state.updateProfileLoading = false
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
                state.err = null
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.loading = false
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.err = action.payload as string
                state.loading = false
            })
            .addCase(deleteUser.pending, (state) => {
                state.deleteErr = null
                state.deleteLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload.user._id)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteErr = action.payload as string
            })
    },
});


export default AuthSlice.reducer;