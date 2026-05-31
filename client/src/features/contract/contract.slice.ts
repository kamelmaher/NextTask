import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContractState } from "./contract.types";
import { acceptProposal } from "../proposal/proposal.reducer";
import { acceptWork, requestRevision, submitWork } from "./contract.reducer";

const initialState: ContractState = {
    contracts: [],
    loading: false,
    err: null
}

const ContractSlice = createSlice({
    name: "contract",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitWork.fulfilled, (state, action) => {
                const updatedContract = action.payload.contract
                state.contracts = state.contracts.map(contract => contract._id === updatedContract._id ? updatedContract : contract)
            })
            .addCase(acceptWork.fulfilled, (state, action) => {
                const updatedContract = action.payload.contract
                state.contracts = state.contracts.map(contract => contract._id === updatedContract._id ? updatedContract : contract)
            })
            .addCase(requestRevision.fulfilled, (state, action) => {
                const updatedContract = action.payload.contract
                state.contracts = state.contracts.map(contract => contract._id === updatedContract._id ? updatedContract : contract)
            })

            // create contract after accept proposal
            .addCase(acceptProposal.fulfilled, (state, action) => {
                state.contracts.push(action.payload.contract)
            })

        builder.addMatcher(
            (action) => action.type.startsWith("contract/") &&
                action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                state.err = null;
            }
        );

        builder.addMatcher(
            (action) => action.type.startsWith("contract/") &&
                action.type.endsWith("/rejected"),
            (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.err = action.payload;
            }
        );

        builder.addMatcher(
            (action) =>
                action.type.startsWith("contract/") &&
                action.type.endsWith("/fulfilled"),
            (state) => {
                state.loading = false;
            }
        )
    }
})

export default ContractSlice.reducer