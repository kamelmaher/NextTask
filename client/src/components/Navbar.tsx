import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../features/auth/auth.reducer";
import Spinner from "./Spinner";

export function Navbar() {
    const { user, isAuthenticated, fetchUserLoading } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* LEFT */}
                <div className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        className="font-display text-xl font-bold tracking-tight text-brand"
                    >
                        NextTask
                    </NavLink>

                    <div className="hidden gap-6 text-sm font-medium md:flex">
                        <NavLink
                            to={"/projects"}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-brand"
                                    : "text-text-dim hover:text-text-dark"
                            }
                        >
                            Explore Projects
                        </NavLink>
                        <NavLink
                            to={"/find"}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-brand"
                                    : "text-text-dim hover:text-text-dark"
                            }
                        >
                            Find Freelancers
                        </NavLink>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                    {/* AUTHENTICATED UI */}
                    {fetchUserLoading ? <Spinner size="sm" /> : isAuthenticated ? (
                        <>
                            <div className="hidden items-center gap-3 border-r border-border pr-4 sm:flex">
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">
                                        Balance
                                    </p>
                                    <p className="text-sm font-semibold text-text-dark">
                                        $
                                        {user?.balance?.toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>

                                <NavLink
                                    to="/profile"
                                    className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand ring-2 ring-surface"
                                >
                                    {
                                        user?.profileImg ?
                                            <img src={user?.profileImg} alt="profile image" />
                                            : user?.firstName
                                    }
                                </NavLink>
                            </div>

                            <NavLink
                                to="/project/new"
                                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90"
                            >
                                Post a Project
                            </NavLink>
                            <button
                                className="rounded-full bg-red-400 px-5 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                logout
                            </button>
                        </>
                    ) : (
                        /* GUEST UI */
                        <>
                            <NavLink
                                to="/login"
                                className="text-sm font-medium text-text-dim hover:text-text-dark"
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground"
                            >
                                Get Started
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}