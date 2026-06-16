import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../features/auth/auth.reducer";
import Spinner from "./Spinner";
import { roles } from "../utils";
import { useState } from "react";
import { Menu, X, Wallet, ChevronDown, LayoutDashboard, Plus, LogOut, User } from "lucide-react";

export function Navbar() {
    const { user, isAuthenticated, fetchUserLoading } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setUserMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* LEFT - Logo & Navigation */}
                <div className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        className="flex items-center gap-2 font-bold text-xl tracking-tight"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED]">
                            <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <span className="text-[#0F172A]">NextTask</span>
                    </NavLink>

                    <div className="hidden gap-1 md:flex">
                        <NavLink
                            to={"/projects"}
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive
                                    ? "bg-[#F3E8FF] text-[#7C3AED]"
                                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                                }`
                            }
                        >
                            Explore Projects
                        </NavLink>
                    </div>
                </div>

                {/* RIGHT - Actions */}
                <div className="flex items-center gap-3">
                    {fetchUserLoading ? (
                        <Spinner size="sm" />
                    ) : isAuthenticated ? (
                        <>
                            {/* Balance Pill */}
                            <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#F3E8FF] px-3 py-1.5">
                                <Wallet className="h-3.5 w-3.5 text-[#7C3AED]" />
                                <span className="text-sm font-semibold text-[#7C3AED]">
                                    ${user?.balance?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* Admin Link */}
                            {(user?.roles.includes(roles.ADMIN) || user?.roles.includes(roles.MANAGER)) && (
                                <NavLink
                                    to={"/admin"}
                                    className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </NavLink>
                            )}

                            {/* Post Project Button */}
                            <NavLink
                                to="/project/new"
                                className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#7C3AED]/20 transition-all hover:bg-[#5B21B6] hover:shadow-md hover:shadow-[#7C3AED]/30"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Post Project</span>
                            </NavLink>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-[#F8FAFC] transition-all"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3E8FF] text-sm font-semibold text-[#7C3AED] ring-2 ring-white">
                                        {user?.profileImg ? (
                                            <img src={user?.profileImg} alt="" className="h-8 w-8 rounded-full object-cover" />
                                        ) : (
                                            user?.firstName?.charAt(0)
                                        )}
                                    </div>
                                    <ChevronDown className={`h-4 w-4 text-[#64748B] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#E2E8F0] bg-white shadow-xl shadow-black/5 py-2">
                                        <div className="px-4 py-3 border-b border-[#F1F5F9]">
                                            <p className="text-sm font-semibold text-[#0F172A]">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-[#64748B]">{user?.email}</p>
                                        </div>
                                        <NavLink
                                            to="/profile"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#7C3AED] transition-colors"
                                        >
                                            <User className="h-4 w-4" />
                                            Profile
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEE2E2] transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden rounded-lg p-2 text-[#64748B] hover:bg-[#F8FAFC]"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <NavLink
                                to="/login"
                                className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
                            >
                                Log In
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#7C3AED]/20 transition-all hover:bg-[#5B21B6]"
                            >
                                Get Started
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4">
                    <div className="flex flex-col gap-2">
                        <NavLink
                            to="/projects"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC]"
                        >
                            Explore Projects
                        </NavLink>
                        <NavLink
                            to="/find"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC]"
                        >
                            Find Freelancers
                        </NavLink>
                        {isAuthenticated && (
                            <>
                                <NavLink
                                    to="/project/new"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC]"
                                >
                                    Post a Project
                                </NavLink>
                                <NavLink
                                    to="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC]"
                                >
                                    Profile
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}