import type { User } from "../auth/auth.types"
import type { Project } from "../projects/projects.types"
import type { Proposal } from "../proposal/proposal.types"

export type ContractState = {
    contracts: Contract[],
    contract: Contract | null,

    loading: boolean,
    submitLoading: boolean,
    acceptWorkLoading: boolean,

    err: string | null
    acceptWorkErr: string | null,
    submitErr: string | null
}

export type Contract = {
    _id: string,
    project: Project,
    freelancer: User,
    employer: User,
    proposal: Proposal,
    price: number,
    deliveryDuration: number,
    status: string,
    createdAt: string
}

export type contractFilters = {
    freelancer?: string,
    employer?: string,
    status?: string,
    
}