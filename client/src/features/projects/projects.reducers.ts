/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "../../types/project";
import { api } from "../../lib/axios";
const baseUrl = "/project"

// public
export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async (_, thunkAPI) => {
        try {
            const res = await api.get(baseUrl)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

export const fetchSingleProject = createAsyncThunk(
    "projects/fetchSingleProject",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.get(`${baseUrl}/${id}`)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

// employers
export const createProject = createAsyncThunk(
    "projects/createProject",
    async (data: Project, thunkAPI) => {
        try {
            const res = await api.post(baseUrl, data);
            return res.data;
        } catch (err: any) {
            console.log(err.response.data.msg || "something went wrong")
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
);

export const updateProject = createAsyncThunk(
    "projects/updateProject",
    async ({ id, data }: { id: string, data: Partial<Project> }, thunkAPI) => {
        try {
            const res = await api.patch(`${baseUrl}/${id}`, data)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

export const deleteProject = createAsyncThunk(
    "projects/deleteProject",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.delete(`${baseUrl}/${id}`)
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)



// moderators
export const changeProjectApprovalStatus = createAsyncThunk(
    "projects/changeProjectApprovalStatus",
    async ({ id, status }: { id: string, status: string }, thunkAPI) => {
        try {
            const res = await api.patch(`${baseUrl}/${id}`, { status })
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)