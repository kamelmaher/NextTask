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
                {/* Guest hero */}
                {!isAuthenticated && (
                    <section className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-text-dark">
                                    Find Talent. Get Work Done. Fast.
                                </h1>
                                <p className="mt-2 text-text-dim max-w-xl">
                                    NextStack connects talented developers with meaningful
                                    projects — browse, bid, and get hired.
                                </p>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <NavLink
                                    to={'/projects'}
                                    className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground">
                                    Explore Projects
                                </NavLink>

                                <NavLink
                                    to={'/register'}
                                    className="rounded-full border border-border px-5 py-2 text-sm font-semibold">
                                    Become a Freelancer
                                </NavLink>
                            </div>
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Auth header + stats */}
                        {isAuthenticated && user && (
                            <header className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-text-dim">Welcome back,</p>
                                    <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                                        {user.firstName} {user.lastName} • <span className="text-sm font-medium text-text-dim">{user.title}</span>
                                    </h1>
                                    <p className="text-sm text-text-dim mt-1">{user.about}</p>
                                </div>
                            </header>
                        )}

                        {isAuthenticated && user && (
                            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <StatCard label="Role" value={(user.roles || []).join(', ')} accent />
                                <StatCard label="Category" value={user.category || '—'} />
                                <StatCard label="Username" value={user.userName || user.email} />
                            </section>
                        )}

                        {/* Projects list */}
                        <div className="mb-6">
                            <h2 className="font-display text-2xl font-bold tracking-tight text-text-dark">Recommended Projects</h2>
                            {!isAuthenticated && <p className="text-sm text-text-dim">Browse available freelance opportunities</p>}
                        </div>

                        <div className="space-y-4">
                            {loading ? <p className="text-text-dim">Loading projects...</p> : projects.map((p) => (
                                <ProjectCard key={p._id} project={p} />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="order-first lg:order-last">
                        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                            {isAuthenticated && user ? (
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <img src={user.profileImg || '/profile-placeholder.png'} alt="profile" className="h-20 w-20 rounded-full object-cover" />
                                    <div>
                                        <p className="font-bold text-text-dark">{user.firstName} {user.lastName}</p>
                                        <p className="text-sm text-text-dim">{user.title}</p>
                                        <p className="mt-2 text-sm text-text-dim">{user.about}</p>
                                    </div>
                                    <div className="w-full">
                                        <NavLink to={'/profile'} className="block rounded-md bg-brand px-4 py-2 text-center text-sm font-semibold text-brand-foreground">View Profile</NavLink>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="font-display text-lg font-bold text-text-dark">Join NextStack</p>
                                    <p className="mt-2 text-sm text-text-dim">Create a profile, bid on projects, and grow your reputation.</p>
                                    <div className="mt-4 flex gap-2 justify-center">
                                        <NavLink to={'/login'} className="rounded-md border border-border px-4 py-2 text-sm font-semibold">Sign in</NavLink>
                                        <NavLink to={'/register'} className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground">Get started</NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
                            <h3 className="font-bold text-text-dark">Quick Filters</h3>
                            <p className="text-sm text-text-dim mt-2">Filter projects by category, budget or duration from the projects page.</p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};