/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";

const baseUrl = "/statics"
export const getUserStatics = createAsyncThunk(
    "statics/getUserStatics",
    async (_, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/user`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const getDashboardStatics = createAsyncThunk(
    "statics/getDashboardStatics",
    async (_, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/admin`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)
export const getTransactionStatics = createAsyncThunk(
    "statics/getTransactionStatics",
    async (_, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/transactions`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)