import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectsState } from "./projects.types";
import { changeProjectApprovalStatus, createProject, deleteProject, fetchProjects, fetchSingleProject, updateProject } from "./projects.reducers";
import type { Project } from "../../types/project";
import { acceptWork } from "../contract/contract.reducer";
import { acceptProposal } from "../proposal/proposal.reducer";

const initialState: ProjectsState = {
    projects: [],
    project: {} as Project,
    loading: false,
    err: null
}

const ProjectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload.projects
            })
            .addCase(fetchSingleProject.fulfilled, (state, action) => {
                state.project = action.payload.project
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload.project);
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter(project => project._id !== action.payload.project._id);
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.projects = state.projects.map(project => project._id === action.payload.project._id ? action.payload.project : project);
            })
            .addCase(changeProjectApprovalStatus.fulfilled, (state, action) => {
                state.projects = state.projects.map(project => project._id === action.payload.project._id ? action.payload.project : project)
            })


            // update project after accept proposal 
            .addCase(acceptProposal.fulfilled, (state, action) => {
                const updatedProject = action.payload.project
                state.projects = state.projects.map(project =>
                    project._id === updatedProject._id
                        ?
                        updatedProject :
                        project
                )
            })

            // update project after accept work 
            .addCase(acceptWork.fulfilled, (state, action) => {
                const updatedProject = action.payload.project
                state.projects = state.projects.map(project =>
                    project._id === updatedProject._id
                        ?
                        updatedProject :
                        project
                )
            })

        builder.addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                state.err = null;
            }
        );

        builder.addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.err = action.payload;
            }
        );

        builder.addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state) => {
                state.loading = false;
            }
        )
    },
});


export default ProjectsSlice.reducer;