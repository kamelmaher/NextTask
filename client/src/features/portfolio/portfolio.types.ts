import type { User } from "../auth/auth.types";

export type PortfolioItem = {
    _id: string;
    title: string;
    desc: string
    cover: string;
    images?: string[]
    skills?: string[]
    freelancer: User,
    createdAt: string
}
export type PortfolioState = {
    items: PortfolioItem[]
    item: PortfolioItem | null
    loading: boolean,
    createLoading: boolean
    updateLoading: boolean
    deleteLoading: boolean,
    error: string | null
    createError: string | null
    updateError: string | null
    deleteError: string | null
}