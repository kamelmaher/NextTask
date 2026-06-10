/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import type { User } from "./auth.types";

const baseUrl = "/user"

export const login = createAsyncThunk(
    "auth/login",
    async (data: { email: string, password: string }, thunkAPI) => {
        try {
            const res = await api.post(`${baseUrl}/login`, data)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

export const signup = createAsyncThunk(
    "auth/signup",
    async (data: Partial<User>, thunkAPI) => {
        try {
            const res = await api.post(`${baseUrl}/signup`, data)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const res = await api.post(`${baseUrl}/logout`)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

export const me = createAsyncThunk(
    "auth/me",
    async (_, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/me`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (data: Partial<User>, thunkAPI) => {
        try {
            const res = await api.patch(`${baseUrl}`, data)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

// export const assignRole = createAsyncThunk(
//     "auth/assignRole",
//     async (data: { id: string, role: string }, thunkAPI) => {
//         try {
//             const res = await api.patch(`${baseUrl}/${data.id}/roles/assign`, { role: data.role })
//             return res.data
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
//         }
//     }
// )

// export const removeRole = createAsyncThunk(
//     "auth/removeRole",
//     async (data: { id: string, role: string }, thunkAPI) => {
//         try {
//             const res = await api.patch(`${baseUrl}/${data.id}/roles/remove`, { role: data.role })
//             return res.data
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
//         }
//     }
// )

export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async (id: string, thunkApi) => {
        try {
            const res = await api.delete(`${baseUrl}/${id}`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (role: string, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/admin?role=${role}`);
            return res.data;
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const toggleRole = createAsyncThunk(
    "auth/toggleRole",
    async (data: { role: string, userId: string }, thunkApi) => {
        try {
            const res = await api.patch(`${baseUrl}/${data.userId}/roles/toggle`, { role: data.role })
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)