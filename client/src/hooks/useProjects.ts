import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../lib/axios"

const ProjectKey = ["project"]
const baseUrl = "/project"

export type ProjectsState = {
    projects: Project[],
    project: Project | null,

    loading: boolean,
    projectLoading: boolean,
    createLoading: boolean
    deleteLoading: boolean
    updateLoading: boolean

    err: string | null
    projectErr: string | null
    createErr: string | null,
    deleteErr: string | null
    updateErr: string | null
}

export type Project = {
    _id: string;
    title: string;
    desc: string;
    minPrice: number;
    maxPrice: number;
    deliveryDuration: number;
    createdAt: Date;
    updatedAt: Date;
    employer: any;
    category: any
    contract: any
    status: string;
    approveStatus: string
}

export type ProjectInput = {
    title: string;
    desc: string;
    minPrice: number;
    maxPrice: number;
    category: string;
    deliveryDuration: number;
}

export type projectFilters = {
    search?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    employer?: string,
    status?: string
}

type projectFiltersLocal = {
    search?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    employer?: string,
    status?: string
}

type adminProjectsFilters = {
    status?: string;
    approveStatus?: string;
    employer?: string;
    search?: string,
    category?: string
}

type projectsFetch = {
    projects: Project[]
    total: number
    totalPages: number
}

export const useLoadProjects = (filters: projectFiltersLocal) =>
    useQuery<projectsFetch>({
        queryKey: [...ProjectKey, filters],
        queryFn: () => api.get(baseUrl, { params: filters }).then(res => res.data)
    })


export const useLoadProject = (id: string) =>
    useQuery({
        queryKey: [...ProjectKey, id],
        queryFn: () => api.get(`${baseUrl}/${id}`).then(res => res.data)
    })

export const useLoadAdminProjects = (filters: adminProjectsFilters) =>
    useQuery<projectsFetch>({
        queryKey: [...ProjectKey, filters],
        queryFn: () => api.get(`${baseUrl}/admin`, { params: filters }).then(res => res.data)
    })

export const useCreateProject = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: ProjectInput) => api.post(baseUrl, data).then(res => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ProjectKey
            })
        }
    })
}

export const useChangeApproveStatus = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => api.patch(`${baseUrl}/${id}/approve-status`, { approveStatus: status }).then(res => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ProjectKey
            })
        }
    })
}