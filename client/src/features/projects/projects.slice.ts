import { createSlice } from "@reduxjs/toolkit";
import type { ProjectsState } from "./projects.types";
import { changeProjectApprovalStatus, createProject, deleteProject, fetchProjects, fetchSingleProject, updateProject } from "./projects.reducers";
// import { acceptWork } from "../contract/contract.reducer";
// import { acceptProposal } from "../proposal/proposal.reducer";

const initialState: ProjectsState = {
    projects: [],
    project: null,

    loading: false,
    projectLoading: false,
    createLoading: false,
    deleteLoading: false,
    updateLoading: false,

    err: null,
    projectErr: null,
    createErr: null,
    deleteErr: null,
    updateErr: null
}

const ProjectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // fetch projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.err = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload.projects
                state.loading = false;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload as string;
            })

            // fetch single project
            .addCase(fetchSingleProject.pending, (state) => {
                state.projectLoading = true;
                state.projectErr = null
            })
            .addCase(fetchSingleProject.fulfilled, (state, action) => {
                state.project = action.payload.project
                state.projectLoading = false;
            })
            .addCase(fetchSingleProject.rejected, (state, action) => {
                state.projectErr = action.payload as string;
                state.projectLoading = false;
            })

            // creat project 
            .addCase(createProject.pending, (state) => {
                state.createLoading = true;
                state.createErr = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload.project);
                state.createLoading = false;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.createErr = action.payload as string;
                state.createLoading = false
            })

            // delete project
            .addCase(deleteProject.pending, (state) => {
                state.deleteLoading = true;
                state.deleteErr = null
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter(project => project._id !== action.payload.project._id);
                state.deleteLoading = false
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.deleteErr = action.payload as string;
                state.deleteLoading = false
            })

            // update project
            .addCase(updateProject.pending, (state) => {
                state.updateLoading = true;
                state.updateErr = null
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.projects = state.projects.map(project => project._id === action.payload.project._id ? action.payload.project : project);
                state.updateLoading = false;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.updateErr = action.payload as string;
                state.updateLoading = false;
            })

            // approve status
            .addCase(changeProjectApprovalStatus.pending, (state) => {
                state.updateLoading = true;
                state.updateErr = null
            })
            .addCase(changeProjectApprovalStatus.fulfilled, (state, action) => {
                state.projects = state.projects.map(project => project._id === action.payload.project._id ? action.payload.project : project)
                state.updateLoading = false;
            })
            .addCase(changeProjectApprovalStatus.rejected, (state, action) => {
                state.updateErr = action.payload as string;
                state.updateLoading = false;
            })

        // fetch user projects
        // .addCase(fetchUserProjects.fulfilled, (state, action) => {
        //     state.projects = action.payload.projects
        //     state.loading = false;
        // })
        // .addCase(fetchUserProjects.pending, (state) => {
        //     state.loading = true;
        //     state.err = null
        // })
        // .addCase(fetchUserProjects.rejected, (state, action) => {
        //     state.projects = [];
        //     state.err = action.payload as string;
        //     state.loading = false;
        // })

        // update project after accept proposal 
        // .addCase(acceptProposal.fulfilled, (state, action) => {
        //     const updatedProject = action.payload.project
        //     state.projects = state.projects.map(project =>
        //         project._id === updatedProject._id
        //             ?
        //             updatedProject :
        //             project
        //     )
        // })

        // // update project after accept work 
        // .addCase(acceptWork.fulfilled, (state, action) => {
        //     const updatedProject = action.payload.project
        //     state.projects = state.projects.map(project =>
        //         project._id === updatedProject._id
        //             ?
        //             updatedProject :
        //             project
        //     )
        // })
    },
});


export default ProjectsSlice.reducer;