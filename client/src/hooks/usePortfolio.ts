import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../lib/axios"
import type { User } from "../features/auth/auth.types"

const baseUrl = `/portfolio`
const portfolioKey = ["portfolio"]

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

type itemFetch = {
    portfolioItem: PortfolioItem
}

type itemsFetch = {
    portfolioItems: PortfolioItem[]
}
export const useLoadPortfolio = (id: string) =>
    useQuery<itemFetch>({
        queryKey: [...portfolioKey, id],
        queryFn: () => api.get(`${baseUrl}/item/${id}`).then(res => res.data),
        enabled: !!id
    })

export const useLoadPortfolios = (userId: string) =>
    useQuery<itemsFetch>({
        queryKey: portfolioKey,
        queryFn: () => api.get(`${baseUrl}/${userId}`).then(res => res.data),
        enabled: !!userId
    })

export const useCreatePortfolioItem = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => api.post(baseUrl, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: portfolioKey })
    })
}

export const useUpdatePortfolioItem = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: { id: string, data: FormData }) => api.patch(`${baseUrl}/${data.id}`, data.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: portfolioKey })
    })
}

export const useDeletePortfolioItem = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => api.delete(`${baseUrl}/${id}`),
        onSuccess: () => qc.invalidateQueries({ queryKey: portfolioKey })
    })
}