import { createSlice } from "@reduxjs/toolkit";
import { acceptProposal, createProposal, getProposals } from "./proposal.reducer";
import type { ProposalState } from "./proposal.types";
import { proposalStatus } from "../../utils/status";

const initialState: ProposalState = {
    proposals: [],
    loading: false,
    addProposalLoading: false,
    acceptProposalLoading: false,
    err: null,
    addProposalErr: null,
    acceptProposalErr: null,
}
const ProposalSlice = createSlice({
    name: "proposal",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch proposals
            .addCase(getProposals.pending, (state) => {
                state.loading = true;
                state.err = null;
            })
            .addCase(getProposals.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals;
                state.loading = false;
            })
            .addCase(getProposals.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload as string;
            })

            // create proposal
            .addCase(createProposal.pending, (state) => {
                state.addProposalLoading = true;
                state.addProposalErr = null;
            })
            .addCase(createProposal.fulfilled, (state, action) => {
                const newProposal = action.payload.proposal
                state.proposals.push(newProposal)
                state.addProposalLoading = false
            })
            .addCase(createProposal.rejected, (state, action) => {
                state.addProposalLoading = false;
                state.addProposalErr = action.payload as string;
            })

            // accept proposal
            .addCase(acceptProposal.pending, (state) => {
                state.acceptProposalLoading = true;
                state.acceptProposalErr = null;
            })
            .addCase(acceptProposal.fulfilled, (state, action) => {
                const newProposal = action.payload.proposal
                state.proposals = state.proposals.map(proposal =>
                    proposal._id === newProposal._id ?
                        newProposal : { ...proposal, status: proposalStatus.DECLINED }
                )

                state.acceptProposalLoading = false
            })
            .addCase(acceptProposal.rejected, (state, action) => {
                state.acceptProposalLoading = false;
                state.acceptProposalErr = action.payload as string;
            })
    }
})

export default ProposalSlice.reducer