import type { User } from "../auth/auth.types"
import type { Contract } from "../contract/contract.types"

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
    user?: Partial<User>
    toUser?: Partial<User>
    fromUser?: Partial<User>
    contract?: Partial<Contract>
    createdAt: string
}