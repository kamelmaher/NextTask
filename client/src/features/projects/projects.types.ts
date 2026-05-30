export type ProjectsState = {
    projects: Project[],
    project: Project,
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
    createdAt: string;
    userId: string;
    categoryId: string
}