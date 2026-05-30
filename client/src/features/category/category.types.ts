export type CategoryState = {
    categories: Category[],
    loading: boolean,
    err: string | null
}

export type Category = {
    _id: string,
    title: string,
    icon: string
}

export type createCategoryType = {
    title: string,
    icon?: string
}
export type updateCategoryType = {
    id: string,
    title?: string,
    icon?: string
}