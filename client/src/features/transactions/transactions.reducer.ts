/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";

const baseUrl = "/transaction"
export const getTransactions = createAsyncThunk(
    "transactions/getTransactions",
    async (type: string, thunkApi) => {
        try {
            const res = await api.get(baseUrl, { params: { type } })
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong1")
        }
    }
)