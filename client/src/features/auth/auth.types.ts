export type User = {
    firstName: string
}
export type authState = {
    user: User | null,
    isAuthenticated: boolean
    loading: boolean,
    err: string | null
}