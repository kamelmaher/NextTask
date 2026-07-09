import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../lib/axios"
import type { Project } from "./useProjects"
import type { Proposal } from "./useProposal"
import type { User } from "../features/auth/auth.types"

const contractKey = ["contract"]
const baseUrl = "/contract"

export type Contract = {
    _id: string,
    project: Project,
    freelancer: User,
    employer: User,
    proposal: Proposal,
    agreedPrice: number,
    deliveryDuration: number,
    status: string,
    submissions: {
        files: {
            path: string,
            originalName: string
        }[],
        submittedAt: string
        message: string
    }[],
    createdAt: string,
    updatedAt: string
}

export type contractFilters = {
    freelancer?: string,
    employer?: string,
    status?: string,
    approveStatus?: string,
    minPrice?: number,
    maxPrice?: number,
}

export type submissionType = {
    _id: string,
    message: string,
    files: {
        name: string,
        size: number,
        type: string
    }[]
}

type contractsFetch = {
    contracts: Contract[]
}

type contractFetch = {
    contract: Contract | null
}

export const useLoadUserContracts = () =>
    useQuery({
        queryKey: contractKey,
        queryFn: () => api.get<contractsFetch>(baseUrl).then(res => res.data)
    })

export const useLoadAllContracts = (filters: { status?: string, approveStatus?: string, minPrice?: string, maxPrice?: string }) =>
    useQuery<contractsFetch>({
        queryKey: [...contractKey, filters],
        queryFn: () => api.get(`${baseUrl}/admin`, { params: filters }).then(res => res.data)
    })

export const useLoadContract = (id: string) =>
    useQuery<contractFetch>({
        queryKey: [...contractKey, id],
        queryFn: () => api.get(`${baseUrl}/${id}`).then(res => res.data),
        enabled: !!id
    })

export const useAcceptContract = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => api.patch(`${baseUrl}/${id}/accept`),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: contractKey
            })
        }
    })
}

export const useSubmitWork = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => {
            const _id = data.get("_id")
            return api.post(`${baseUrl}/${_id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: contractKey
            })
        }
    })
}

export const useRequestRevision = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => api.post(`${baseUrl}/${id}/request-revision`),
        onSuccess: () => qc.invalidateQueries({ queryKey: contractKey })
    })
}