import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/axios"

const baseUrl = "/transaction"
const transactionKey = ["transaction"]

export type transactionsState = {
    transactions: Transaction[]
    loading: boolean
    err: string | null
}

export type Transaction = {
    _id: string
    type: string
    status: string
    amount: number
    user?: Partial<any>
    toUser?: Partial<any>
    fromUser?: Partial<any>
    contract?: Partial<any>
    createdAt: string
}

type transactionsFetch = {
    transactions: Transaction[]
}
export const useLoadTransactions = (type: string) =>
    useQuery<transactionsFetch>({
        queryKey: [...transactionKey, type],
        queryFn: () => api.get(baseUrl, { params: { type } }).then(res => res.data)
    })