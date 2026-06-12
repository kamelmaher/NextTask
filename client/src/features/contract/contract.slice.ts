import { createSlice } from "@reduxjs/toolkit";
import type { ContractState } from "./contract.types";
import { acceptProposal } from "../proposal/proposal.reducer";
import { acceptWork, getContract, getContracts, requestRevision, submitWork } from "./contract.reducer";

const initialState: ContractState = {
    contracts: [],
    contract: null,
    loading: false,
    submitLoading: false,
    acceptWorkLoading: false,
    err: null,
    submitErr: null,
    acceptWorkErr: null
}

const ContractSlice = createSlice({
    name: "contract",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get contracts
            .addCase(getContracts.pending, (state) => {
                state.err = null
                state.loading = true
            })
            .addCase(getContracts.fulfilled, (state, action) => {
                state.contracts = action.payload.contracts
                state.loading = false
            })
            .addCase(getContracts.rejected, (state, action) => {
                state.err = action.payload as string
                state.loading = false
            })
            // get contract details
            .addCase(getContract.pending, (state) => {
                state.err = null
                state.loading = true
            })
            .addCase(getContract.fulfilled, (state, action) => {
                state.contract = action.payload.contract
                state.loading = false
            })
            .addCase(getContract.rejected, (state, action) => {
                state.err = action.payload as string
                state.loading = false
            })
            // submit work
            .addCase(submitWork.pending, (state) => {
                state.submitErr = null
                state.submitLoading = true
            })
            .addCase(submitWork.fulfilled, (state, action) => {
                const updatedContract = action.payload.contract
                state.contracts = state.contracts.map(contract => contract._id === updatedContract._id ? updatedContract : contract)
                state.contract = updatedContract
                state.submitLoading = false
            })
            .addCase(submitWork.rejected, (state, action) => {
                state.submitErr = action.payload as string
                state.submitLoading = false
            })

            // accept work
            .addCase(acceptWork.pending, (state) => {
                state.acceptWorkErr = null
                state.acceptWorkLoading = true
            })
            .addCase(acceptWork.fulfilled, (state, action) => {
                const updatedContract = action.payload.contract
                console.log(updatedContract)
                state.contracts = state.contracts.map(contract => contract._id === updatedContract._id ? updatedContract : contract)
                state.contract = updatedContract
                state.acceptWorkLoading = false
            })
            .addCase(acceptWork.rejected, (state, action) => {
                state.acceptWorkErr = action.payload as string
                state.acceptWorkLoading = false
            })

            // request revision
            .addCase(requestRevision.pending, (state) => {
                state.err = null
            })
            .addCase(requestRevision.fulfilled, (state, action) => {
                const updatedContract = action.payload.contract
                state.contracts = state.contracts.map(contract => contract._id === updatedContract._id ? updatedContract : contract)
            })
            .addCase(requestRevision.rejected, (state, action) => {
                state.err = action.payload as string
                state.loading = false
            })


            // create contract after accept proposal
            .addCase(acceptProposal.fulfilled, (state, action) => {
                state.contracts.push(action.payload.contract)
                state.contract = action.payload.contract
            })
    }
})

export default ContractSlice.reducer