export type User = {
    firstName: string
    lastName: string
    roles: string[]
    userName: string,
    email: string,
    about: string,
    title: string,
    profileImg: string,
    categoryId: string
}

export type authState = {
    user: User | null,
    isAuthenticated: boolean
    loading: boolean,
    err: string | null
}