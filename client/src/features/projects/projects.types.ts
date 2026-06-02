import type { User } from "../auth/auth.types";
import type { Category } from "../category/category.types";
import type { Contract } from "../contract/contract.types";

export type ProjectsState = {
    projects: Project[],
    project: Project | null,
    loading: boolean,
    err: string | null
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
    status: string;
    contract: Contract
}

export type ProjectInput = {
    title: string;
    desc: string;
    minPrice: number;
    maxPrice: number;
    category: string;
    deliveryDuration: number;
}