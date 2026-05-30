export type ProposalState = {
    proposals: Proposal[],
    loading: boolean,
    err: string | null
}

export type Proposal = {
    _id: string,
    freelancerId: string,
    projectId: string,
    price: number,
    deliveryDuration: number,
    content: string
}

export type createProposalType = {
    content: string,
    price: number,
    deliveryDuration: number,
    projectId: string,
    freelancerId: string
}
