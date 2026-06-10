import type { Category } from "../category/category.types"

export type User = {
    _id: string,
    firstName: string
    lastName: string
    roles: string[]
    userName: string,
    email: string,
    about: string,
    title: string,
    profileImg: string,
    category: Category
    balance: number
}

export type authState = {
    users: User[]
    user: User | null,
    isAuthenticated: boolean
    loading: boolean,
    updateProfileLoading: boolean,
    fetchUserLoading: boolean,
    deleteLoading: boolean,
    authChecked: boolean,
    err: string | null
    updateProfileErr: string | null
    fetchUserErr: string | null
    deleteErr: string | null
}