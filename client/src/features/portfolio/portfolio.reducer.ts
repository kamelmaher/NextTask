/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";

const baseUrl = "/portfolio"

export const createPortfolioItem = createAsyncThunk(
    "portfolio/createPortfolioItem",
    async (data: FormData, thunkApi) => {
        try {
            const res = await api.post(baseUrl, data)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response?.data?.msg || "something went wrong")
        }
    }
)

export const getPortfolioItems = createAsyncThunk(
    "portfolio/getPortfolioItems",
    async (userId: string, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/${userId}`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response?.data?.msg || "something went wrong")
        }
    }
)

export const getPortfolioItem = createAsyncThunk(
    "portfolio/getPortfolioItem",
    async (itemId: string, thunkApi) => {
        try {
            const res = await api.get(`${baseUrl}/item/${itemId}`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response?.data?.msg || "something went wrong")
        }
    }
)

export const updatePortfolioItem = createAsyncThunk(
    "portfolio/updatePortfolioItem",
    async ({ id, data }: { id: string; data: FormData }, thunkApi) => {
        try {
            const res = await api.put(`${baseUrl}/${id}`, data)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response?.data?.msg || "something went wrong")
        }
    }
)

export const deletePortfolioItem = createAsyncThunk(
    "portfolio/deletePortfolioItem",
    async (itemId: string, thunkApi) => {
        try {
            const res = await api.delete(`${baseUrl}/${itemId}`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response?.data?.msg || "something went wrong")
        }
    }
)
