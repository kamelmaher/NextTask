import type { User } from "../auth/auth.types"
import type { Project } from "../projects/projects.types"

export type ProposalState = {
    proposals: Proposal[],
    loading: boolean,
    err: string | null,
    addProposalLoading: boolean,
    addProposalErr: string | null,
    acceptProposalLoading: boolean,
    acceptProposalErr: string | null,
}

export type Proposal = {
    _id: string,
    freelancer: User,
    project: Project,
    price: number,
    deliveryDuration: number,
    content: string
    status: string
    createdAt: string
}

export type createProposalType = {
    content: string,
    price: number,
    deliveryDuration: number,
    projectId: string,
}

export type getProposalFilters = {
    projectId?: string
    status?: string
    userId?: string
}