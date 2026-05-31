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
            if (res.status === 200) {
                thunkAPI.dispatch(me())
            }
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
            if (res.status === 200) {
                thunkAPI.dispatch(me())
            }
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
    async () => {
        try {
            const res = await api.get(`${baseUrl}/me`)
            if (res.status == 200) {
                console.log(res.data.user)
                return res.data
            }
        } catch (err: any) {
            return ""
        }
    }
)

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (data: Partial<User>, thunkAPI) => {
        try {
            const res = await api.patch(`${baseUrl}`, data)
            if (res.status === 200) {
                thunkAPI.dispatch(me())
            }
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const assignRole = createAsyncThunk(
    "auth/assignRole",
    async (data: { id: string, role: string }, thunkAPI) => {
        try {
            const res = await api.patch(`${baseUrl}/${data.id}/roles/assign`, { role: data.role })
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const removeRole = createAsyncThunk(
    "auth/removeRole",
    async (data: { id: string, role: string }, thunkAPI) => {
        try {
            const res = await api.patch(`${baseUrl}/${data.id}/roles/remove`, { role: data.role })
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)
