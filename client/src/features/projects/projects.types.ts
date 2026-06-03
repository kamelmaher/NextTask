import type { User } from "../auth/auth.types";
import type { Category } from "../category/category.types";
import type { Contract } from "../contract/contract.types";

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
    employer: User;
    category: Category
    contract: Contract
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
    searchTerm?: string,
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number,
    employer?: string,
    status?: string
}