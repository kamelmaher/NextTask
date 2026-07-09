import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

const baseUrl = "/statics";
const staticsKey = ["statics"]

export type userStatics = {
    postedProjects: number,
    proposalsCount: number,
    inProgress: number,
    pendingProposals: number
    totalEarned: number,
    finishedWork: number,
}

export type projectStatics = {
    totalProjects: number,
    activeProjects: number,
    pendingProjects: number,
    completedProjects: number
}

export type contractStatics = {
    totalContracts: number
    inProgress: number,
    completed: number,
    declined: number,
    totalValue: number
}

export type dashboardStatics = {
    totalUsers: number,
    projectStatics: projectStatics,
    contractStatics: contractStatics,
    activity: activity,
    pendingActions: pendingActions
}

export type transactionsStatics = {
    depositTotal: number,
    depositValue: number,
    withdrawsTotal: number,
    withdrawsValue: number,
    totalTransfers: number
}

export type activity = {
    recentProjects: any[],
    recentContracts: any[],
    recentDeposits: any[]
}

export type pendingActions = {
    pendingWithdrawals: number
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

export const useLoadUserStatics = () =>
    useQuery<userStatics>({
        queryKey: [...staticsKey, "user"],
        queryFn: () => api.get(`${baseUrl}/user`).then(res => res.data),
    })

export const useLoadDashboardStatics = () =>
    useQuery<dashboardStatics>({
        queryKey: [...staticsKey, "dashboard"],
        queryFn: () => api.get(`${baseUrl}/admin`).then(res => res.data)
    })

export const useLoadTransactionsStatics = () =>
    useQuery<transactionsStatics>({
        queryKey: [...staticsKey, "transaction"],
        queryFn: () => api.get(`${baseUrl}/transactions`).then(res => res.data)
    })