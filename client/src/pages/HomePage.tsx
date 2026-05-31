import { NavLink } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import StatCard from "../components/StatCard";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProjects } from "../features/projects/projects.reducers";
import { useEffect } from "react";

export const HomePage = () => {
    const { user, isAuthenticated } = useAppSelector(state => state.auth)
    const { projects, loading } = useAppSelector(state => state.projects)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchProjects())
    }, [dispatch])
    
    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-7xl px-6 py-10">

                {/* ================= GUEST HERO ================= */}
                {!isAuthenticated && (
                    <section className="mb-10 rounded-xl border border-border bg-surface p-8">
                        <h1 className="text-3xl font-bold text-text-dark">
                            Find Talent. Get Work Done. Fast.
                        </h1>

                        <p className="mt-2 text-text-dim">
                            NextStack is a freelancing platform where developers and clients
                            connect to build real projects efficiently.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <NavLink
                                to={"/projects"}
                                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground">
                                Explore Projects
                            </NavLink>

                            <NavLink
                                to={"/register"}
                                className="rounded-full border border-border px-5 py-2 text-sm font-semibold">
                                Become a Freelancer
                            </NavLink>
                        </div>
                    </section>
                )}

                {/* ================= AUTH HEADER ================= */}
                {isAuthenticated && user && (
                    <header className="mb-10">
                        <p className="text-sm text-text-dim">Welcome back,</p>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-text-dark">
                            {user.firstName} {user.lastName}
                        </h1>
                    </header>
                )}

                {/* ================= STATS (ONLY AUTH) ================= */}
                {isAuthenticated && user && (
                    <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <StatCard
                            label="Available Balance"
                            // value={`$${user.balance.toLocaleString("en-US", {
                            //     minimumFractionDigits: 2,
                            // })}`}
                            value="10"
                            accent
                        />
                        <StatCard
                            label="Pending Earnings"
                            // value={`$${currentUser.pendingEarnings.toLocaleString("en-US", {
                            //     minimumFractionDigits: 2,
                            // })}`}
                            value="5"
                        />
                        <StatCard
                            label="Success Rate"
                            // value={`${currentUser.successRate}%`}
                            value="10"
                            positive
                        />
                    </section>
                )}

                {/* ================= PROJECTS (ALWAYS VISIBLE) ================= */}
                <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                        Recommended Projects
                    </h2>

                    {!isAuthenticated && (
                        <p className="text-sm text-text-dim">
                            Browse available freelance opportunities
                        </p>
                    )}
                </div>

                <div className="space-y-4">
                    {
                        loading ? <p>loading...</p> :
                            projects.map((p) => (
                                <ProjectCard key={p._id} project={p} />
                            ))}
                </div>

            </main>
        </div>
    );
};