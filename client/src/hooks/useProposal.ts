import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { User } from "../features/auth/auth.types";

const proposalKey = ["proposals"]
const baseUrl = "/proposal"

export type Proposal = {
    _id: string,
    freelancer: User,
    project: User,
    price: number,
    deliveryDuration: number,
    content: string
    status: string
    createdAt: string
}

export type createProposalType = {
    content: string,
    price: number,
    deliveryDuration: number,
    projectId: string,
}

export type getProposalFilters = {
    projectId?: string
    status?: string
    userId?: string
}

type proposalFetch = {
    proposals: Proposal[]
}

export const useLoadProposalsByProject = (projectId: string) =>
    useQuery<proposalFetch>({
        queryKey: [...proposalKey, projectId],
        queryFn: () => api.get(`${baseUrl}/project/${projectId}`).then(res => res.data),
        enabled: !!projectId,
    });

export const useLoadProposalsByFreelancer = (status: string) =>
    useQuery<proposalFetch>({
        queryKey: [...proposalKey, status],
        queryFn: () => api.get(`${baseUrl}/freelancer`, { params: status ? { status } : {} }).then(res => res.data),
    });

export const useCreateProposal = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: createProposalType) => api.post(baseUrl, data).then(res => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: proposalKey
            })
        }
    })
}

export const useAcceptProposal = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => api.patch(`${baseUrl}/${id}`).then(res => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: proposalKey
            })
        }
    })
}