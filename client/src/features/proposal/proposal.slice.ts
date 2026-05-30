import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { acceptProposal, createProposal, getProposals } from "./proposal.reducer";
import type { ProposalState } from "./proposal.types";

const initialState: ProposalState = {
    proposals: [],
    loading: false,
    err: null
}
const ProposalSlice = createSlice({
    name: "proposal",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProposals.fulfilled, (state, action) => {
                state.proposals = action.payload.proposals
            })
            .addCase(createProposal.fulfilled, (state, action) => {
                const newProposal = action.payload.proposal
                state.proposals = state.proposals.map(proposal =>
                    proposal._id === newProposal._id ?
                        newProposal : proposal
                )
            })
            .addCase(acceptProposal.fulfilled, (state, action) => {
                const newProposal = action.payload.proposal
                state.proposals = state.proposals.map(proposal =>
                    proposal._id === newProposal._id ?
                        newProposal : proposal
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
    }
})

export default ProposalSlice.reducer