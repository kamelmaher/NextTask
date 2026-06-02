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
    category: string
    balance: number
}

export type authState = {
    user: User | null,
    isAuthenticated: boolean
    loading: boolean,
    updateProfileLoading: boolean,
    fetchUserLoading: boolean,
    err: string | null
    updateProfileErr: string | null
    fetchUserErr: string | null
}