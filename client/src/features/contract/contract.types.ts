import type { User } from "../auth/auth.types"
import type { Project } from "../projects/projects.types"
import type { Proposal } from "../proposal/proposal.types"

export type ContractState = {
    contracts: Contract[],
    loading: boolean,
    err: string | null
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
}
