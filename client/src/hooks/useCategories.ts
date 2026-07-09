import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../lib/axios"

const categoryKey = ["category"]
const baseUrl = "/category"

export type Category = {
    _id: string,
    title: string,
}

export type CategoryState = {
    categories: Category[],
    loading: boolean,
    err: string | null
}

export type createCategoryType = {
    title: string,
}

export type updateCategoryType = {
    _id: string,
    title?: string,
}

type categoryFetch = {
    categories: Category[]
}

export const useLoadCategories = () =>
    useQuery<categoryFetch>({
        queryKey: categoryKey,
        queryFn: () => api.get(baseUrl).then(res => res.data)
    })

export const useCreateCategory = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: Partial<Category>) => api.post(baseUrl, data).then(res => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: categoryKey
            })
        }
    })
}

export const useUpdateCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Category>) => api.patch(`${baseUrl}/${data._id}`, data).then(res => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: categoryKey
            })
        }
    })
}

export const useDeleteCategory = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => api.delete(`${baseUrl}/${id}`).then(res => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: categoryKey
            })
        }
    })
}