/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import type { Project, projectFilters, ProjectInput } from "./projects.types";
const baseUrl = "/project"

// public
export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async (filters: projectFilters, thunkAPI) => {
        try {
            const res = await api.get(baseUrl, { params: filters })
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

// users
// export const fetchUserProjects = createAsyncThunk(
//     "projects/fetchUserProjects",
//     async (filters: projectFilters, thunkAPI) => {
//         try {
//             const res = await api.get(`${baseUrl}?employer=${employerId}`)
//             return res.data
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
//         }
//     }
// )

export const createProject = createAsyncThunk(
    "projects/createProject",
    async (data: ProjectInput, thunkAPI) => {
        try {
            const res = await api.post(baseUrl, data);
            return res.data;
        } catch (err: any) {
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
            const res = await api.patch(`${baseUrl}/${id}/approve-status`, { approveStatus: status })
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)

export const fetchAdminProjects = createAsyncThunk(
    "projects/fetchAdminProjects",
    async (filters: { status?: string; approveStatus?: string; employer?: string; searchTerm?: string } = {}, thunkAPI) => {
        try {
            const res = await api.get(`${baseUrl}/admin`, { params: filters })
            return res.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg || "something went wrong");
        }
    }
)
