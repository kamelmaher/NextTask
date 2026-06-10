import type { ReactNode } from "react"
import { useAppSelector } from "./store/store"
import { Navigate } from "react-router-dom"
import Spinner from "./components/Spinner"
import { roles } from "./utils"

type Props = {
    children: ReactNode
    forAdmin?: boolean
}
const ProtectedRoute = ({ children, forAdmin }: Props) => {
    const { user, isAuthenticated, authChecked, fetchUserLoading } = useAppSelector(state => state.auth)
    if (fetchUserLoading) return <Spinner size="lg" />
    if (!authChecked) return <p>Checking User...</p>
    if (!isAuthenticated) return <Navigate to={"/login"} />
    if (forAdmin && !user?.roles.includes(roles.ADMIN)) return <Navigate to={"/"} />
    return children
}

export default ProtectedRoute
