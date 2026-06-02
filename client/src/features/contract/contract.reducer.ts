/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import type { Contract, contractFilters } from "./contract.types";

const baseUrl = "/contract"
export const submitWork = createAsyncThunk(
    "contract/submitWork",
    async (data: Partial<Contract>, thunkApi) => {
        try {
            const res = await api.post(baseUrl, data)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const acceptWork = createAsyncThunk(
    "contract/acceptWork",
    async (id: string, thunkApi) => {
        try {
            const res = await api.post(`${baseUrl}/${id}/accept`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const requestRevision = createAsyncThunk(
    "contract/requestRevision",
    async (id: string, thunkApi) => {
        try {
            const res = await api.post(`${baseUrl}/${id}/request-revision`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const getContract = createAsyncThunk(
    "contract/getContract",
    async (id: string, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/${id}`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    })

export const getContracts = createAsyncThunk(
    "contract/getContracts",
    async (filters: contractFilters, thunkApi) => {
        try {
            const res = await api.get(baseUrl, { params: filters })
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    })