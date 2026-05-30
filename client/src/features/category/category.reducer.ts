/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import type { createCategoryType, updateCategoryType } from "./category.types";
const baseUrl = "/category"

export const getCategories = createAsyncThunk(
    "category/getCategories",
    async (_, thunkAPI) => {
        try {
            const res = await api.get(baseUrl)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (data: createCategoryType, thunkAPI) => {
        try {
            const res = await api.post(baseUrl, data)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data: updateCategoryType, thunkAPI) => {
        try {
            const res = await api.patch(`${baseUrl}/${data.id}`, { title: data.title, icon: data.icon })
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.delete(`${baseUrl}/${id}`)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)