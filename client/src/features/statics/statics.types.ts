type userStatics = {
    postedProjects: number,
    proposalsCount: number,
    inProgress: number,
    pendingProposals: number
    totalEarned: number,
    finishedWork: number,
}

type projectStatics = {
    activeProjects: number,
    pendingProjects: number,
    completedProjects: number
}

type contractStatics = {
    inProgress: number,
    completed: number,
    declined: number,
    totalValue: number
}

type dashboardStatics = {
    totalUsers: number,
    projectStatics: projectStatics
    contractStatics: contractStatics
}

type transactionsStatics = {
    depositTotal: number,
    depositValue: number,
    withdrawsTotal: number,
    withdrawsValue: number,
    totalTransfers: number
}
export type statics = {
    userStatics: userStatics | null
    dashboardStatics: dashboardStatics | null
    transactionStatics: transactionsStatics | null
    loading: boolean,
    err: string | null
}
export const initialState: statics = {
    userStatics: null,
    dashboardStatics: null,
    transactionStatics: null,
    loading: false,
    err: null
}
