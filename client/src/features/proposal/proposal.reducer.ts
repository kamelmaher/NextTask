/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import type { createProposalType, getProposalFilters } from "./proposal.types";

const baseUrl = "/proposal"

export const getProposals = createAsyncThunk(
    "proposal/getProposals",
    async (filters: getProposalFilters, thunkApi) => {
        try {
            const res = await api.get(baseUrl, { params: filters })
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)


export const createProposal = createAsyncThunk(
    "proposal/createProposal",
    async (data: createProposalType, thunkApi) => {
        try {
            const res = await api.post(`${baseUrl}`, data)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)


export const acceptProposal = createAsyncThunk(
    "proposal/acceptProposal",
    async (id: string, thunkApi) => {
        try {
            const res = await api.patch(`${baseUrl}/${id}`)
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response.data.msg || "something went wrong")
        }
    }
)