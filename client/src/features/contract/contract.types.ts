export type ContractState = {
    contracts: Contract[],
    loading: boolean,
    err: string | null
}

export type Contract = {
    _id: string,
    projectId: string,
    freelancerId: string,
    proposalId: string,
    price: number,
    deliveryDuration: number,
    status: string,
}
